import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const tokenSchema = yup.object().shape({
  exp: yup.number().required(),
  iat: yup.number().required(),
  jti: yup.string().required(),
  permissions: yup
    .array()
    .of(
      yup.object({
        action: yup.string().required(),
        scope: yup.string().required(),
      }),
    )
    .required(),
  profile_id: yup.string().required(),
  role: yup.string().required(),
  token_type: yup.string().required(),
  user_id: yup.number().required(),
});

async function checkUser(token: string | undefined) {
  if (!token) return false;
  try {
    const decodedData = decodeJwt(token);
    await tokenSchema.validate(decodedData);
    return true;
  } catch (error) {
    return false;
  }
}
const authPages = ["/entrar", "/registrar", "/esqueceu-senha", "/dois-fatores"];
const publicPages = ["/", "/lojas", "/ofertas"];

export async function middleware(request: NextRequest) {
  const tokenJwt = cookies().get("access_token")?.value;
  const refreshTokenJwt = cookies().get("refresh_token")?.value;
  const user = await checkUser(tokenJwt);
  const pathName = request.nextUrl.pathname;
  const isValidPath =
    pathName !== "/" ? `?redirect_to=${encodeURIComponent(pathName)}` : "";

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.origin);
  const isAuthPage = authPages.includes(pathName);
  const isPublicPage = publicPages.includes(pathName);

  if (tokenJwt && refreshTokenJwt && user) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (!tokenJwt || !refreshTokenJwt || !user) {
    if (isPublicPage) {
      return NextResponse.next();
    }
    if (!isAuthPage) {
      const redirectUrl = isValidPath;
      return NextResponse.redirect(
        new URL(`/entrar${redirectUrl}`, request.url),
      );
    }
  }

  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: [
    // /*
    //  * Match all request paths except for the ones starting with:
    //  * - api (API routes)
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //  */
    "/((?!api|_next/static|_next/image|images/|favicon.ico).*)",
  ],
};
