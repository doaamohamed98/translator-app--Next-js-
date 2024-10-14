
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export let UserIsLogin = false ; 
export function middleware(request: NextRequest) {
    const protectedPaths = ['/home', '/'];

    const authToken = request.cookies.get('authToken')?.value;
    
    if(authToken){
        UserIsLogin = true
    }
    console.log(authToken , UserIsLogin);

    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );



    if (isProtectedPath && !authToken) {
         return NextResponse.redirect(new URL('/sign-in', request.url));
    } 
    

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/'], 
};

