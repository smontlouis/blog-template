import { useTranslation } from 'react-i18next'
import { Heading } from './ui/heading'
import { Text } from './ui/text'
import { Link } from '@remix-run/react'
import { Stack } from 'styled-system/jsx'

interface PostProps {
  index: number
  title: string
  description: string
  date: string
  slug: string
}

export const Post = ({ index, title, description, date, slug }: PostProps) => {
  const { t, i18n } = useTranslation()

  return (
    <Link to={`/logs/${slug}`}>
      <Stack gap="0">
        <Text fontSize="sm"># {t('entryNumber', { number: index })}</Text>
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        <Text>{description}</Text>
        <Text>
          {new Date(date).toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Stack>
    </Link>
  )
}
