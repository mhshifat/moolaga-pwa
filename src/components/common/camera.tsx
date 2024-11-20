"use client";

import { jsPDF } from "jspdf";
import { toast } from 'sonner';
import { useRef, useState } from 'react';
import Button from '../ui/button';
import PDFViewer from './pdf-viewer';

interface CameraProps {
  onUploadApiCall: (src: string | null) => void;
}

export default function Camera({ onUploadApiCall }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Type for the video element
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Image source is a string or null
  const [hasTakenPicture, setHasTakenPicture] = useState<boolean>(false); // Boolean state for picture status
  const [startedCamera, setStartedCamera] = useState(false);

  const startCamera = async () => {
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setStartedCamera(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    } else {
      alert('Camera not supported');
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgUrl = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height], // Set the dimensions in pixels
        });
        doc.addImage(imgUrl, 'PNG', 0, 0, canvas.width, canvas.height);
        const pdfBlob = doc.output('blob');
        setImageSrc(URL.createObjectURL(pdfBlob));
        setHasTakenPicture(true);
        setStartedCamera(false);
      }
    }
  };

  const resetPicture = () => {
    setHasTakenPicture(false);
    setImageSrc(null);
    startCamera();
  };

  const selectFromGallery = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
      const file = target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            if (!(reader.result as string)?.includes("application/pdf")) return toast.error("Only Pdf files are allowed");
            setImageSrc(reader.result as string);
            setHasTakenPicture(true);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div>
      {!hasTakenPicture && (
        <>
          <video className='aspect-square rounded-md' ref={videoRef} autoPlay muted style={{ width: '100%' }} />
        </>
      )}
      {hasTakenPicture && imageSrc && (
        <>
          <PDFViewer
            file={imageSrc}
          />
        </>
      )}
      <div className='flex items-center justify-center gap-2 mt-10'>
        {!hasTakenPicture && !startedCamera && <Button onClick={startCamera}>Start Camera</Button>}
        {!hasTakenPicture && startedCamera && <Button onClick={takePicture}>Take Picture</Button>}
        {hasTakenPicture && <Button onClick={resetPicture}>Take Another Picture</Button>}
        <Button onClick={selectFromGallery}>Select From Gallery</Button>
      </div>
      {imageSrc && <Button type='button' className='mt-3 w-full' onClick={() => onUploadApiCall?.(imageSrc)}>Upload to Moolaga</Button>}
    </div>
  );
}
