import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  event.node.res.setHeader('Permissions-Policy', 'geolocation=(self)')
})
