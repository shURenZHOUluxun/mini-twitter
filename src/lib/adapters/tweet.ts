import type { Tweet } from "@/src/types/tweet";

export function dbTweetToTweet(db: any): Tweet {
  return {
    id: db.id,
    parentId: db.parentId,

    author: {
      id: db.author.id,
      username: db.author.username,
      displayName: db.author.displayName,
      avatarUrl: db.author.avatarUrl ?? undefined,
    },

    content: {
      text: db.text,
      media: db.media?.map((m: any) => ({
        type: "image",
        url: m.url,
      })),
    },

    createdAt: db.createdAt,

    stats: {
      replyCount: db.replyCount,
      retweetCount: db.retweetCount,
      likeCount: db.likeCount,
    },

    viewerState: {
      liked: db.likes.length > 0,
      retweeted: db.retweets.length > 0,
    },
  };
}