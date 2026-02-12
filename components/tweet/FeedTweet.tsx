"use client";
import { useState } from "react";
import TweetCard from "@/components/tweet/TweetCard";
import { mockTweets } from "@/src/data/mockTweets";
import type { Tweet } from "@/src/types/tweet";

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);

  return (
    <section>
      {tweets.map((t) => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </section>
  );
}
