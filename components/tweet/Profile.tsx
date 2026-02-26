'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('username');
  const [name, setName] = useState('User Name');
  const [bio, setBio] = useState('This is the user bio.');
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div className={styles.profileContainer}>
        <div className={styles.imageWrapper}>
          <Image 
              src="/uoft_grass.webp" 
              alt={styles.imageBanner}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              width={100} 
              height={100} 
              className={styles.imageBanner} />
        </div>
        
        <div className={styles.spacer}>
            {avatarUrl ? (
              <Image 
                src={avatarUrl} 
                alt="Profile Avatar"
                width={100} 
                height={100} 
                className={styles.profileIcon} />
            ) :(
              <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
            )}
            <h1 className={styles.name}>{name}</h1>
            <button 
                onClick={() => setOpen(true)} 
                className={styles.editProfileButton}
            >Edit Profile</button>
            {open && (
                <EditProfileModal 
                  initialName={name}
                  initialBio={bio}
                  initialAvatar={avatarUrl}
                  onNameChange={(newName) => setName(newName)}
                  onBioChange={(newBio) => setBio(newBio)}
                  onAvatarUrlChange={(newUrl) => setAvatarUrl(newUrl)}
                  onClose={() => setOpen(false)} />
            )}
            <p className={styles.username}>@{username}</p>
        </div>
        <p className={styles.bio}>{bio}</p>
    </div>
    
  );
}