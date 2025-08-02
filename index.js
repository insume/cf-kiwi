export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');
    const queryParams = url.searchParams;

    // Define user data with usernames and UUIDs
    const userData = {
        "curio90813": "3282bb55-3649-4e57-bab8-368213dcb20d",
        "ttpsct81450": "29db8ca5-2234-4030-90b5-c443f68c7e06",
        "snflwr87983": "4f2354d2-6b4a-462c-94af-7e91380b137a",
        "hamoon75438": "0532531c-6115-4f3a-9e57-f2932caf3387",
        "shahnaz38901": "10925388-d262-43b8-bb45-482abbcb4a44",
        "selenium19872": "04d90bae-a4e1-4e73-9fb9-b5482f3f0a4a",
        "pourmoeini0793": "f7799534-7f8e-4073-9b7d-b36604b01ddd",
        "kalantar98172": "01bc6717-32a8-4bf7-8618-738c1bbbbedb",
        "dolphin1239": "63c6b203-926e-481d-9f77-f7912fbe335b",
        "goldy09183": "c11c7c12-1ed9-434c-ba8f-166bacde5def",
    };

    // Generate userKeys programmatically
    const userKeys = {};
    for (const [userName, uuid] of Object.entries(userData)) {
      userKeys[userName] = `vless://${uuid}@SERVER_IP_PORT/?type=tcp&security=reality&pbk=gssdPZcy1WmoSMmH62oUHoIKAcBpSVdZnHzZvfWZq1c&fp=chrome&sni=opensuse.org&sid=8adcc665&spx=%2F#Kiwi:${userName}`;
    }

    if (userKeys[path]) {
      const originalSsUrl = userKeys[path];

      // Check if IP_CONFIG_MAP is properly configured
      let ipConfigMap = {};
      try {
        ipConfigMap = JSON.parse(env.IP_CONFIG_MAP || '{}');
      } catch (e) {
        console.error('Failed to parse IP_CONFIG_MAP:', e);
        return new Response('Internal Server Error: Server configuration invalid.', { status: 500 });
      }

      // Get server list from IP_CONFIG_MAP keys
      const serverList = Object.keys(ipConfigMap);
      
      if (serverList.length === 0) {
        console.error('No servers found in IP_CONFIG_MAP.');
        return new Response('Internal Server Error: No servers configured.', { status: 500 });
      }

      // Generate a configuration for each server IP with IP-specific config names
      const configs = serverList.map(server => {
        if (!originalSsUrl.includes('SERVER_IP_PORT')) {
          console.error(`Placeholder SERVER_IP_PORT not found in ss URI for path: ${path}, URI: ${originalSsUrl}`);
          return null;
        }
        
        // Get the config name for this IP, or use a default
        const configName = ipConfigMap[server] || `Kiwi-${server}`;
        
        // Replace SERVER_IP_PORT and update the config name in the fragment
        let config = originalSsUrl.replace('SERVER_IP_PORT', server);
        
        // Update the fragment identifier with IP-specific config name and username
        const fragmentIndex = config.lastIndexOf('#');
        if (fragmentIndex !== -1) {
          const baseConfig = config.substring(0, fragmentIndex + 1);
          config = `${baseConfig}${encodeURIComponent(`${configName}:${path}`)}`;
        }
        
        return config;
      }).filter(config => config !== null);

      // Join all configurations with new lines
      const allConfigs = configs.join('\n');
      return new Response(allConfigs, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
}