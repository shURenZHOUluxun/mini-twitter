import type { Tweet } from "@/src/types/tweet";

export const mockTweets: Tweet[] = [
  {
    id: "t1",
    parentId: null,
    author: {
      id: "u1",
      username: "username",
      displayName: "User Name",
      avatarUrl: "",
    },
    content: {
      text: "My first tweet in my mini-twitter",
      media: [
        {
          type: "image",
          url: "/uoft_grass.webp",
        },
      ],
    },
    createdAt: new Date().toISOString(),
    stats: { replyCount: 5, retweetCount: 0, likeCount: 6 },
    viewerState: { liked: false, retweeted: false },
  },
];
