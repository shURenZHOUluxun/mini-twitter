import styles from "@/styles/TweetCard.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
import ReplyModal from "./ReplyModal";
import { useState } from "react";

import type { Tweet } from "@/src/types/tweet";

export default function TweetCard({ 
  tweet,
  onToggleLike,
  onReply,
}: { 
  tweet: Tweet,
  onToggleLike: () => void,
  onReply: (tweetId: string, text: string) => void
}) {
  const liked = !!tweet.viewerState?.liked;
  const [openReply, setOpenReply] = useState(false);

  return (
    <section className={styles.cardContainer}>
        <CgProfile className={styles.profileIcon} title='Profile Icon' />
        
        <div className={styles.tweetContent}>
            <div className={styles.tweetHeader}>
              <span className={styles.name}>{tweet.author.displayName}</span>
              <span className={styles.username}>@{tweet.author.username}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.time}>{new Date(tweet.createdAt).toLocaleString()}</span>
            </div>
            <p className={styles.tweetText}>{tweet.content.text}</p>

            {!!tweet.content.media?.length && (
              <div style={{ marginTop: 8 }}>
                {tweet.content.media.map((m, i) =>
                  m.type === "image" ? (
                    <Image
                      key={i}
                      src={m.url}
                      alt="media"
                      width={400}
                      height={400}
                      className={styles.tweetImage}
                    />
                  ) : null
                )}
              </div>
            )}
            {/* <Image src="/uoft_grass.webp" alt="Tweet Image" width={500} height={300} className={styles.tweetImage} /> */}
            <ul className={styles.tweetActions}>
              <li 
                className={`${styles.likeContainer} ${liked ? styles.liked : ""}`}
                onClick={onToggleLike}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onToggleLike();
                }}                
                role="button"                
                tabIndex={0}
              >
                <div className={styles.likeIcon}>
                  <AiOutlineLike title='Like' />
                </div>
                <span className={styles.likeCount}>{tweet.stats.likeCount}</span>
              </li>
              <li className={styles.commentContainer}>
                <div className={styles.commentIcon} 
                  onClick={() => setOpenReply(true)} >
                  <FaRegComment title='Comment' />
                </div>
                <span className={styles.commentCount}>{tweet.stats.replyCount}</span>
              </li>
            </ul>
        </div>
        {openReply && (
          <ReplyModal
            tweetAuthor={`@${tweet.author.username}`}
            tweetText={tweet.content.text}
            onClose={() => setOpenReply(false)}
            onSubmit={(replyText) => onReply(tweet.id, replyText)}
          />
        )}
    </section>
  );
}            