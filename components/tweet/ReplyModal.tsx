"use client";

import { useEffect, useRef, useState } from "react";

export default function ReplyModal({
  tweetAuthor,
  tweetText,
  onClose,
  onSubmit,
}: {
  tweetAuthor: string;     // "@fabe"
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
      className="overlay"
      onMouseDown={(e) => {
        // ✅ 只点到背景才关闭（避免拖动/点击内部误触）
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="header">
          <h3>Reply</h3>
          <button type="button" onClick={onClose}>✕</button>
        </header>

        <div className="tweetPreview">
          <div className="meta">{tweetAuthor}</div>
          <div className="text">{tweetText}</div>
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Post your reply"
          rows={4}
        />

        <footer className="actions">
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
