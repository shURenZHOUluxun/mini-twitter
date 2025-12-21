import styles from '../../styles/Header.module.css';
import { FaHome, FaSearch} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
export default function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li>
                    <FaXTwitter className={styles.icons} title='Logo'/> 
                </li>
                <li>
                    <FaHome className={styles.icons} title='Home'/>
                    <p className={styles.navItem}>Home</p>
                </li>
                <li>
                    <FaSearch className={styles.icons} title='Explore'/>
                    <p className={styles.navItem}>Explore</p>  
                </li>
                <li>
                    <CgProfile className={`${styles.icons} ${styles.profileIcon}`} title='Profile'/>
                    <p className={styles.navItem}>Profile</p>
                </li>
            </ul>
        </nav>
    </header>
  );    
}