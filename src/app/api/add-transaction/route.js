/**
 * This JavaScript function handles the POST request for adding a transaction to a database after
 * validating the input data and user authentication.
 * @param req - The `req` parameter in the code snippet represents the request object that is passed to
 * the POST function. It contains information about the incoming HTTP request, such as headers, body,
 * and other request details. In this case, the code is using `req.json()` to parse the JSON body of
 * the
 * @returns The POST function returns a JSON response based on the outcome of the transaction creation
 * process. Here are the possible return scenarios:
 */
import dbConnect from "@/lib/mongoDb";
import { transactionSchema } from "@/lib/validations/transactionSchema.js";
import transactionModel from "@/models/transaction.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const body = await req.json();
    const parsed = transactionSchema.safeParse(body);
    const userId = session?.user?.id || session?.user?.email;

   

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
     
    if (!parsed.success) {
       
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { title, amount, type,category, date } = parsed.data;

    const transaction = await transactionModel.create({
      title,
      amount,
      type,
      category,
      date,
      userId,
    });

    return NextResponse.json(
      { message: "Transaction Added Successfully", transaction },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
