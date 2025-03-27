/* eslint-disable no-undef */
export default defineEventHandler(async (event) => {
  event.node.res.setHeader('content-type', 'text/xml')

  // const config = useRuntimeConfig(event)
  // const data = await $fetch(config.public.API + '/core/sitemap-xml/')

  const result = `
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://itlabs.top/</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/about</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/contacts</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/interaktivnoe-programmnoe-obespechenie</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/internet-magazin</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/razrabotka-saytov</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/razrabotka-portalov</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/arvr</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/interaktivnye-igry</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/categories/resheniya-dlya-interaktivnyh-paneley-stolov-pesochnic</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects/muzey-fsb</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects/marketpleys-avto-fresh</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects/sochi-park</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects/internet-magazin-gazmagaz</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
<url>
<loc>https://itlabs.top/projects/vinodelnya-zolotaya-balka</loc>
<priority>0.5</priority>
<changefreq>daily</changefreq>
<lastmod>2024-07-18</lastmod>
</url>
</urlset>

  `

  return result
})
