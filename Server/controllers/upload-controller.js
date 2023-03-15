const stream = require('stream');
const drive = require('../services/drive-service')();

uploadFile = async (req, res, next) => {
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
        next(error);
    }
}

uploadFiles = async (req, res, next) => {
    try {
        const { files } = req;
        const fileUrls = files.map(
            async (file) => {
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
                return `https://drive.google.com/file/d/${data.id}/view`;
            }
        )
        res.status(200).json({
            message: 'Files uploaded successfully',
            urls: await Promise.all(fileUrls)
        });
        
    } catch (error) {
        // TODO: Handle error
        next(error);
    }
}

module.exports = { uploadFile, uploadFiles };