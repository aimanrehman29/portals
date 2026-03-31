import { NextResponse } from "next/server";

let users: { email: string; password: string }[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  const user = users.find(
    (u) => u.email === body.email && u.password === body.password
  );

  if (user) {
    return NextResponse.json({ message: "Login Success" });
  } else {
    return NextResponse.json({ message: "Invalid Credentials" });
  }
}