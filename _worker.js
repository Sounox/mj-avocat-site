const FILE_EXT_RE = /\.[a-z0-9]+$/i;

function buildCandidates(pathname) {
  if (pathname === '/') return ['/index.html'];
  if (FILE_EXT_RE.test(pathname)) return [pathname];

  const clean = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return [`${clean}.html`, `${clean}/index.html`];
}

async function fetchAsset(env, request, pathname) {
  const targetUrl = new URL(request.url);
  targetUrl.pathname = pathname;
  return env.ASSETS.fetch(new Request(targetUrl, request));
}

function withStatus(response, status) {
  return new Response(response.body, {
    status,
    statusText: response.statusText,
    headers: response.headers
  });
}

export default {
  async fetch(request, env) {
    if (!env?.ASSETS) {
      return new Response('Static assets binding unavailable.', { status: 500 });
    }

    if (!['GET', 'HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request);
    }

    const url = new URL(request.url);

    for (const candidate of buildCandidates(url.pathname)) {
      const response = await fetchAsset(env, request, candidate);
      if (response.status !== 404) {
        return response;
      }
    }

    const notFound = await fetchAsset(env, request, '/404.html');
    if (notFound.ok) {
      return withStatus(notFound, 404);
    }

    return new Response('404 - Page introuvable', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=UTF-8' }
    });
  }
};
