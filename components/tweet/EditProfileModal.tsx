"use client";

import styles from "@/styles/EditProfileModal.module.css";
import { CgProfile } from "react-icons/cg";
import { useState, useRef } from "react";
import AvatarCropper from "./AvatarCropper";
import Image from "next/image";

type Mode = "edit" | "crop";
type Area = { x: number; y: number; width: number; height: number };
async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function cropToDataUrl(imageSrc: string, crop: {x:number;y:number;width:number;height:number}, size=256) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas ctx");

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, size, size);
  return canvas.toDataURL("image/jpeg", 0.92);
}


export default function EditProfileModal({
    initialName,
    initialBio,
    initialAvatar,
    onNameChange,
    onBioChange,
    onAvatarUrlChange,
    onClose,
}: {
    initialName: string;
    initialBio: string;
    initialAvatar: string;
    onNameChange: (newName: string) => void;
    onBioChange: (newBio: string) => void;
    onAvatarUrlChange: (newUrl: string) => void;
    onClose: () => void;
}) {
    const [mode, setMode] = useState<Mode>("edit");
    const [bio, setBio] = useState(initialBio);
    const [name, setName] = useState(initialName);
    const [avatar, setAvatar] = useState(initialAvatar);     // 最终头像（裁剪后）
    const [rawSrc, setRawSrc] = useState<string | null>(null); // 原图（待裁剪）
    const [area, setArea] = useState<Area | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.overlay} onClick={onClose}>  {/* click outside to close modal */}
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()} // 阻止冒泡
            >
                {mode === "edit" && (<>
                    <section className={styles.modalHeader}>
                        <h2 className={styles.editHeader}>Edit profile</h2>
                        <button onClick={() => {
                            onNameChange(name);
                            onBioChange(bio);
                            onAvatarUrlChange(avatar);
                            onClose();  // Close the modal after saving 
                        }} className={styles.save}>save</button>
                    </section>
                    

                    <input type="file"
                        ref={fileInputRef}
                        accept="image/*" 
                        className={styles.fileInput}
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const url = URL.createObjectURL(f);
                            setRawSrc(url); // 打开裁剪器
                            setMode("crop");
                        }} />
                    <div
                        className={styles.avatarWrapper}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt="avatar"
                                width={100} 
                                height={100}
                                className={styles.profileIcon}
                                unoptimized
                            />
                        ) : (
                            <CgProfile
                            className={styles.profileIcon}
                            title="Profile Icon"
                            />
                        )}
                        </div>



                    <label className={styles.label}>
                        <p>Name</p>
                        <input 
                            className={styles.textarea}
                            type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>

                    <label className={styles.label}>
                        <p>Bio</p>
                        <textarea 
                            className={styles.textarea}
                            rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
                    </label>
                </>)}

                {/* 裁剪弹层/区域 */}
                {mode === "crop" && rawSrc && (
                    <>
                        <AvatarCropper
                        src={rawSrc}
                        onAreaChange={(a) => setArea(a)}
                        />

                        <div className="actions">
                            {/* Cancel：只负责回到编辑界面 */}
                            <button
                                type="button"
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => {
                                URL.revokeObjectURL(rawSrc);
                                setRawSrc(null);
                                setArea(null);
                                setMode("edit");
                                if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                            >
                                Cancel
                            </button>

                            {/* Crop：只负责生成裁剪结果并回到编辑界面 */}
                            <button
                                type="button"
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={async () => {
                                if (!area) return;
                                const cropped = await cropToDataUrl(rawSrc, area, 256);
                                setAvatar(cropped);
                                URL.revokeObjectURL(rawSrc);
                                setRawSrc(null);
                                setArea(null);
                                setMode("edit");
                                }}
                            >
                                Crop
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
