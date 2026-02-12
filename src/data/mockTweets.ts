import type { Tweet } from "@/src/types/tweet";

export const mockTweets: Tweet[] = [
  {
    id: "t1",
    author: {
      id: "u1",
      username: "username",
      displayName: "User Name",
      avatarUrl: "",
    },
    content: {
      text: "My first tweet in my mini-twitter",
      media: [],
    },
    createdAt: new Date().toISOString(),
    stats: { replyCount: 0, retweetCount: 0, likeCount: 0 },
    viewerState: { liked: false, retweeted: false },
  },
];
