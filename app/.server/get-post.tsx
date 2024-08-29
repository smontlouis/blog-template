import { readFile } from 'fs/promises'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import invariant from 'tiny-invariant'
import { Frontmatter } from '~/types'

interface GetPostOptions {
  locale: string
  slug: string
  path?: string[]
}

export async function getPost({
  locale,
  path: additionalPath = [],
  slug,
}: GetPostOptions) {
  invariant(locale === 'en' || locale === 'fr', `Unsupported locale: ${locale}`)

  const filePath = path.join(
    process.cwd(),
    'app',
    'content',
    locale,
    ...additionalPath,
    `${slug}.mdx`
  )

  let source: string
  try {
    source = await readFile(filePath, 'utf8')
  } catch (error) {
    console.error(`Failed to read file: ${filePath}`, error)
    return null
  }

  try {
    const { code, frontmatter } = await bundleMDX({
      source,
      cwd: path.dirname(filePath),
    })

    return {
      code,
      frontmatter: frontmatter as Frontmatter,
    }
  } catch (error) {
    console.error(`Failed to bundle MDX for file: ${filePath}`, error)
    return null
  }
}
