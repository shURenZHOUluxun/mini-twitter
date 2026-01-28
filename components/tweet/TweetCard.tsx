import styles from "@/styles/TweetCard.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
export default function TweetCard() {
  return (
    <section className={styles.cardContainer}>
        <CgProfile className={styles.profileIcon} title='Profile Icon' />
        
        <div className={styles.tweetContent}>
            <div className={styles.tweetHeader}>
              <span className={styles.name}>Nike name</span>
              <span className={styles.username}>@username</span>
              <span className={styles.dot}>·</span>
              <span className={styles.time}>3h</span>
            </div>
            <p className={styles.tweetText}>This is a sample tweet content to demonstrate the TweetCard component.</p>
            <Image src="/uoft_grass.webp" alt="Tweet Image" width={500} height={300} className={styles.tweetImage} />
            <ul className={styles.tweetActions}>
              <li className={styles.likeIcon}>
                <AiOutlineLike title='Like' />
              </li>
              <li className={styles.commentIcon}>
                <FaRegComment  title='Comment' />
              </li>
            </ul>
        </div>
    </section>
  );
}            