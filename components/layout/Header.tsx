import styles from '../../styles/Header.module.css';
import { FaHome, FaSearch} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li id={styles.logo}>
                    <Link href="/">
                    {/* add input  */}
                        <FaXTwitter className={styles.icons} title='Logo'/> 
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <FaHome className={styles.icons} title='Home'/>
                        <p className={styles.navItem}>Home</p>
                    </Link>
                </li>
                <li>
                    <FaSearch className={styles.icons} title='Explore'/>
                    <p className={styles.navItem}>Explore</p>  
                </li>
                <li>
                    <Link href="/Profile">
                        <CgProfile className={`${styles.icons} ${styles.profileIcon}`} title='Profile'/>
                        <p className={styles.navItem}>Profile</p>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  );    
}