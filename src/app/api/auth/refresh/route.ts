import { API_RESOURCE_AUTH, API_URL_BASE } from "@/constants/services";
import { decodeToken } from "@/utils/functions/@shared/decodeTokenJwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { access_token, refresh_token } = await request.json();
  if (!access_token || !refresh_token)
    return NextResponse.json({ result: false });

  const refresh_token_exp = decodeToken(refresh_token).exp!;
  const access_token_exp = decodeToken(access_token).exp!;
  const timestamp_now = Number((Date.now() / 1000).toFixed(0));

  if (refresh_token_exp < timestamp_now) {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return NextResponse.json({ result: false });
  }

  if (access_token_exp > timestamp_now) {
    return NextResponse.json({ access_token, refresh_token, result: true });
  }
  try {
    const response = await fetch(
      `${API_URL_BASE}${API_RESOURCE_AUTH}/refresh`,
      {
        body: JSON.stringify({
          refresh_token: refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );
    if (!response.ok) {
      throw new Error("Erro ao atualizar tokens");
    }
    const data = await response.json();
    const userData = decodeToken(data.access_token);

    cookies().set({
      httpOnly: true,
      name: "access_token",
      sameSite: "strict",
      secure: true,
      value: data.access_token,
    });
    cookies().set({
      httpOnly: true,
      name: "refresh_token",
      sameSite: "strict",
      secure: true,
      value: data.refresh_token,
    });
    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      result: true,
      userData,
    });
  } catch (error) {
    return NextResponse.json({ access_token, refresh_token, result: true });
  }
}
