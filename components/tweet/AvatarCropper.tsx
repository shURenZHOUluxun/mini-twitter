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