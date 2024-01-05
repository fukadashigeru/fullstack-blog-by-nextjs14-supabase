// "use client";
import { PrismaClient } from "@prisma/client";
import { main } from "../route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// app/api/blog/[id]/route.ts
// ブログ詳細記事取得API

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await main();
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    });
    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログの記事編集API
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await main();
    const { title, description } = await req.json();
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: { title, description },
    });
    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログの記事削除API
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await main();
    const post = await prisma.post.delete({
      where: { id: Number(params.id) },
    });
    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
