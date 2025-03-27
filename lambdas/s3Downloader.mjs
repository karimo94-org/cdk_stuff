export async function requestFromS3Url(url) {
    var blobData = null;
    try {
        const response = await fetch(url, {method: 'GET'});
        if(!response.ok) {
            throw new Error('error downloading file from provided s3 link: ', response.status);
        }
        blobData = response.blob();
    }
    catch(error) {
        console.log(error);
    }
    return blobData;
}