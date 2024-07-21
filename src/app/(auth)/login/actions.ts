"use server";

import { loginSchema, LoginSchemaType } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { lucia } from "@/auth";

const Login = async (
  credentials: LoginSchemaType,
): Promise<{ error: string }> => {
  try {
    const { username, password } = loginSchema.parse(credentials);
    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Incorrect username or passoword" };
    }

    const validatePassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validatePassword) {
      return { error: "Incorrect username or passoword" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
};

export default Login;
