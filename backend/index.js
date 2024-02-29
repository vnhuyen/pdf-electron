const express = require('express')
const http = require('http')
const cors = require("cors");
const multer = require('multer'); 
const path = require("path");
const app = express()
const fs = require('fs')
const { PdfApi } = require('asposepdfcloud')
const PORT = process.env.PORT || 5000;
const clientId = '2fa310e5-25e4-44cb-97b7-742993ed8c53'
const clientSecret = '93f1bef6571209fb5e38a6b1c179597f'
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json())


app.post('/convert-pdf-to-epub', upload.single('file'), async (req, res) => {
    const localImageFileName = 'D://demo/pdftool/pdf-electron-demo/client/src/document/bookmark-sample.pdf' 
    const storageFileName = "sample.epub"; 
    const pdfApi = new PdfApi(clientId, clientSecret);
    let fileData = fs.readFileSync(localImageFileName);
    try {
        let uploadResult = await pdfApi.uploadFile(storageFileName, fileData);
        console.log(uploadResult.response.text);
    }
    catch (error) {
        console.error(error.response.text);
    }
    try {
        let convertResult = await pdfApi.putPdfInRequestToEpub("sample-epub-to-pdf.pdf", storageFileName);
        console.log(convertResult.response.text);
    } catch (error) {
        console.error(error.response.text);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
  