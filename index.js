export default {
	async fetch(request, env) {
	  const url = new URL(request.url);
	  const path = url.pathname + url.search;
	  const targetURL = "https://vps.kodub.com" + path;
  
	  // Handle preflight OPTIONS requests
	  if (request.method === "OPTIONS") {
		return new Response(null, {
		  headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "*",
		  },
		});
	  }
  
	  try {
		const response = await fetch(targetURL, {
		  method: request.method,
		  headers: request.headers,
		  body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
		});
  
		const newHeaders = new Headers(response.headers);
		newHeaders.set("Access-Control-Allow-Origin", "*");
		newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		newHeaders.set("Access-Control-Allow-Headers", "*");
  
		return new Response(await response.arrayBuffer(), {
		  status: response.status,
		  headers: newHeaders,
		});
	  } catch (err) {
		return new Response("Error fetching " + targetURL + ": " + err.message, { status: 500 });
	  }
	},
  };
  
