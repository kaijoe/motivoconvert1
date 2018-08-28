const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const PDFDocument = require("pdfkit");
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listForm);
  //authorize(JSON.parse(content), uploadFile);
  });

/*
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
  function authorize(credentials, callback)
  {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  }

  // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
    });


/*
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
    function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
          });
          });
          }

/*
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
    function listForm(auth) {
    console.log("hello from listForm");
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
    spreadsheetId: '1K-WfuM9pqn889ptdF-GMABcBK_6beDLmSfQc-qFqBxw',
    range: 'A2:G'}, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
                                  }



//for (var i = 0; i < 6; i++){
Array = [];
rows = rows.data.values;

console.log(rows)

 /*
for (var i = 0; i < rows.length; i++)
{for (var j = 0; i < rows[0])}
*/


  //this.sheetsService.spreadsheets.values.get({
    //1K-WfuM9pqn889ptdF-GMABcBK_6beDLmSfQc-qFqBxw,
  //  A2:G,
//}, (err, result) => {
  //  if (err) {
      // Handle error
    //  console.log(err);
  //  } else {

    //  const numRows = result.values ? result.values.length : 0;
      //console.log(`${numRows} rows retrieved.`);
    //}
  //});

/*
function savefile() {
  var sheet = SpreadsheetApp.getActiveSheet(); // or getSheetByName
  var range = sheet.getRange("A2:G");
  var values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    values = values[i]
  });
*/
//const rows = res.datavalues;


    /*
    var i;
    for (i = 0; i < rows.length; i++)
    {var rows = res.data.values}

you need to go over all the rows and store them one by one, then go over the values
in the row and save them as data to export in the pdf
*/

/*

    if (rows.length) {
      rows.map((row) => {
        fileData = row.toString();
        doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('output.pdf'));

        doc.save()
           .fontSize(25)
           .text(fileData, 100, 100);
        doc.end();
        console.log(fileData);
      });
    } else {
      console.log('No data found.');
    }
  });
}



fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  //authorize(JSON.parse(content), {listForm,uploadFile});
  authorize(JSON.parse(content), uploadFile);
});
/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.

function uploadFile(auth) {
  const drive = google.drive({version: 'v3', auth});

  var fileMetadata = {
  'name': 'output',
  'mimeType': 'application/pdf'
};
var media = {
  mimeType: 'application/pdf',
  body: fs.createReadStream('output.pdf')
};
drive.files.create({
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('File Id:', file.id);
  }
});
}
