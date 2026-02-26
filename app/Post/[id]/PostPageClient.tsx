"use client";

import TweetCard from "@/components/tweet/TweetCard";
import { useTweets } from "@/src/context/TweetsContext";
import type { User } from "@/src/types/user";

export default function PostPageClient({ id }: { id: string }) {
  const { tweets, toggleLike, replyToTweet } = useTweets();

  const currentUser: User = {
    id: "u2",
    username: "current_user",
    displayName: "Current User",
    avatarUrl: "",
  };

  const main = tweets.find((t) => t.id === id);
  const replies = tweets
    .filter((t) => t.parentId === id)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  if (!main) return <div>Tweet not found</div>;

  return (
    <section>
      {/* 主贴：禁用点击跳转（避免在 post page 再 push 自己） */}
      <TweetCard
        tweet={main}
        disableNavigation
        onToggleLike={() => toggleLike(main.id)}
        onReply={(parentId, text) => replyToTweet(parentId, text, currentUser)}
      />

      <div style={{ marginTop: 16 }}>
        <h3>Replies</h3>
        {replies.length === 0 ? (
          <p>No replies yet.</p>
        ) : (
          replies.map((r) => (
            <TweetCard
              key={r.id}
              tweet={r}
              disableNavigation
              onToggleLike={() => toggleLike(r.id)}
              onReply={(parentId, text) => replyToTweet(parentId, text, currentUser)}
            />
          ))
        )}
      </div>
    </section>
  );
}