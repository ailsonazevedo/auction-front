import { IOkResponse } from "@/@types/auth/ILogin";
import { API_RESOURCE_AUTH, API_URL_BASE } from "@/constants/services";
import * as jose from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const handleAuthResponse = (
  access_token: string,
  refresh_token: string,
  request: NextRequest,
) => {
  cookies().delete("refresh_token");

  const decodedData = jose.decodeJwt(access_token);

  cookies().set({
    httpOnly: true,
    name: "access_token",
    sameSite: "strict",
    secure: true,
    value: access_token,
  });
  cookies().set({
    httpOnly: true,
    name: "refresh_token",
    sameSite: "strict",
    secure: true,
    value: refresh_token,
  });

  return NextResponse.json({ decodedData }, { status: 200 });
};

const validateEnvironment = () => {
  if (!API_RESOURCE_AUTH) {
    return NextResponse.json({ Error: "url not defined" }, { status: 500 });
  }
  return null;
};

export async function POST(request: NextRequest) {
  const envError = validateEnvironment();
  if (envError) return envError;

  try {
    const body = await request.json();
    const { email, password } = body;
    const responseUser = await fetchUser(email, password);

    if (!responseUser.ok) {
      const { message, statusCode } = await responseUser.json();
      return NextResponse.json({ message, statusCode }, { status: statusCode });
    }

    const { access_token, refresh_token } =
      (await responseUser.json()) as IOkResponse;

    return handleAuthResponse(access_token, refresh_token, request);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor", statusCode: 500 },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const envError = validateEnvironment();
  if (envError) return envError;

  const { searchParams } = new URL(request.url);
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");

  if (!access_token || !refresh_token) {
    return NextResponse.json(
      { message: "Parâmetros obrigatórios faltando", statusCode: 400 },
      { status: 400 },
    );
  }

  handleAuthResponse(access_token, refresh_token, request);

  return NextResponse.redirect(new URL("/entrar", request.url));
}

const fetchUser = async (email: string, password: string) => {
  const loginUrl = `${API_URL_BASE}${API_RESOURCE_AUTH}/login`;
  return await fetch(loginUrl, {
    body: JSON.stringify({ password: password, username: email }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
};
