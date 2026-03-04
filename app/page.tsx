"use client";

import FeedTweet from "@/components/tweet/FeedTweet";
import TweetBox from "@/components/tweet/TweetBox";
import { useTweets } from "@/src/context/TweetsContext";
import type { User } from "@/src/types/user";

export default function Home() {
  const { createTweet } = useTweets();

  return (
    <>
      <TweetBox
        parentId="" // 主贴不需要 parentId，但为了复用组件给个空字符串
        onSubmit={(_, payload) => createTweet(payload)} // 发主贴
      />
      <FeedTweet />
    </>
  );
}
