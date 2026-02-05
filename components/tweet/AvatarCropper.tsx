`use client`;

import { useCallback, useState } from "react";

type Area = {
    x: number;
    y: number;
    width: number;
    height: number;
};

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export default function AvatarCropper({ imageSrc }: { imageSrc: string }) {
    const [cropArea, setCropArea] = useState<Area | null>(null);

    const handleCrop = useCallback(async () => {
        if (!cropArea) return;

        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        canvas.width = cropArea.width;
        canvas.height = cropArea.height;

        ctx.drawImage(
            image,
            cropArea.x,
            cropArea.y,
            cropArea.width,
            cropArea.height,
            0,
            0,
            cropArea.width,
            cropArea.height
        );

        const croppedImageUrl = canvas.toDataURL('image/png');
        console.log('Cropped Image URL:', croppedImageUrl);
    }, [cropArea, imageSrc]);

    return (
        <div>
            {/* UI for displaying the image and selecting crop area would go here */}             
            <button onClick={handleCrop}>Crop Avatar</button>
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
        </div>
    );
} 
