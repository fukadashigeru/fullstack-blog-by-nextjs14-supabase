import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// DB接続用関数
export async function main() {
  try {
    await prisma.$connect();
    console.log("DB connected");
  } catch (error) {
    console.log("failed to connect DB");
    return error;
  }
}

// ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿用API
// export const POST = async (req: Request, res: NextResponse) => {
//   try {
//     await main();
//     const post = await prisma.post.create({
//       data: {
//         title: req.body.title,
//         description: req.body.description
//       }
//     });
//     return NextResponse.json({ message: "success", post }, { status: 201 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// ブログ投稿用API
export async function POST(request: Request) {
  try {
    await main();
    const { title, description } = await request.json();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    // return new Response(JSON.stringify({ message: "success", post }), {
    //   status: 201,
    // });
    return NextResponse.json({ message: "success", post }, { status: 201 });
  } catch (error) {
    console.log(error);
    // return new Response(JSON.stringify({ message: "Error", error }), {
    //   status: 500,
    // });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
