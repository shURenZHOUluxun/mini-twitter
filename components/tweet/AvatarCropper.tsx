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
        </div>
    );
}           
