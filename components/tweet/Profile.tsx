import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
export default function Profile() {
  return (
    <div>
       <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
       <h1 className={styles.name}>User Name</h1>
       <p className={styles.username}>@username</p>
    </div>
    
  );
}