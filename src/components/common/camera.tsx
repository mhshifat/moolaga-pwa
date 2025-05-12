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
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setStartedCamera(true);
        }
      } catch (err) {
        console.log('Error accessing camera:', err);
        toast.error("Please enable camera");
      }
    } else {
      toast.error('Camera not supported');
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
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
      const file = target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            if (!(reader.result as string)?.includes("image/")) return toast.error("Only image files are allowed");

            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'pt',
              format: 'a4'
            });
        
            const img = new Image();
            img.onload = () => {
              const imgWidth = pdf.internal.pageSize.getWidth();
              const imgHeight = (img.height * imgWidth) / img.width;
        
              pdf.addImage(reader.result as string, 'JPEG', 0, 0, imgWidth, imgHeight);
        
              const blob = pdf.output('blob');
              const url = URL.createObjectURL(blob);
              setImageSrc(url);
              setHasTakenPicture(true);
            };
        
            img.onerror = () => toast.error("Failed to load image");
            img.src = reader.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-full flex-1 px-5 flex flex-col pb-10 gap-10">
      {!hasTakenPicture && (
        <div className="overflow-hidden bg-primary/10 rounded-lg h-auto flex-1">
          <video className='w-full h-full' ref={videoRef} autoPlay muted style={{ width: '100%' }} />
        </div>
      )}
      {hasTakenPicture && imageSrc && (
        <>
          <PDFViewer
            file={imageSrc}
          />
        </>
      )}
      <div className='flex flex-col items-center justify-center gap-2 mt-auto'>
        {!hasTakenPicture && !startedCamera && <Button className="flex-1 w-full" onClick={startCamera}>Start Camera</Button>}
        {!hasTakenPicture && startedCamera && <Button className="flex-1 w-full" onClick={takePicture}>Take Picture</Button>}
        {hasTakenPicture && <Button className="flex-1 w-full" onClick={resetPicture}>Take Another Picture</Button>}
        <span className="text-xs font-geist-sans font-medium relative before:content-[''] before:w-[100%] before:bg-primary/50 before:flex before:h-[1px] before:top-1/2 before:absolute before:left-[150%] after:content-[''] after:w-[100%] after:bg-primary/50 after:flex after:h-[1px] after:top-1/2 after:absolute after:right-[150%]">OR</span>
        <Button className="flex-1 w-full" onClick={selectFromGallery}>Select From Gallery</Button>
        {imageSrc && (
          <>
            <span className="text-xs font-geist-sans font-medium relative before:content-[''] before:w-[100%] before:bg-primary/50 before:flex before:h-[1px] before:top-1/2 before:absolute before:left-[150%] after:content-[''] after:w-[100%] after:bg-primary/50 after:flex after:h-[1px] after:top-1/2 after:absolute after:right-[150%]">OR</span>
            <Button type='button' className='w-full' onClick={() => onUploadApiCall?.(imageSrc)}>Upload to Moolaga</Button>
          </>
        )}
      </div>
    </div>
  );
}
