import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'
import favicon from '../images/favicon.png'

const faviconPngSizes = [192, 512]

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: 'png'
      })
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`
      }
    })
  )

  const manifest = {
    name: 'Lachlan Hawthorne',
    description: 'Australian digital designer and full stack developer',
    start_url: '/',
    display: 'standalone',
    id: 'some-unique-id',
    icons
  }

  return new Response(JSON.stringify(manifest))
}