"use client";

import styles from "@/styles/EditProfileModal.module.css";
import { CgProfile } from "react-icons/cg";
import { useState, useRef } from "react";
import AvatarCropper from "./AvatarCropper";

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
    const [bio, setBio] = useState(initialBio);
    const [name, setName] = useState(initialName);
    const [avatar, setAvatar] = useState(initialAvatar);     // 最终头像（裁剪后）
    const [rawSrc, setRawSrc] = useState<string | null>(null); // 原图（待裁剪）
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.overlay} onClick={onClose}>  {/* click outside to close modal */}
        <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // 阻止冒泡
        >
            <section className={styles.modalHeader}>
                <h2 className={styles.editHeader}>Edit profile</h2>
                <button onClick={() => {
                    // Here you would typically handle saving the profile changes
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
                }} />
            <CgProfile className={styles.profileIcon}
                onClick={() => fileInputRef.current?.click()}
                title='Profile Icon' />

            {/* 裁剪弹层/区域 */}
            {rawSrc && (
                <AvatarCropper
                src={rawSrc}
                onCancel={() => setRawSrc(null)}
                onCropped={(cropped) => {
                    setAvatar(cropped);
                    setRawSrc(null);
                }}
                />
            )}

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

            <div className={styles.actions}>
            {/* <button onClick={onClose}>Cancel</button> */}
            </div>
        </div>
        </div>
    );
}
