"use client";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const pdfVersion = "3.11.174"
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`

interface PDFViewerProps {
  file: string
}

export default function PDFViewer({ file }: PDFViewerProps) {
  return (
    <Worker workerUrl={pdfWorkerUrl}>
      <Viewer
        fileUrl={file}
        plugins={[]}
      />
    </Worker>
  )
}