import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// POST /api/tweets/:id/like
export async function POST(req: Request, { params }: Params) {
  const { id: tweetId } = await params;
  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // 用 transaction 保证 Like + 计数一致
  const result = await prisma.$transaction(async (tx) => {
    // 如果已 like，直接返回（避免 unique 冲突）
    const existing = await tx.like.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
      select: { id: true },
    });
    if (existing) return { ok: true, already: true };

    await tx.like.create({ data: { tweetId, userId } });
    await tx.tweet.update({
      where: { id: tweetId },
      data: { likeCount: { increment: 1 } },
    });
    return { ok: true, already: false };
  });

  return NextResponse.json(result);
}

// DELETE /api/tweets/:id/like  (body 里带 userId)
export async function DELETE(req: Request, { params }: Params) {
  const { id: tweetId } = await params;
  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.like.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
      select: { id: true },
    });
    if (!existing) return { ok: true, already: true };

    await tx.like.delete({
      where: { tweetId_userId: { tweetId, userId } },
    });
    await tx.tweet.update({
      where: { id: tweetId },
      data: { likeCount: { decrement: 1 } },
    });
    return { ok: true, already: false };
  });

  return NextResponse.json(result);
}