"use client";

import styles from "@/styles/EditProfileModal.module.css";

export default function EditProfileModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 阻止冒泡
      >
        <h2>Edit profile</h2>

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
          <button className={styles.save}>Save</button>
        </div>
      </div>
    </div>
  );
}
