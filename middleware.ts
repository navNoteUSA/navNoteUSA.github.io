export default function middleware(req) {
  const allowedHosts = ['navnote.net', 'www.navnote.net'];
  const host = req.headers.get('host');
  
  if (!allowedHosts.includes(host)) {
    return new Response('Forbidden', { status: 403 });
  }
}

export const config = {
  matcher: '/:path*',
}; 