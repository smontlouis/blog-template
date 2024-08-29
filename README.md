# Remix MDX Blog with i18n

This project is a blog built with Remix, using MDX for content and supporting i18n.

## DEMO

[https://blog-patient-pond-7135.fly.dev/](https://blog-patient-pond-7135.fly.dev/)

## Project Structure

- The blog is based on Remix framework
- Content is written in MDX format
- PandaCSS is used for styling
- ParkUI is used for the UI components
- Internationalization (i18n) is implemented for multiple language support
- All content is located in the `content/{lang}` directory
- Blog posts are specifically stored in `content/{lang}/blog`

## Run

Spin up the Vite dev server:

```shellscript
npm run dev
```

Or build your app for production and run it:

```shellscript
npm run build
npm run start
```

## Adding Content

### Add new blog posts

1. Create a new MDX file in the appropriate language folder under `app/content/{lang}/blog`
2. Write your content using MDX syntax
3. The new content will be automatically picked up by the blog system

### Add new pages

1. Create a new MDX file in the appropriate language folder under `app/content/{lang}`
2. Write your content using MDX syntax
3. Create a new route in `app/routes`
4. Import the MDX file in the route loader by using the `getPost` function
5. ???
6. Profit

## Internationalization

To add support for a new language:

1. Create a new folder under `content/` with the language code (e.g., `content/fr` for French)
2. Add translated content files to this new folder
3. Update your i18n configuration to include the new language

For more information on deploying Remix apps, refer to the [Remix deployment documentation](https://remix.run/docs/en/v1/guides/deployment).

Inspired by [Remix-vite-i18next](https://github.com/sergiodxa/remix-vite-i18next) and [Remix blog mdx](https://github.com/pcattori/remix-blog-mdx)
