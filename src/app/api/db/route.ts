import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  await db.post.deleteMany();
  revalidatePath("/");

  return NextResponse.json({
    success: true,
    status: 200,
    message: "All posts deleted",
  });
}
