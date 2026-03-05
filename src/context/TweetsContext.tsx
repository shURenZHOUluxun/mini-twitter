"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dbTweetToTweet } from "@/src/lib/adapters/tweet";
import type { Tweet } from "@/src/types/tweet";
import type { User } from "@/src/types/user";

type TweetsCtx = {
  tweets: Tweet[];
  currentUser: User | null;
  isReady: boolean;

  toggleLike: (tweetId: string) => void;
  replyToTweet: (parentId: string, replyText: string) => void;
  createTweet: (payload: { text: string; media: { type: "image"; url: string }[] }) => void;
};

const TweetsContext = createContext<TweetsCtx | null>(null);

export function TweetsProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch("/api/tweets")
      .then((r) => r.json())
      .then((data) => {
        setCurrentUser(data.currentUser ?? null);
        setTweets((data.tweets ?? []).map(dbTweetToTweet));
      })
      .finally(() => setIsReady(true));
  }, []);

  const toggleLike = (tweetId: string) => {
    if (!currentUser) return; // ✅ 防止未加载就点击

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

    // 下一步你会接这里调用 /api/tweets/:id/like （现在先本地乐观更新也行）
  };

  const replyToTweet = (parentId: string, replyText: string) => {
    if (!currentUser) return; // ✅

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

  const createTweet = (payload: { text: string; media: { type: "image"; url: string }[] }) => {
    if (!currentUser) return; // ✅

    const newTweet: Tweet = {
      id: crypto.randomUUID(),
      parentId: null,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
      },
      createdAt: new Date().toISOString(),
      content: {
        text: payload.text,
        media: payload.media,
      },
      stats: { replyCount: 0, retweetCount: 0, likeCount: 0 },
      viewerState: { liked: false, retweeted: false },
    };

    setTweets((prev) => [newTweet, ...prev]);
  };

  const value = useMemo(
    () => ({
      tweets,
      currentUser,
      isReady,
      toggleLike,
      replyToTweet,
      createTweet,
    }),
    [tweets, currentUser, isReady]
  );

  return <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>;
}

export function useTweets() {
  const ctx = useContext(TweetsContext);
  if (!ctx) throw new Error("useTweets must be used within TweetsProvider");
  return ctx;
}