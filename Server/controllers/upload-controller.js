const stream = require('stream');
const drive = require('../services/drive-service')();

uploadFile = async (req, res) => {
    try {
        const { file } = req;
        const { mimetype, originalname, buffer } = file;

        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        
        let { data } = await drive.files.create({
            media: {
                mimeType: mimetype,
                body: bufferStream
            },
            requestBody: {
                name: originalname,
                parents: ['1f78mettX_uSzLYhblt1dbuu-wZzJTg8n'],
                writersCanShare: true
            },
            fields: 'id'
        });
        res.status(200).json({
            message: 'File uploaded successfully',
            url: `https://drive.google.com/file/d/${data.id}/view`
        });
    } catch (error) {
        // TODO: Handle error
        console.log(error)
    }
}

module.exports = uploadFile;