import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/login', '/signup'];
// const adminRoutes = ['/admin.*'];
// const facultyRoutes = ['/faculty.*'];

export default function middleware(request: NextRequest) {
  // Your middleware logic here
  const url = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(url);
  if (!isPublicRoute) {
    // Handle private route access
    console.log("Private route accessed:", url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
