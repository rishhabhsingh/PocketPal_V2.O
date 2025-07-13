import dbConnect from "@/lib/mongoDb";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema";
import { registerSchema, loginSchema } from "@/lib/validations/authSchema";

// Register Function
export async function registerUser(data) {
  await dbConnect();

  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "credentials",
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    provider: user.provider,
  };
}

// Login Function
export async function loginUser(data) {
  await dbConnect();

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { identifier, password } = parsed.data;

  const user = await User.findOne({
    $or: [{ email: identifier }, { name: identifier }],
  });

  if (!user || user.provider !== "credentials") {
    throw new Error("User not found or signed up with Google");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password. Please try again.");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    provider: user.provider,
  };
}
