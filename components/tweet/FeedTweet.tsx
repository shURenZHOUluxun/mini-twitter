"use client";
import { useState } from "react";
import TweetCard from "@/components/tweet/TweetCard";
import { mockTweets } from "@/src/data/mockTweets";
import type { Tweet } from "@/src/types/tweet";
import type { User } from "@/src/types/user";

export default function Feed() { // pass in user as parameter, or use context?  
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  const currentUser: User = {
    id: "u2",
    username: "current_user",
    displayName: "Current User",
    avatarUrl: "",
  };

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

    const onReply = (parentId: string, replyText: string) => {
    const newReply: Tweet = {
      id: crypto.randomUUID(),
      parentId, 
      author: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
      },
      content: { text: replyText },
      createdAt: new Date().toISOString(),
      stats: { replyCount: 0, retweetCount: 0, likeCount: 0 },
      viewerState: { liked: false, retweeted: false },
    };

    setTweets((prev) =>
      prev
        .map((t) =>
          t.id === parentId
            ? { ...t, stats: { ...t.stats, replyCount: t.stats.replyCount + 1 } }
            : t
        )
        .concat(newReply)
    );
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
