"use client";
import { useState } from "react";
import TweetCard from "@/components/tweet/TweetCard";
import { mockTweets } from "@/src/data/mockTweets";
import type { Tweet } from "@/src/types/tweet";

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  

  const toggleLike = (tweetId: string) => {
    setTweets((prev) =>
      prev.map((t) => {
        if (t.id !== tweetId) return t;

        const liked = !!t.viewerState?.liked;
        const nextLiked = !liked;

        return {
          ...t,
          viewerState: { ...(t.viewerState ?? {}), liked: nextLiked, retweeted: t.viewerState?.retweeted ?? false },
          stats: {
            ...t.stats,
            likeCount: t.stats.likeCount + (nextLiked ? 1 : -1),
          },
        };
      })
    );
  };

  const onReply = (tweetId: string, replyText: string) => {
    console.log("reply to", tweetId, replyText);
  };


  return (
    <section>
      {tweets.map((t) => (
        <TweetCard 
          key={t.id} 
          tweet={t} 
          onToggleLike={() => toggleLike(t.id)} 
          onReply={onReply} 
        />
      ))}
    </section>
  );
}
