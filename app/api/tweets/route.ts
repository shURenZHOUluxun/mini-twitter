import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/currentUser";

const AUTHOR_SELECT = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} as const;

const MEDIA_SELECT = {
  id: true,
  type: true,
  url: true,
} as const;

// GET /api/tweets  拉 feed
export async function GET() {
  const user = await getCurrentUser();
  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      author: true,
      media: true,
      likes: {
        where: { userId: user.id },
        select: { id: true },
      },
      retweets: {
        where: { userId: user.id },
        select: { id: true },
      },
    },
  });

  return NextResponse.json({ 
    tweets, 
    currentUser: user });
}

// POST /api/tweets  发推（MVP：authorId 从前端传；以后接 auth 再从 session 取）
// no authorid to prevent abuse, but in real app we will get it from session after auth
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const text = typeof body?.text === "string" ? body.text.trim() : "";
  const authorId = typeof body?.authorId === "string" ? body.authorId : "";
  const parentId = typeof body?.parentId === "string" ? body.parentId : null;

  const mediaInput = Array.isArray(body?.media) ? body.media : [];
  const media = mediaInput
    .filter(
      (m: any) =>
        m &&
        typeof m.type === "string" &&
        typeof m.url === "string" &&
        m.url.length > 0
    )
    .map((m: any) => ({ type: m.type, url: m.url }));

  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }
  if (!authorId) {
    return NextResponse.json({ error: "authorId is required" }, { status: 400 });
  }

  // 可选：检查 author 存在（更友好）
  const authorExists = await prisma.user.findUnique({
    where: { id: authorId },
    select: { id: true },
  });
  if (!authorExists) {
    return NextResponse.json({ error: "author not found" }, { status: 404 });
  }

  const tweet = await prisma.tweet.create({
    data: {
      text,
      authorId,
      parentId,
      media: media.length ? { create: media } : undefined,
    },
    include: {
      author: { select: AUTHOR_SELECT },
      media: { select: MEDIA_SELECT, orderBy: { id: "asc" } },
    },
  });

  // 如果是 reply：维护 parent 的 replyCount
  if (parentId) {
    await prisma.tweet.update({
      where: { id: parentId },
      data: { replyCount: { increment: 1 } },
    });
  }

  return NextResponse.json({ tweet }, { status: 201 });
}