"use client";

import { useCallback, useState } from "react";
// import Cropper from "react-easy-crop";

type Area = { x: number; y: number; width: number; height: number };

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function getCroppedImageDataUrl(imageSrc: string, crop: Area, size = 256) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  // 把 crop 区域画到固定 size 的画布（正方形头像）
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    size,
    size
  );

  return canvas.toDataURL("image/jpeg", 0.92);
}

export default function AvatarCropper({
  src,
  onCancel,
  onCropped,
}: {
  src: string;                 // 原始图片（objectURL）
  onCancel: () => void;
  onCropped: (croppedDataUrl: string) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: any, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    const dataUrl = await getCroppedImageDataUrl(src, croppedAreaPixels, 256);
    onCropped(dataUrl);
  };

  return (
    <div style={{ width: 360 }}>
      <div style={{ position: "relative", width: 360, height: 360, background: "#111" }}>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={1}                 // 头像：1:1
          cropShape="round"          // 圆形预览框（更像头像）
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleCrop}>Crop</button>
      </div>
    </div>
  );
}
