import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoDb";
import transactionModel from "@/models/transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const transaction = await transactionModel
      .find({
        userId: session.user.id,
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ transaction });
  } catch (error) {
    console.log("Error While getting Transaction ", error);
    return NextResponse.json(
      { error: "Failed to get transactions" },
      { status: 500 }
    );
  }
}
