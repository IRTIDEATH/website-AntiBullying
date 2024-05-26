import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


const onlyAdmin = ["admin"]
const authPage = ["auth"]

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname.split('/')[1]
        
        // jadi nanti listnya itu ada gk yang sama dengan pathname nya
        if(requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            })

            // kalau kita belum login
            if(!token && !authPage.includes(pathname)) {
                const url = new URL("/auth/login", req.url)

                // jadi ini maksudnya tuh misal, kau di halaman product lalu kau ingin login,
                // ketika dah login kau baliknya ke halaman yang tadi (halaman product)
                // kalau sign out nya dari halaman tadi lagi (halaman product) ya selesai sign out baliknya ke halaman tadi (halaman product)
                url.searchParams.set("callbackUrl", encodeURI(req.url))

                return NextResponse.redirect(url)
            }

            if(token) {
                // kalau udah login ya gk boleh akses authpage lagi
                if(authPage.includes(pathname)) {
                    return NextResponse.redirect(new URL('/', req.url))
                }

                // kalau bukan admin dan sedang berada di halaman onlyAdmin berarti di pindahkan ke halaman "/"
                if(token.role !== 'admin' && onlyAdmin.includes(pathname)) {
                    return NextResponse.redirect(new URL('/', req.url))
                }
            }
            
            
            return middleware(req, next)
        }
    }
}