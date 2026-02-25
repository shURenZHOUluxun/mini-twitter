export type Tweet = {
  id: string;

  parentId: string | null;

  author: {
    id: string;
    username: string;     // @username
    displayName: string;  // User Name
    avatarUrl?: string;   // optional
  };

  content: {
    text: string;
    media?: { type: "image"; url: string }[]; // 先做 image 
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
