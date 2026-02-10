"use client";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

type Area = { x: number; y: number; width: number; height: number };

export default function AvatarCropper({
  src,
  onAreaChange,
}: {
  src: string;
  onAreaChange: (area: Area) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_: unknown, areaPixels: Area) => {
    onAreaChange(areaPixels);
  }, [onAreaChange]);

  return (
    <div style={{ position: "relative", width: 360, height: 360, background: "#111" }}>
      <Cropper
        image={src}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      {/* zoom slider 可以继续放这里，但不要带 Cancel/Crop */}
      <input
        type="range"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        onMouseDown={(e) => e.stopPropagation()}   // 防止关 modal
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}
      />
    </div>
  );
}
