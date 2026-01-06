'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';

export default function Profile() {
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
            <button className={styles.editProfileButton}>Edit Profile</button>
            <p className={styles.username}>@username</p>
        </div>
        
    </div>
    
  );
}