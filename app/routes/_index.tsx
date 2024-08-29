import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Center, Stack } from 'styled-system/jsx'
import { getPost } from '~/.server/get-post'
import { getPosts } from '~/.server/get-posts'
import { Post } from '~/components/Post'
import { Heading } from '~/components/ui/heading'
import { Pagination } from '~/components/ui/pagination'
import i18nServer from '~/i18n.server'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.mainPost?.frontmatter.title },
    { name: 'description', content: data?.mainPost?.frontmatter.description },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const locale = await i18nServer.getLocale(request)

  const mainPost = await getPost({ locale, slug: 'home' })
  const postsData = await getPosts({ locale, page, limit: 3, path: ['blog'] })

  if (!mainPost) {
    throw new Response('Not Found', { status: 404 })
  }

  if (!postsData) {
    throw new Response('Posts not found', { status: 404 })
  }

  return json({
    mainPost,
    ...postsData,
  })
}

export default function Index() {
  const { mainPost, posts, currentPage, totalPosts, limit } =
    useLoaderData<typeof loader>()
  const Component = useMemo(
    () => getMDXComponent(mainPost?.code),
    [mainPost?.code]
  )
  const [, setSearchParams] = useSearchParams()

  return (
    <Stack gap="16">
      <Stack gap="4">
        <Heading as="h1" size="3xl">
          {mainPost?.frontmatter.title}
        </Heading>

        <Component />
      </Stack>
      <Stack gap="5">
        {posts.map((post) => (
          <Post
            key={post.slug}
            index={post.index}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            date={post.frontmatter.published}
            slug={post.slug}
          />
        ))}
        <Center>
          <Pagination
            page={currentPage}
            pageSize={limit}
            count={totalPosts}
            onPageChange={(details) =>
              setSearchParams((s) => {
                s.set('page', details.page.toString())
                return s
              })
            }
          />
        </Center>
      </Stack>
    </Stack>
  )
}
