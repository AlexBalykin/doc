// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  base: '/doc/', // Указываем имя репозитория с косой чертой
  site: 'https://alexbalykin.github.io/doc', // URL сайта на GitHub Pages
  integrations: [
    starlight({
      title: 'TapBank',
      sidebar: [
        {
          label: 'Документация',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'API',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],

  markdown: {
    rehypePlugins: [
      () => {
        return (tree) => {
          // Используем Astro.base для корректного пути
          const base = '/doc/'; // или импортировать из config, если нужно
          tree.children.unshift({
            type: 'element',
            tagName: 'script',
            properties: { src: `${base}q.js`, type: 'module' },
            children: [],
          });
        };
      },
    ],
  },
});