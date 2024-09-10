import { NextResponse } from 'next/server';

export async function middleware(req) {

    const url = req.nextUrl;
    const { pathname } = url;

    // Simulando una verificación de autenticación
    const isAuthenticated = req.cookies.get('access_token')?.value;

    if (!isAuthenticated && pathname === '/test') {
        // Si el usuario no está autenticado, redirigirlo a la página de login
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if (isAuthenticated && pathname === '/') {
        // Si el usuario está autenticado y trata de acceder a la página principal, redirigir a /Dashboard
        return NextResponse.redirect(new URL('/test', req.nextUrl));
    }


    // Si el usuario está autenticado o la ruta no requiere autenticación
    return NextResponse.next();
}

// Configuración del matcher para aplicar el middleware solo a ciertas rutas
export const config = {
    matcher: ['/test', '/'],
};
