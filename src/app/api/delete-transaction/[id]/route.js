import { NextResponse } from "next/server";

import transactionModel from "@/models/transaction.js"; 
import dbConnect from "@/lib/mongoDb";

/**
 * This JavaScript function uses async/await to handle a DELETE request to delete a transaction from a
 * database and returns appropriate responses based on the outcome.
 * @param request - The `request` parameter represents the incoming request to the server. It contains
 * information about the request such as headers, body, method, etc. In this context, it is used to
 * handle the DELETE request for deleting a transaction.
 * @returns The DELETE function returns a JSON response with a message indicating whether the
 * transaction was successfully deleted or not. If the transaction is deleted, it returns a success
 * message along with the deleted transaction details and a status code of 200. If the transaction is
 * not found, it returns an error message indicating that the transaction was not found and a status
 * code of 404. If there is an error during the deletion
 */
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const deletedTxn = await transactionModel.findByIdAndDelete(id);

    if (!deletedTxn) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted", deletedTxn },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
