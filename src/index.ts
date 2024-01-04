export default {
	async fetch(request: Request, env: any) {
		const url = new URL(request.url);
		if (url.protocol !== 'https:') {
			return Response.redirect('https://' + url.hostname + url.pathname + url.search, 301);
		}

		if (url.pathname === '/domain') {
			if (request.method === 'POST') {
				const data = await request.json();
				await env.data.put('domain', JSON.stringify(data));
				return new Response('Data saved successfully.', { status: 200 });
			} else if (request.method === 'GET') {
				const storedData = await env.data.get('domain');
				if (storedData) {
					return new Response(storedData, {
						status: 200,
						headers: { 'Content-Type': 'application/json' },
					});
				} else {
					return new Response('No data found.', { status: 404 });
				}
			} else {
				return new Response('Invalid method.', { status: 405 });
			}
		} else {
			return new Response('Not found.', { status: 404 });
		}
	},
};
