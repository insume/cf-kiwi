export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');
    const queryParams = url.searchParams;

    const userKeys = {
        "curio90813": "trojan://SoGES4N108@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-curio90813",
        "ttpsct81450": "trojan://XA9JovFf4o@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-ttpsct81450",
        "snflwr87983": "trojan://nscWDagNjT@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-snflwr87983",
        "hamoon75438": "trojan://lNW32YMokH@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-hamoon75438",
        "shahnaz38901": "trojan://ITsBfih6Fo@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-shahnaz38901",
        "selenium19872": "trojan://bWNbfBuY6X@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-selenium19872",
        "pourmoeini0793": "trojan://wEn5Dg6zSj@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-pourmoeini0793",
        "kalantar98172": "trojan://bJrl9jrM2n@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-kalantar98172",
        "dolphin1239": "trojan://7B4XWzmKSL@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-dolphin1239",
        "goldy09183": "trojan://druJexq2kO@SERVER_IP_PORT?type=tcp&security=tls&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&allowInsecure=1&sni=cloudflare.com#SNI-goldy09183",
    };

    if (userKeys[path]) {
      const originalSsUrl = userKeys[path];

      if (queryParams.has('outline')) {

        return new Response('Outline is currently not supported. Use V2ray.', { status: 400 });

        // Decode credentials and prepare JSON response only if 'outline' query is present
        const schemeEnd = originalSsUrl.indexOf('://') + 3;
        const atSign = originalSsUrl.indexOf('@');

        if (schemeEnd === 2 || atSign === -1 || atSign <= schemeEnd) { // schemeEnd === 2 means indexOf('://') was -1
          console.error(`Malformed ss URI in config for path: ${path}, URI: ${originalSsUrl}`);
          return new Response('Internal Server Error: Malformed ss URI in configuration.', { status: 500 });
        }
        const encodedCredentialsWithMethod = originalSsUrl.substring(schemeEnd, atSign);

        let decodedCredentials;
        try {
          decodedCredentials = atob(encodedCredentialsWithMethod); // This will be "method:password"
        } catch (e) {
          console.error(`Failed to decode credentials for path: ${path}, encoded: ${encodedCredentialsWithMethod}, error: ${e.message}`);
          return new Response('Internal Server Error: Failed to decode credentials.', { status: 500 });
        }

        const parts = decodedCredentials.split(':', 2); // Split into method and password
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
          console.error(`Invalid decoded credentials format for path: ${path}, decoded: ${decodedCredentials}`);
          return new Response('Internal Server Error: Invalid decoded credentials format.', { status: 500 });
        }
        const method = parts[0];
        const password = parts[1];
        
        if (!env.SERVER_IP_PORT || typeof env.SERVER_IP_PORT !== 'string') {
          console.error('SERVER_IP_PORT environment variable is not set or not a string.');
          return new Response('Internal Server Error: Server configuration missing.', { status: 500 });
        }

        const serverIpPortParts = env.SERVER_IP_PORT.split(':');
        if (serverIpPortParts.length !== 2) {
          console.error(`Invalid SERVER_IP_PORT format: ${env.SERVER_IP_PORT}`);
          return new Response('Internal Server Error: Invalid server connection details format.', { status: 500 });
        }
        const serverIp = serverIpPortParts[0];
        const serverPortStr = serverIpPortParts[1];
        const serverPort = parseInt(serverPortStr, 10);

        if (!serverIp || isNaN(serverPort)) {
          console.error(`Invalid SERVER_IP_PORT components: IP=${serverIp}, PortStr=${serverPortStr}`);
          return new Response('Internal Server Error: Invalid server connection details.', { status: 500 });
        }

        const outlineResponse = {
          server: serverIp,
          server_port: serverPort,
          password: password,
          method: method,
        };
        return new Response(JSON.stringify(outlineResponse), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });

      } else {
        // No 'outline' query: resolve SERVER_IP_PORT and return original string (no decoding)
        if (!env.SERVER_IP_PORT || typeof env.SERVER_IP_PORT !== 'string') {
          console.error('SERVER_IP_PORT environment variable is not set or not a string.');
          return new Response('Internal Server Error: Server configuration missing.', { status: 500 });
        }
        if (!originalSsUrl.includes('SERVER_IP_PORT')) {
            console.error(`Placeholder SERVER_IP_PORT not found in ss URI for path: ${path}, URI: ${originalSsUrl}`);
            return new Response('Internal Server Error: Configuration error in ss URI (placeholder missing).', { status: 500 });
        }
        const keyWithIp = originalSsUrl.replace('SERVER_IP_PORT', env.SERVER_IP_PORT);
        return new Response(keyWithIp, { status: 200, headers: { 'Content-Type': 'text/plain' } });
      }
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
}