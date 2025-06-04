export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');
    const queryParams = url.searchParams;

    const userKeys = {
      "hansocouple2masters": "ss://YWVzLTI1Ni1nY206YWpOTnpGSEhXWldwTjd6SEFLdGJycUJFenYvYTZ1L2RsWVROMWhzQWRuWT0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki---MASTER--",
      "snflwr87983": "ss://YWVzLTI1Ni1nY206YkdpOHcxV25ZYXJFcVRsR2tKeHlOdFFRVlBwWGt2VXRHLzlnY01uRVlWTT0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-snflwr87983",
      "hamoon75438": "ss://YWVzLTI1Ni1nY206b2hPSWJBczg4ZUdVcnBWUFMvZUtJQ1RrczhxbWFMUk5pN2F5Q1pnZ1Y0bz0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-hamoon75438",
      "shahnaz38901": "ss://YWVzLTI1Ni1nY206UjJ2RmkyNERiSmVubGRJTjFnMVpOVUg4byt2MnZGMkpZbFpFcTBHV25RND0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-shahnaz38901",
      "selenium19872": "ss://YWVzLTI1Ni1nY206SGpuS0JuQm8wWS9UczkzR0Y0UWFrRWtMRmpzeXRsSm9nV2h5eGRoZTdtND0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-selenium19872",
      "pourmoeini0793": "ss://YWVzLTI1Ni1nY206MVZQZTBVTm5JbmxVY0FuWkVnV2lvQVFXK2N6NXFVT08wR21VNnNjc1F3ST0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-pourmoeini07931",
      "kalantar98172": "ss://YWVzLTI1Ni1nY206SThITXhCd1c5VXFCeDZSZ0prcUViU2FpT1BTRDBtK1hud0w5K2hiN2toTT0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-kalantar98172",
      "dolphin1239": "ss://YWVzLTI1Ni1nY206bm0vaDZmWEQ5eDhsRXBPbVNRNFFKcks1elVMTXBpaW4vbDlvZ3RsdXhiRT0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-dolphin12397",
      "goldy09183": "ss://YWVzLTI1Ni1nY206OU5IZFREMnYya1VLZWUvL0ZEaTJmcHpyRk5DUWxkb1FlRUF0UlViN2pvVT0@SERVER_IP_PORT?type=tcp#🇫🇮Helsinki-goldy09183",
    };

    if (userKeys[path]) {
      const originalSsUrl = userKeys[path];

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

      if (queryParams.has('outline')) {
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
        const placeholder = '@SERVER_IP_PORT';
        const placeholderIndex = originalSsUrl.indexOf(placeholder);
        
        if (placeholderIndex === -1) {
            console.error(`Placeholder @SERVER_IP_PORT not found in ss URI for path: ${path}, URI: ${originalSsUrl}`);
            return new Response('Internal Server Error: Configuration error in ss URI.', { status: 500 });
        }
        const suffix = originalSsUrl.substring(placeholderIndex + placeholder.length);
        const newSsUrl = `ss://${method}:${password}@${env.SERVER_IP_PORT}${suffix}`;

        return new Response(newSsUrl, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
}