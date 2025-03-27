import { Dropbox } from 'dropbox';
export async function uploadToDropbox(creds, myFileName, blobData) {
    var dbx = new Dropbox({accessToken: creds});

    var uploadResult = null;
    let arrayBuffer = await blobData.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    try{
        //only takes buffer, for Blob, use fetch()
        const response = await dbx.filesUpload({
            path:`/${myFileName}`, 
            contents: buffer, 
            mode: 'overwrite'
        });
        if(response.status == 200) {
            uploadResult = response;
        }
    }
    catch(error) {
        console.log('error: ', error);
    }
    return uploadResult;
    /*const calloutUrl = 'https://content.dropboxapi.com/2/files/upload';
    var myHeaders = {
        "Authorization": `Bearer ${creds.access_token}`,
        "Dropbox-API-Arg": JSON.stringify({
            path: `/${myFileName}`,
            mode: 'overwrite',
            autorename: true
        }),
        "Content-Type": "application/octet-stream"
    }
    var uploadResult = null;
    try {
        const response = await fetch(calloutUrl, 
            {
                method: 'POST',
                body: blobData,
                headers: myHeaders
            });
        if(!response.ok) {
            throw new Error('error uploading file to dropbox: ', response.statusText);
        }
        uploadResult = await response.json();
    }
    catch(error) {
        console.log(error);
    }
    return uploadResult;*/
}