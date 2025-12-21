import { CgProfile } from "react-icons/cg";
import styles from '../../styles/TweetBox.module.css';
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { HiGif } from "react-icons/hi2";
export default function  TweetBox() {
  return (
    <div className={styles.tweetBox}>
      <CgProfile className={styles.profileIcon} title='Profile Icon' />
      <div className={styles.divider}>
        <textarea className={styles.textarea} placeholder="What's happening?" />
        <div className={styles.clickableArea}>
          <ul className={styles.actionList}>
            <li className={styles.actionItem}>
              <FaImage title="image"/>
            </li>
            <li className={styles.actionItem}>
              <HiGif title="gif"/>
            </li>
            <li className={styles.actionItem}>
              <MdEmojiEmotions title="emoji"/>
            </li>
          </ul>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
}