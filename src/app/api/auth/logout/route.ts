import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = "/entrar?error=session_expired";

  cookies().delete("access_token");
  cookies().delete("refresh_token");

  return NextResponse.redirect(redirectUrl);
}
