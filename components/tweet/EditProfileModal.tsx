"use client";

import styles from "@/styles/EditProfileModal.module.css";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRef } from "react";

export default function EditProfileModal({
  onClose,
}: {
  onClose: () => void;
}) {
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.overlay} onClick={onClose}>  {/* click outside to close modal */}
        <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // 阻止冒泡
        >
            <h2>Edit profile</h2>

            <input type="file"
                ref={fileInputRef}
                accept="image/*" 
                className={styles.fileInput} />
            <CgProfile className={styles.profileIcon}
                onClick={() => fileInputRef.current?.click()}
                title='Profile Icon' />

            <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
            Bio
            <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </label>

            <div className={styles.actions}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onClose} className={styles.save}>Save</button>
            </div>
        </div>
        </div>
    );
}
