/**
 * The function processes user transactions to provide actionable financial insights based on spending
 * patterns and offers tailored advice for budget optimization.
 * @param req - The code snippet you provided is a Next.js API route that handles a POST request. It
 * receives a JSON object containing transactions and a mode parameter. Based on the mode, it generates
 * a prompt for an AI financial assistant to analyze the transactions and provide insights on
 * overspending.
 * @returns a JSON response containing the generated financial insight based on the user's transaction
 * history analysis. This insight includes actionable advice on key spending categories, strategies to
 * reduce costs, and overall budgeting advice. If successful, the generated insight is returned;
 * otherwise, an error message is returned if there was an issue with the AI or API call.
 */
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { transactions, mode } = await req.json();

    const formattedTransactions = transactions
      .map(
        (t, i) =>
          `${i + 1}. Type: ${t.type.toUpperCase()} | Category: ${
            t.category
          } | Amount: ₹${t.amount} | Date: ${new Date(t.date).toDateString()}`
      )
      .join("\n");

    const prompt =
      mode === "full"
        ? `
You are a smart financial assistant whose sole job is to analyze a user’s transaction history and point out exactly where they’re overspending. Your tone should be actionable, comprehensive, and supportive.No need to add any greeting, Intialization or transaction you received as input, Just analysis like shown in suggestion.Your Result should be around than 50-70 words. Your tone should be actionable, concise, and caring

Here is the user’s transaction list:
${formattedTransactions}

Mode: full



Suggestions:
“Your rent is taking a large portion of your income; consider negotiating with your landlord or finding a roommate to split costs. You’re spending heavily on dining out—plan home‑cooked meals and set a weekly grocery budget to curb food expenses. Lastly, reduce entertainment spend by swapping paid services for free or bundled options, which could free up funds for more essential needs.”


Instruction:
1. Identify 2–3 key spending categories where the user spent more than necessary.
2. For each category, explain why it’s problematic and offer 1–2 concrete strategies to reduce costs.
3. At the end, summarize overall budgeting advice in 2–3 sentences.
4. Dont make points or Bullet points, Make it always as a paragrapgh

`
        : `
You are a smart financial assistant whose sole job is to analyze a user’s transaction history and point out exactly where they’re overspending. Your tone should be actionable, concise, and caring.No need to add any greeting or transaction you received as input, Just analysis like shown in insight.


Here is the user’s transaction list:
${formattedTransactions}

Mode: one_liner

Instruction:
• Produce exactly one short sentence (no more than 20 words) that calls out the single biggest area of potential savings and gives a simple next step.
• Do not include any explanations or extra context—just the one actionable insight.
•Don't Include any colon semi colon or any sentence dressing



Insight:
“Cut daily coffee runs—brew at home to save around ₹800 weekly.”

`;

    const response = await fetch(process.env.AI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: mode === "full" ? 300 : 50,
      }),
    });

    const data = await response.json();

    const output =
      data?.choices?.[0]?.message?.content?.trim() || "No insight generated.";
     

    return NextResponse.json({ output });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { error: "Failed to get AI insight." },
      { status: 500 }
    );
  }
}
