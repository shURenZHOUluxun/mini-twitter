"use client";

import styles from "@/styles/EditProfileModal.module.css";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRef } from "react";

export default function EditProfileModal({
    initialName,
    initialBio,
    onNameChange,
    onBioChange,
    onClose,
}: {
    initialName: string;
    initialBio: string;
    onNameChange: (newName: string) => void;
    onBioChange: (newBio: string) => void;
    onClose: () => void;
}) {
    const [bio, setBio] = useState(initialBio);
    const [name, setName] = useState(initialName);
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
                    onClose();  // Close the modal after saving 
                }} className={styles.save}>save</button>
            </section>
            

            <input type="file"
                ref={fileInputRef}
                accept="image/*" 
                className={styles.fileInput} />
            <CgProfile className={styles.profileIcon}
                onClick={() => fileInputRef.current?.click()}
                title='Profile Icon' />

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
