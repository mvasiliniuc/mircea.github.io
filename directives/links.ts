import { escapeAttribute, htmlTemplate, type DirectiveHandler } from '@doidor/markbook-core';

const render = htmlTemplate(new URL('./links.html', import.meta.url));

// Used only if the directive is written as bare `::links` with no items.
const DEFAULT_LINKS = [
  { label: 'LinkedIn', icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/your-handle/' },
  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/your-handle' },
  { label: 'HuggingFace', icon: 'fas fa-robot', href: 'https://huggingface.co/your-handle' },
  { label: 'Resume', icon: 'fas fa-file-lines', href: 'https://example.com/resume.pdf' },
  { label: 'Email', icon: 'fas fa-envelope', href: 'mailto:you@example.com' },
];

/**
 * ::links{items="LinkedIn^fab fa-linkedin^https://...|GitHub^fab fa-github^https://..."}
 * Renders the full links nav section. Each item is "label^icon^href"; items are
 * separated by "|". Falls back to DEFAULT_LINKS if no items attribute is given.
 */
export const links: DirectiveHandler = ({ attributes }) => {
  const raw = (attributes.items ?? '').trim();
  const LINKS = raw
    ? raw
        .split('|')
        .map(entry => entry.trim())
        .filter(Boolean)
        .map(entry => {
          const [label, icon, href] = entry.split('^').map(part => part.trim());
          return { label, icon, href };
        })
    : DEFAULT_LINKS;

  const items = LINKS.map(({ href, icon, label }) => {
    const ah = escapeAttribute(href);
    const ai = escapeAttribute(icon);
    const at = escapeAttribute(label);
    const target = href.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `    <li><a href="${ah}" title="${at}"${target}><span class="link-main"><i class="${ai}"></i> <span class="label">${label}</span></span><i class="fas fa-chevron-right link-chevron"></i></a></li>`;
  }).join('\n');

  const mdItems = LINKS.map(({ href, label }) => `- [${label}](${href})`).join('\n');

  return {
    html: render({ items }),
    markdown: `## Links\n\n${mdItems}`,
  };
};
