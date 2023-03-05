const { google } = require('googleapis');
const path = require('path');

const getDriveService = () => {
    const KEYFILEPATH = path.join(__dirname, 'spheric-method-379716-483a5cebd2e8.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    });

    const drive = google.drive({version: 'v3', auth});
    return drive;
}

module.exports = getDriveService;