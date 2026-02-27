"use client";

import TweetCard from "@/components/tweet/TweetCard";
import { useTweets } from "@/src/context/TweetsContext";
import type { User } from "@/src/types/user";
import type { Tweet } from "@/src/types/tweet";

function buildAncestorChain(all: Tweet[], start: Tweet) {
  const chain: Tweet[] = [];
  let cur: Tweet | undefined = start;

  while (cur?.parentId) {
    const parent = all.find((t) => t.id === cur!.parentId);
    if (!parent) break;              // 数据缺失就停
    chain.unshift(parent);           // 保持从祖先到近父的顺序
    cur = parent;

    // 防死循环（防止错误数据 parentId 循环引用）
    if (chain.length > 50) break;
  }

  return chain;
}

export default function PostPageClient({ id }: { id: string }) {
  const { tweets, toggleLike, replyToTweet } = useTweets();

  const currentUser: User = {
    id: "u2",
    username: "current_user",
    displayName: "Current User",
    avatarUrl: "",
  };

  const main = tweets.find((t) => t.id === id);
  if (!main) return <div>Tweet not found</div>;
  const ancestors = buildAncestorChain(tweets, main);
  const replies = tweets
    .filter((t) => t.parentId === id)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  return (
  <section>

    {/* 1渲染父链路ancestor*/}
    {ancestors.map((tweet, i) => (
      <TweetCard
        key={tweet.id}
        tweet={tweet}
        showThreadLine={true}
        onToggleLike={() => toggleLike(tweet.id)}
        onReply={(parentId, text) =>
          replyToTweet(parentId, text, currentUser)
        }
      />
    ))}

    {/* 2当前主 tweet */}
    <TweetCard
      tweet={main}
      disableNavigation
      showThreadLine={true}
      onToggleLike={() => toggleLike(main.id)}
      onReply={(parentId, text) =>
        replyToTweet(parentId, text, currentUser)
      }
    />

    {/* 3replies */}
    {replies.map((tweet, i) => (
      <TweetCard
        key={tweet.id}
        tweet={tweet}
        showThreadLine={i !== replies.length - 1} // don't show line for the last reply
        onToggleLike={() => toggleLike(tweet.id)}
        onReply={(parentId, text) =>
          replyToTweet(parentId, text, currentUser)
        }
      />
    ))}
  </section>
  );
}