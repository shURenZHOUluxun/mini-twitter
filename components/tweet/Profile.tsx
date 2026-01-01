import { CgProfile } from "react-icons/cg";
import styles from '../../styles/Profile.module.css';
export default function Profile() {
  return (
    <div>
       <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
    </div>
    
  );
}