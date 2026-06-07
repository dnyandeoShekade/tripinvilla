import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';

export default function ImageCropper({ file, onApply, onCancel, shape = 'rect', aspect = null }) {
  const [imageSrc, setImageSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (!croppedImageBlob) return;
      const croppedFile = new File([croppedImageBlob], file.name.replace(/\.[^.]+$/, '.jpg'), {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
      onApply(croppedFile);
    } catch (e) {
      console.error(e);
    }
  };

  if (!file || !imageSrc) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', flexDirection: 'column', background: '#FAFAFA' }}>
      <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect || (shape === 'circle' ? 1 : undefined)}
          cropShape={shape === 'circle' ? 'round' : 'rect'}
          showGrid={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: { background: '#FAFAFA' }
          }}
        />
        
        {/* Floating Rotation Controls */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '20px', background: '#374151', borderRadius: '8px', padding: '8px 16px', display: 'flex', gap: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10 }}>
          <button type="button" onClick={() => setRotation(r => r - 90)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} title="Rotate Left">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button type="button" onClick={() => setRotation(r => r + 90)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} title="Rotate Right">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: '72px', background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px', flexShrink: 0, gap: '12px' }}>
        <button type="button" onClick={onCancel} style={{ padding: '10px 20px', border: '1px solid #D1D5DB', borderRadius: '6px', background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
          Cancel
        </button>
        <button type="button" onClick={handleApply} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#22C55E', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Apply Crop
        </button>
      </div>
    </div>
  );
}

// Utilities for cropping
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width / 2,
    safeArea / 2 - image.height / 2
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, 'image/jpeg', 0.95);
  });
}
