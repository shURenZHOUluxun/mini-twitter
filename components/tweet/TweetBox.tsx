'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/TweetBox.module.css';
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { HiGif } from "react-icons/hi2";
import { useState } from "react";
export default function  TweetBox({ 
  onSubmit,
  parentId, 
}: { 
  onSubmit: (parentId: string | undefined, text: string) => void,
  parentId?: string, // 如果是 reply 就传 parentId，发主贴则不传
}) {
  const [text, setText] = useState('');
  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(parentId, trimmed);
    setText("");
  };
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
          <button 
            className={styles.tweetButton}
            onClick={handleSubmit}
            disabled={!text.trim()}
          >Post</button>
        </div>
      </div>
    </div>
  );
}