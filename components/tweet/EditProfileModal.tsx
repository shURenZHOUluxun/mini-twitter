"use client";

import styles from "@/styles/EditProfileModal.module.css";
import { CgProfile } from "react-icons/cg";

export default function EditProfileModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>  {/* click outside to close modal */}
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 阻止冒泡
      >
        <h2>Edit profile</h2>

        <CgProfile className={styles.profileIcon} title='Profile Icon' />

        <label>
          Name
          <input type="text" />
        </label>

        <label>
          Bio
          <textarea rows={3} />
        </label>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onClose} className={styles.save}>Save</button>
        </div>
      </div>
    </div>
  );
}
