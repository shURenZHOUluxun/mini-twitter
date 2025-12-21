'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/TweetBox.module.css';
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { HiGif } from "react-icons/hi2";
import { useState } from "react";
export default function  TweetBox() {
  const [text, setText] = useState('');
  return (
    <div className={styles.tweetBox}>
      <CgProfile className={styles.profileIcon} title='Profile Icon' />
      <div className={styles.divider}>
        <textarea 
          className={styles.textarea} 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          rows={3} />
        <div className={styles.clickableArea}>
          <ul className={styles.actionList}>
            <li className={styles.actionItem}>
              <FaImage className={styles.icon} title="image"/>
            </li>
            <li className={styles.actionItem}>
              <HiGif className={styles.icon} title="gif"/>
            </li>
            <li className={styles.actionItem}>
              <MdEmojiEmotions className={styles.icon} title="emoji"/>
            </li>
          </ul>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
}