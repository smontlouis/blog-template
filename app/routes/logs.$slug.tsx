import { json, LoaderFunction } from '@remix-run/node'
import { MetaFunction, useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { getPost } from '~/.server/get-post'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import i18nServer from '~/i18n.server'
import { Frontmatter } from '~/types'

type LoaderData = {
  frontmatter: Frontmatter
  code: string
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.frontmatter.title },
    { name: 'description', content: data.frontmatter.description },
  ]
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug

  if (!slug) {
    throw new Response('Not Found', { status: 404 })
  }

  const locale = await i18nServer.getLocale(request)

  const post = await getPost({ locale, slug, path: ['blog'] })
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return json<LoaderData>({ frontmatter: post.frontmatter, code: post.code })
}

export default function Post() {
  const { code } = useLoaderData<LoaderData>()
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <article>
      <Component
        components={{
          h1: ({ ref, ...props }) => <Heading as="h1" size="3xl" {...props} />,
          h2: ({ ref, ...props }) => <Heading as="h2" size="2xl" {...props} />,
          p: ({ ref, ...props }) => <Text my="5" {...props} />,
        }}
      />
    </article>
  )
}
