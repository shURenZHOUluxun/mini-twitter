import { CgProfile } from "react-icons/cg";
import styles from '../../styles/TweetBox.module.css';
export default function  TweetBox() {
  return (
    <div className={styles.tweetBox}>
      <CgProfile className={styles.profileIcon} title='Profile Icon' />
      <div className={styles.divider}>
        <textarea className={styles.textarea} placeholder="What's happening?" />
        <button className={styles.tweetButton}>Tweet</button>
      </div>
    </div>
  );
}