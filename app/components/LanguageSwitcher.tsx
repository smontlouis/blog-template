import { Menu } from '~/components/ui/menu'
import { useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'
import { Button } from './ui/button'
import { Center, HStack } from 'styled-system/jsx'
import { GlobeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const languages = {
  fr: 'Français',
  en: 'English',
}

export const LanguageSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lng = searchParams.get('lng')
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lng) {
      setSearchParams(
        (s) => {
          s.delete('lng')
          return s
        },
        {
          replace: true,
        }
      )
    }
  }, [lng])

  return (
    <Center mt="5">
      <Menu.Root
        onSelect={(details) =>
          setSearchParams((s) => {
            s.set('lng', details.value)
            return s
          })
        }
      >
        <Menu.Trigger asChild>
          <Button variant="ghost">
            <GlobeIcon />
            {languages[i18n.language as keyof typeof languages]}
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="fr">
              <HStack gap="2">Français</HStack>
            </Menu.Item>
            <Menu.Item value="en">
              <HStack gap="2">English</HStack>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Center>
  )
}
