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
    const localPDFFilePath = "D://demo/pdftool/pdf-electron-demo/client/src/document/bookmark-sample.pdf"; // Path to the local PDF file
    const storagePDFFileName = "sample-convert.epub"; // Name under which the PDF file will be saved in Aspose Cloud Storage
    const outputEPUBFilePath = "D://demo/pdftool/pdf-electron-demo/client/src/document/sample.epub"; // Path where you want to save the converted EPUB file locally
    const pdfApi = new PdfApi(clientId, clientSecret);

    try {
        // Upload the PDF file to Aspose Cloud Storage
        const fileData = fs.readFileSync(localPDFFilePath);
        await pdfApi.uploadFile(storagePDFFileName, fileData);
        console.log("File uploaded successfully");

        // Convert the uploaded PDF to EPUB
        const convertResult = await pdfApi.putPdfInStorageToEpub(storagePDFFileName, outputEPUBFilePath);
        console.log("Conversion to EPUB completed", convertResult);

        // Optionally, download the converted EPUB file if needed
        // Since Aspose Cloud SDK does not return the file content directly in the conversion result,
        // you would typically need to download the file separately.
        const downloadResult = await pdfApi.downloadFile(outputEPUBFilePath);
        fs.writeFileSync(path.join(__dirname, "sample.epub"), downloadResult.body);
        console.log("Converted EPUB file has been downloaded and saved locally.");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
  