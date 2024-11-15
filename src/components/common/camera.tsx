"use client";

import { useRef, useState } from 'react';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Type for the video element
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Image source is a string or null
  const [hasTakenPicture, setHasTakenPicture] = useState<boolean>(false); // Boolean state for picture status

  const startCamera = async () => {
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
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
        setImageSrc(canvas.toDataURL('image/png'));
        setHasTakenPicture(true);
      }
    }
  };

  const resetPicture = () => {
    setHasTakenPicture(false);
    setImageSrc(null);
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
          <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
          <button onClick={startCamera}>Start Camera</button>
          <button onClick={takePicture}>Take Picture</button>
        </>
      )}
      {hasTakenPicture && (
        <>
          <img src={imageSrc || ''} alt="Captured" style={{ maxWidth: '100%' }} />
          <button onClick={resetPicture}>Take Another Picture</button>
          <button onClick={selectFromGallery}>Select From Gallery</button>
        </>
      )}
    </div>
  );
}
