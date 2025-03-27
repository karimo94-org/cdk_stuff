import { authToDropbox } from "./dropboxAuth.mjs";
import { uploadToDropbox } from "./dropboxUpload.mjs";
import { requestFromS3Url } from "./s3Downloader.mjs";

export async function handler(event) {
    console.log('Event request method: ', event['httpMethod']);
    console.log('Event request path: ', event['path']);
    console.log('Event request headers: ', event['headers']);
    console.log('Event request body: ', event['body']);
    let requestBody = event['body'];
    let s3Url = requestBody['s3Url'];
    let blobData = await requestFromS3Url(s3Url);
    let creds = await authToDropbox();
    let fileUploadResult = await uploadToDropbox(creds, 'building_java_programs.pdf', blobData);
    console.log(fileUploadResult);
    return {
        statusCode: 200,
        body: JSON.stringify(fileUploadResult)
    };
}

