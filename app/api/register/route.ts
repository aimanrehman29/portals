import { NextResponse } from "next/server";

let users: { email: string; password: string }[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  users.push(body);

  return NextResponse.json({ message: "User Registered!" });
}