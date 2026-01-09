'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.profileContainer}>
        <div className={styles.imageWrapper}>
          <Image 
              src="/default-profile.png" 
              alt={styles.imageBanner}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              width={100} 
              height={100} 
              className={styles.imageBanner} />
        </div>
        
        <div className={styles.spacer}>
            <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
            <h1 className={styles.name}>User Name</h1>
            <button 
                onClick={() => setOpen(true)} 
                className={styles.editProfileButton}
            >Edit Profile</button>
            {open && (
                <EditProfileModal onClose={() => setOpen(false)} />
            )}
            <p className={styles.username}>@username</p>
        </div>
        <p className={styles.bio}>This is the user bio.</p>
    </div>
    
  );
}