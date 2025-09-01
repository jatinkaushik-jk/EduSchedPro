import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// const isStaffRoute = createRouteMatcher(["/staff(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url });

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Add them to project's database and update their status of onboardingComplete as true 
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    // function to add user to project's databse
    // Update user onboardingComplete status as true if success
    return NextResponse.next();
  }

  if (userId && !isPublicRoute(req)) {
    // // is Admin and has Access
    // if (
    //   isAdminRoute(req) &&
    //   (await auth()).sessionClaims?.metadata?.role !== "admin"
    // ) {
    //   const url = new URL("/", req.url);
    //   return NextResponse.redirect(url);
    // }
    // // is Staff and has Access
    // if (
    //   isStaffRoute(req) && (await auth()).sessionClaims?.metadata?.role !== "staff" && (await auth()).sessionClaims?.metadata?.role !== "admin"
    // ) {
    //   const url = new URL("/", req.url);
    //   return NextResponse.redirect(url);
    // }
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
