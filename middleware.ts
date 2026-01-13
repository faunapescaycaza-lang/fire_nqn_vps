import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Solo protegemos la ruta /new
  if (request.nextUrl.pathname.startsWith('/new')) {
    const adminSession = request.cookies.get('admin_session')
    
    if (!adminSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
