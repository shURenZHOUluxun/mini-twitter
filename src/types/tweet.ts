export type Tweet = {
  id: string;

  author: {
    id: string;
    username: string;     // @username
    displayName: string;  // User Name
    avatarUrl?: string;   // optional
  };

  content: {
    text: string;
    media?: { type: "image"; url: string }[]; // 先做 image 就够
  };

  createdAt: string; // ISO string, e.g. new Date().toISOString()

  stats: {
    replyCount: number;
    retweetCount: number;
    likeCount: number;
  };

  viewerState?: {
    liked: boolean;
    retweeted: boolean;
  };
};
