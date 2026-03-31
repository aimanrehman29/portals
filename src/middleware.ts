import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user_session'); 
  const { pathname } = request.nextUrl;

  // 1. If not logged in and trying to access ANY portal
  if (!userCookie && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (userCookie) {
    const user = JSON.parse(userCookie.value);

    // 2. Prevent Students from opening Teacher Portal
    if (user.role === 'student' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. Prevent Teachers from opening Student Dashboard (Optional)
    if (user.role === 'teacher' && pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // Only protect these routes
};