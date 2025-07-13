import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password:z.string().min(3)
})

export const loginSchema = z.object({
    identifier: z.string(),
    password: z.string()
})