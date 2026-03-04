"use client";

import TweetCard from "@/components/tweet/TweetCard";
import type { User } from "@/src/types/user";
import { useTweets } from "@/src/context/TweetsContext";

export default function Feed() {
  const { tweets, toggleLike, replyToTweet } = useTweets();

  return (
    <section>
      {tweets
        .filter((t) => !t.parentId) // 首页只显示主贴（不把 replies 混进 feed）
        .map((t) => (
          <TweetCard
            key={t.id}
            tweet={t}
            onToggleLike={() => toggleLike(t.id)}
            onReply={(parentId, text) => replyToTweet(parentId, text)}
          />
        ))}
    </section>
  );
}
