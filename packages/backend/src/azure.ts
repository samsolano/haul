import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
const STORAGE_CONTAINER = "haulazurestorage";


let blobServiceClient: BlobServiceClient | null;
let containerClient: ContainerClient | null;

try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (connectionString) {
        blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        containerClient = blobServiceClient.getContainerClient(STORAGE_CONTAINER);
        
        containerClient.createIfNotExists()
            .then(() => console.log(`Container ${STORAGE_CONTAINER} is ready`))
            .catch(error => console.error("Error creating container:", error));
    } else {
        console.warn("Azure Storage credentials not found in environment variables");
    }
} catch (error) {
    console.error("Failed to initialize Azure Storage:", error);
}

export { containerClient, STORAGE_CONTAINER };

import { Readable } from "stream";
import { Request, Response } from "express";

export function uploadBlob(req: any, res: any): void {
    if (!containerClient) {
        res.status(503).send({
            message: "Azure Storage not configured"
        });
        return;
    }

    const filename = (req.query.filename as string) || "upload";
    const uuid = uuidv4();
    const blobname = `${uuid}:${filename}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobname);
    const stream = Readable.from(req.body);
    blockBlobClient
        .uploadStream(stream)
        .then(() => {
            res.status(201).send({
                url: `/images/${blobname}`
            });
        })
        .catch((error: any) => {
            res.status(500).send({
                message: "failed to upload to blob storage",
                error,
            });
        });
}

export function downloadBlob(req: Request, res: Response): void {
    if (!containerClient) {
        res.status(503).send({
            message: "Azure Storage not configured"
        });
        return;
    }

    const { blob } = req.params;
    const blockBlobClient = containerClient.getBlockBlobClient(blob);
    blockBlobClient.exists().then((exists: boolean) => {
        if (!exists) {
            res.status(404).send();
        } else {
            blockBlobClient.downloadToBuffer().then((buf: Buffer) => {
                res.send(buf);
            }).catch((error) => {
                res.status(500).send({ message: "Download failed", error });
            });
        }
    }).catch((error) => {
        res.status(500).send({ message: "Error checking blob existence", error });
    });
}
    