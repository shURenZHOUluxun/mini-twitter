import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
export default function Profile() {
  return (
    <div className={styles.profileContainer}>
        <Image 
            src="/default-profile.png" 
            alt={styles.imageBanner}
            width={100} 
            height={100} 
            className={styles.imageBanner} />
        <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
        <h1 className={styles.name}>User Name</h1>
        <p className={styles.username}>@username</p>
    </div>
    
  );
}