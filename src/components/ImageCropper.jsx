import { useEffect, useRef, useState } from 'react';

export default function ImageCropper({ file, onApply, onCancel, shape = 'circle' }) {
  const [imageSrc, setImageSrc] = useState('');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef(null);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  if (!file || !imageSrc) return null;

  const handlePointerDown = (event) => {
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: offset.x,
      y: offset.y
    };
  };

  const handlePointerMove = (event) => {
    if (!dragStartRef.current) return;
    const scale = 512 / 260;
    setOffset({
      x: dragStartRef.current.x + (event.clientX - dragStartRef.current.pointerX) * scale,
      y: dragStartRef.current.y + (event.clientY - dragStartRef.current.pointerY) * scale
    });
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  const handleApply = () => {
    const image = new Image();
    image.onload = () => {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, size, size);

      const baseScale = Math.max(size / image.width, size / image.height);
      const drawScale = baseScale * zoom;
      const drawWidth = image.width * drawScale;
      const drawHeight = image.height * drawScale;
      const x = (size - drawWidth) / 2 + offset.x;
      const y = (size - drawHeight) / 2 + offset.y;

      context.drawImage(image, x, y, drawWidth, drawHeight);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        onApply(croppedFile);
      }, 'image/jpeg', 0.92);
    };
    image.src = imageSrc;
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 12000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      <div style={{ position: 'relative', width: 'min(420px, 100%)', background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Crop Profile Image</h3>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            width: 260,
            height: 260,
            margin: '0 auto',
            borderRadius: shape === 'circle' ? '50%' : 12,
            overflow: 'hidden',
            background: '#F3F4F6',
            cursor: 'grab',
            border: '1px solid #E5E7EB',
            touchAction: 'none'
          }}
        >
          <img
            src={imageSrc}
            alt="Crop preview"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `translate(${offset.x / (512 / 260)}px, ${offset.y / (512 / 260)}px) scale(${zoom})`,
              transformOrigin: 'center',
              userSelect: 'none'
            }}
          />
        </div>
        <div style={{ marginTop: 18 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#4B5563', fontWeight: 600, marginBottom: 8 }}>Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            style={{ width: '100%', accentColor: '#58A429' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button type="button" onClick={onCancel} style={{ padding: '9px 18px', border: '1px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 600 }}>
            Cancel
          </button>
          <button type="button" onClick={handleApply} style={{ padding: '9px 18px', border: 'none', borderRadius: 8, background: '#58A429', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
