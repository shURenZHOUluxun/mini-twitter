import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// POST /api/tweets/:id/retweet
export async function POST(req: Request, { params }: Params) {
  const { id: tweetId } = await params;
  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.retweet.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
      select: { id: true },
    });
    if (existing) return { ok: true, already: true };

    await tx.retweet.create({ data: { tweetId, userId } });
    await tx.tweet.update({
      where: { id: tweetId },
      data: { retweetCount: { increment: 1 } },
    });
    return { ok: true, already: false };
  });

  return NextResponse.json(result);
}

// DELETE /api/tweets/:id/retweet
export async function DELETE(req: Request, { params }: Params) {
  const { id: tweetId } = await params;
  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.retweet.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
      select: { id: true },
    });
    if (!existing) return { ok: true, already: true };

    await tx.retweet.delete({
      where: { tweetId_userId: { tweetId, userId } },
    });
    await tx.tweet.update({
      where: { id: tweetId },
      data: { retweetCount: { decrement: 1 } },
    });
    return { ok: true, already: false };
  });

  return NextResponse.json(result);
}