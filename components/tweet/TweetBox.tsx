'use client';
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/TweetBox.module.css';
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { HiGif } from "react-icons/hi2";
import { useState } from "react";
import { useRef } from "react";

type MediaItem = {
  type: 'image';
  url: string;
};
export default function  TweetBox({ 
  onSubmit,
  parentId, 
}: { 
  onSubmit: (parentId: string | undefined, payload: { text: string; media: MediaItem[] }) => void;
  parentId?: string, // 如果是 reply 就传 parentId，发主贴则不传
}) {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const addImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const readOne = (file: File) =>
      new Promise<MediaItem>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ type: "image", url: String(reader.result) });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newMedia = await Promise.all(list.map(readOne));

    setMedia((prev) => prev.concat(newMedia));
  };

  const removeImage = (idx: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed && media.length === 0) return;

    onSubmit(parentId, { text: trimmed, media });
    setText("");
    setMedia([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

        {/* 图片预览 */}
        {media.length > 0 && (
          <div className={styles.mediaGrid}>
            {media.map((m, idx) => (
              <div key={idx} className={styles.mediaItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt="upload preview" className={styles.mediaImg} />
                <button
                  type="button"
                  className={styles.mediaRemove}
                  onClick={() => removeImage(idx)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.clickableArea}>
          <ul className={styles.actionList}>
            <li className={styles.actionItem}>
              {/* 点图标打开 file input */}
              <button
                type="button"
                className={styles.icon}
                onClick={() => fileInputRef.current?.click()}
              >
                <FaImage title="image" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => addImages(e.target.files)}
              />
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