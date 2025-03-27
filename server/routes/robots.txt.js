/* eslint-disable no-undef */

export default defineEventHandler(async (event) => {
  event.node.res.setHeader('content-type', 'text-plain')

  const config = useRuntimeConfig(event)
  // const data = await $fetch(config.public.API + '/core/sitemap-xml/')

  const result = `
  User-Agent: *
  Allow: /
  Allow: /about
  Allow: /contacts
  Allow: /projects
  Allow: /projects/*
  Allow: /categories
  Allow: /categories/*
  
  Allow: */*.jpg*
  Allow: */*.png
  Allow: */*.webp
  Allow: */*.gif
  Allow: */*.woff*
  Allow: */*.svg
  Allow: */*.pdf
  Allow: */*.doc*
  Allow: */*.xls*
  Allow: */*.ppt*
  Allow: */*.mp4
  Allow: */*.mkv
  Allow: */*.mpeg
  Allow: */*.pdf
  
  Disallow: http://agro.itlabs.top
  Disallow: http://avito-prez.itlabs.top
  Disallow: http://bkl.itlabs.top
  Disallow: http://bookremember.itlabs.top
  Disallow: http://credit-quiz.itlabs.top
  Disallow: http://demo.itlabs.top
  Disallow: http://detskii.itlabs.top
  Disallow: http://dls.itlabs.top
  Disallow: http://drawing.itlabs.top
  Disallow: http://gbeam.itlabs.top
  
  Sitemap: ${config.public.BASE_URL}/sitemap.xml
  Host: ${config.public.BASE_URL}
  `

  return result
})
