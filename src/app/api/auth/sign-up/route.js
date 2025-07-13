import { registerUser } from "@/controllers/authController";

export async function POST(req) {
  try {
    const data = await req.json();
    const user = await registerUser(data);
    return Response.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
