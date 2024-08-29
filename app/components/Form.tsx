import { Form as RemixForm, FormProps, useSearchParams } from '@remix-run/react'

export const Form = ({
  children,
  keepSearchParams,
  ...props
}: FormProps & { keepSearchParams?: boolean }) => {
  const [searchParams] = useSearchParams()
  return (
    <RemixForm {...props}>
      {keepSearchParams &&
        Array.from(searchParams.entries()).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      {children}
    </RemixForm>
  )
}
