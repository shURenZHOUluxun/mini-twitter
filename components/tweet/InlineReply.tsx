"use client";
import { useState } from "react";

import styles from "@/styles/InlineReply.module.css";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { User } from "@/src/types/user";

export default function InlineReply({
  parentId,
  replyer,
  onSubmit,
}: {
  parentId: string;
  replyer: User | null;
  onSubmit: (parentId: string, text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className={styles.inlineReply}>
      <div className={styles.replyerWrapper}>
        <div className={styles.replyerAvatarWrapper}>
          {replyer?.avatarUrl ? (
            <Image 
              src={replyer.avatarUrl} 
              alt="Profile Avatar"
              width={100} 
              height={100} 
              className={styles.replyerIcon} />
            ) :(
              <CgProfile className={styles.replyerIcon} title='Profile Icon' /> 
          )}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Post your reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", resize: "none" }}
        />
      </div>


      <button
        className={styles.replyButton}
        onClick={() => {
          if (!text.trim()) return;
          onSubmit(parentId, text);
          setText("");
        }}
      >
        Reply
      </button>
    </div>
  );
}