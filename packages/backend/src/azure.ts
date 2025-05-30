import { BlobServiceClient } from "@azure/storage-blob";

const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
const STORAGE_CONTAINER = "haulazurestorage";
const blobServiceClient =
  BlobServiceClient.fromConnectionString(
    `DefaultEndpointsProtocol=https;AccountName=${
      STORAGE_ACCOUNT
    };AccountKey=${
      STORAGE_ACCESS_KEY
    };EndpointSuffix=core.windows.net`
  );

export const containerClient = blobServiceClient.getContainerClient(
  STORAGE_CONTAINER
);
