import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){

    const cookieStore = await cookies();
    // In production on HTTPS, NextAuth sets a secure cookie name
    const encodeToken =
        cookieStore.get("next-auth.session-token")?.value ||
        cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!encodeToken) {
        return undefined;
    }

    const decodeToken = await decode({ token: encodeToken, secret: process.env.NEXTAUTH_SECRET! });
    const token = decodeToken?.token;

    return token;
}