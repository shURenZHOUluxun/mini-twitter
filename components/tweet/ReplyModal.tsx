"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ReplyModal.module.css";

export default function ReplyModal({
  tweetAuthor,
  tweetText,
  onClose,
  onSubmit,
}: {
  tweetAuthor: string;     // "@username"
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
        // ✅ 只点到背景才关闭（避免拖动/点击内部误触）
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
          <div className={styles.meta}>{tweetAuthor}</div>
          <div className={styles.text}>{tweetText}</div>
        </div>

        <textarea
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
