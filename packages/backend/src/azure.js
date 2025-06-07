"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_CONTAINER = exports.containerClient = void 0;
exports.uploadBlob = uploadBlob;
exports.downloadBlob = downloadBlob;
var storage_blob_1 = require("@azure/storage-blob");
var uuid_1 = require("uuid");
var STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT_NAME;
var STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
var STORAGE_CONTAINER = "haulazurestorage";
exports.STORAGE_CONTAINER = STORAGE_CONTAINER;
var blobServiceClient;
var containerClient;
try {
    var connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (connectionString) {
        blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
        exports.containerClient = containerClient = blobServiceClient.getContainerClient(STORAGE_CONTAINER);
        containerClient.createIfNotExists()
            .then(function () { return console.log("Container ".concat(STORAGE_CONTAINER, " is ready")); })
            .catch(function (error) { return console.error("Error creating container:", error); });
    }
    else {
        console.warn("Azure Storage credentials not found in environment variables");
    }
}
catch (error) {
    console.error("Failed to initialize Azure Storage:", error);
}
var stream_1 = require("stream");
function uploadBlob(req, res) {
    if (!containerClient) {
        res.status(503).send({
            message: "Azure Storage not configured"
        });
        return;
    }
    var filename = req.query.filename || "upload";
    var uuid = (0, uuid_1.v4)();
    var blobname = "".concat(uuid, ":").concat(filename);
    var blockBlobClient = containerClient.getBlockBlobClient(blobname);
    var stream = stream_1.Readable.from(req.body);
    blockBlobClient
        .uploadStream(stream)
        .then(function () {
        res.status(201).send({
            url: "/images/".concat(blobname)
        });
    })
        .catch(function (error) {
        res.status(500).send({
            message: "failed to upload to blob storage",
            error: error,
        });
    });
}
function downloadBlob(req, res) {
    if (!containerClient) {
        res.status(503).send({
            message: "Azure Storage not configured"
        });
        return;
    }
    var blob = req.params.blob;
    var blockBlobClient = containerClient.getBlockBlobClient(blob);
    blockBlobClient.exists().then(function (exists) {
        if (!exists) {
            res.status(404).send();
        }
        else {
            blockBlobClient.downloadToBuffer().then(function (buf) {
                res.send(buf);
            }).catch(function (error) {
                res.status(500).send({ message: "Download failed", error: error });
            });
        }
    }).catch(function (error) {
        res.status(500).send({ message: "Error checking blob existence", error: error });
    });
}
