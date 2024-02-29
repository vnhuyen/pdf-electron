import { useState, useEffect, useRef } from 'react'
import './App.css'
import Epub from 'epubjs'
import { PdfApi } from 'asposepdfcloud'
//import EbookConverter from 'node-ebook-converter'

function App() {
  let book = Epub()
  let rendition: any = null
  const epubInput = useRef(null)
  const openBook = (e: any) => {
    const bookData = e.target.result
    book.open(bookData, 'binary')
    rendition = book.renderTo('viewer', {
      width: '100%',
      height: 600
    })
    rendition.display()
  }

  const handleFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]
    if (window.FileReader) {
      const reader = new FileReader()
      reader.onload = openBook
      file && reader.readAsArrayBuffer(file)
    }
  }

  // const handleConvertEpubToPDF = async () => {
  //   const outputPdfPath = 'output.pdf'
  //   try {
  //     await EbookConverter({ input: '../../alpdf/document/bookmark-sample.epub', output: outputPdfPath })
  //     alert('EPUB converted to PDF successfully!')
  //   } catch (error) {
  //     console.error('Error converting EPUB to PDF:', error)
  //   }
  // }

  // const handleConvertPDFToEpub = async () => {
  //   const outputEpubPath = 'output.epub'
  //   try {
  //     await EbookConverter({ input: '../../alpdf/document/bookmark-sample.pdf', output: outputEpubPath })
  //     alert('PDF converted to EPUB successfully!')
  //   } catch (error) {
  //     console.error('Error converting PDF to EPUB:', error)
  //   }
  // }

  const handleConvertEpubToPDF = () => {
    const clinetId = '2fa310e5-25e4-44cb-97b7-742993ed8c53'
    const clinetSecret = '93f1bef6571209fb5e38a6b1c179597f'
    const pdfApi = new PdfApi(clinetId, clinetSecret)

    let pageNumber = 1
    let pdfDocName = 'example.pdf'
    let remoteFolder = 'folderName'

    pdfApi.getPageAnnotations(pdfDocName, pageNumber, null, remoteFolder).then((result) => {
      console.log(result.response)
      console.log(result.body)
    })
    // pdfApi
    //   .getEpubInStorageToPdf('./document/bookmark-sample.epub')
    //   .then((response) => {
    //     console.log('Conversion Response: ', response.body)
    //     // Optionally, download the converted file if needed
    //   })
    //   .catch((error) => {
    //     console.error('An error occurred:', error)
    //   })
  }
  return (
    <div className='w-full p-5'>
      <h1 className='text-3xl font-bold mb-4'>Epub Viewer & Converter Demo</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'
        onClick={() => epubInput?.current?.click()}
      >
        View Epub File
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'
        onClick={handleConvertEpubToPDF}
      >
        Convert Epub to PDF
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        // onClick={handleConvertPDFToEpub}
      >
        Convert PDF to Epub
      </button>
      <div className='my-4'>
        <input type='file' id='input' ref={epubInput} className='hidden' onChange={handleFileChange} />
      </div>
      <div id='viewer' className='border border-slate-300 rounded-sm'></div>
      <div className='mt-2'>
        <button id='prev' className='' onClick={() => rendition.prev()}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10'>
            <path d='M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z'></path>
          </svg>
        </button>
        <button id='next' onClick={() => rendition.next()}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10'>
            <path d='M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z'></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
