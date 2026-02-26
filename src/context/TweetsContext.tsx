"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { mockTweets } from "@/src/data/mockTweets";
import type { Tweet } from "@/src/types/tweet";
import type { User } from "@/src/types/user";

type TweetsCtx = {
  tweets: Tweet[];
  toggleLike: (tweetId: string) => void;
  replyToTweet: (parentId: string, replyText: string, currentUser: User) => void;
};

const TweetsContext = createContext<TweetsCtx | null>(null);

export function TweetsProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);

  const toggleLike = (tweetId: string) => {
    setTweets((prev) =>
      prev.map((t) => {
        if (t.id !== tweetId) return t;

        const liked = !!t.viewerState?.liked;
        const nextLiked = !liked;

        return {
          ...t,
          viewerState: {
            ...(t.viewerState ?? {}),
            liked: nextLiked,
            retweeted: t.viewerState?.retweeted ?? false,
          },
          stats: {
            ...t.stats,
            likeCount: t.stats.likeCount + (nextLiked ? 1 : -1),
          },
        };
      })
    );
  };

  const replyToTweet = (parentId: string, replyText: string, currentUser: User) => {
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

  const value = useMemo(() => ({ tweets, toggleLike, replyToTweet }), [tweets]);

  return <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>;
}

export function useTweets() {
  const ctx = useContext(TweetsContext);
  if (!ctx) throw new Error("useTweets must be used within TweetsProvider");
  return ctx;
}