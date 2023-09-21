import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_cookie')
    console.log(token, "la cookie")
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    const res = await fetch(`${process.env.API_URL}/api/auth/check`, {
      headers: {
        token: token.value
      }
    })

    const data = await res.json()
    console.log(data, "la data")

    // @ts-ignore
    if (!data.isAuthorized) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ["/", "/pagos", "/promotores", "/usuarios", "/comisiones", "/configuracion" ],
};