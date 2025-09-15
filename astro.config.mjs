// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	base: '/tapbank-docs/',
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
          // Добавляем скрипт в начало каждой страницы
          tree.children.unshift({
            type: 'element',
            tagName: 'script',
            properties: { src: '/q.js', type: 'module' },
            children: [],
          });
        };
      },
    ],
  },
});