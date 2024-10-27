
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
    const protectedPaths = ['/' ,'/projects','/sign-up','/sign-in'];

    const authToken = request.cookies.get('authToken')?.value;
    
    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if ((request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up') && authToken) {
        return NextResponse.redirect(new URL('/', request.url));
    } 



    if (isProtectedPath && !authToken) {
        if (request.nextUrl.pathname !== '/sign-in' ) { 
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/', '/projects','/sign-up','/sign-in'], 
};

