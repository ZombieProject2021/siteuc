/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Отключаем строгий режим React для предотвращения двойного рендеринга
  reactStrictMode: false,
  // Отключаем атрибуты отладки в development режиме
  compiler: {
    removeConsole: false,
  },
  // Отключаем source maps для уменьшения различий между сервером и клиентом
  productionBrowserSourceMaps: false,
  // Оптимизируем гидратацию
  experimental: {
    optimizeCss: false,
    // Отключаем prefetch для уменьшения гидратационных конфликтов
    appDir: true,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
