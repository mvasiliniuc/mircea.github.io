import { defineConfig } from '@doidor/markbook-core';
import { links } from './directives/links.js';
import { aboutItem } from './directives/about-item.js';
import { aboutList } from './directives/about-list.js';
import { section } from './directives/section.js';
import { aboutSection } from './directives/about-section.js';

export default defineConfig({
  title: 'Your Name',
  description: 'A one-line description of who you are and what you do.',
  contentDir: 'pages',
  outDir: 'dist',
  publicDir: 'public',
  layoutsDir: 'layouts',
  layout: 'default',
  css: ['./public/assets/css/main.css'],
  disableBaseCss: true,
  themeColor: '#0d9488',
  llmsButtons: false,
  search: false,
  directives: {
    'about-item': { type: 'leaf', handler: aboutItem },
    'about-list': { type: 'leaf', handler: aboutList },
    section: { type: 'container', handler: section },
    'about-section': { type: 'leaf', handler: aboutSection },
    links: { type: 'leaf', handler: links },
  },
});
