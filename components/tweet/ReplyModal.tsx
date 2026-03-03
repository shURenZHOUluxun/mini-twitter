"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ReplyModal.module.css";
import { User } from "@/src/types/user";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

export default function ReplyModal({
  tweetAuthor,
  tweetText,
  onClose,
  onSubmit,
}: {
  tweetAuthor: User;     
  tweetText: string;       // 原 tweet 内容
  onClose: () => void;
  onSubmit: (replyText: string) => void;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        // 只点到背景才关闭（避免拖动/点击内部误触）
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h3>Reply</h3>
          <button type="button" onClick={onClose}>✕</button>
        </header>

        <div className={styles.tweetPreview}>
          <div className={styles.avatarWrapper}>
            {tweetAuthor.avatarUrl ? (
              <Image 
                src={tweetAuthor.avatarUrl} 
                alt="Profile Avatar"
                width={100} 
                height={100} 
                className={styles.profileIcon} />
            ) :(
              <CgProfile className={styles.profileIcon} title='Profile Icon' /> 
            )}
          </div>
          
          <div className={styles.tweetContent}>
            <div className={styles.meta}>@{tweetAuthor.username}</div>
            <div className={styles.text}>{tweetText}</div>
          </div>
          
        </div>

        <textarea
          className={styles.textarea}
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Post your reply"
          rows={4}
        />

        <footer className={styles.actions}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => {
              onSubmit(text.trim());
              onClose();
            }}
          >
            Reply
          </button>
        </footer>
      </div>
    </div>
  );
}
