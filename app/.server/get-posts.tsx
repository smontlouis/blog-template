import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import invariant from 'tiny-invariant'
import { Frontmatter, PostPreview } from '~/types'

interface GetPostsOptions {
  locale: string
  page: number
  limit: number
  path?: string[]
}

export async function getPosts({
  locale,
  path: additionalPath = [],
  page,
  limit,
}: GetPostsOptions) {
  invariant(locale === 'en' || locale === 'fr', `Unsupported locale: ${locale}`)

  const postsDirectory = path.join(
    process.cwd(),
    'app',
    'content',
    locale,
    ...additionalPath
  )

  try {
    const files = await readdir(postsDirectory)
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

    const postPreviews: PostPreview[] = (
      await Promise.all(
        mdxFiles.map(async (file) => {
          const filePath = path.join(postsDirectory, file)
          const source = await readFile(filePath, 'utf8')
          const { frontmatter } = await bundleMDX({ source })
          return {
            index: 0,
            slug: file.replace(/\.mdx$/, ''),
            frontmatter: frontmatter as Frontmatter,
          }
        })
      )
    )
      .toSorted((a, b) => {
        return (
          new Date(b.frontmatter.published).getTime() -
          new Date(a.frontmatter.published).getTime()
        )
      })
      .map((post, index) => ({ ...post, index }))
      .toSorted((a, b) => {
        return b.index - a.index
      })

    const startIndex = (page - 1) * limit
    const paginatedPosts = postPreviews.slice(startIndex, startIndex + limit)

    return {
      posts: paginatedPosts,
      totalPosts: postPreviews.length,
      currentPage: page,
      limit,
    }
  } catch (error) {
    console.error(`Failed to get posts for locale: ${locale}`, error)
    return null
  }
}
