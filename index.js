export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');

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
      const keyWithIp = userKeys[path].replace('SERVER_IP_PORT', env.SERVER_IP_PORT);
      return new Response(keyWithIp, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
}