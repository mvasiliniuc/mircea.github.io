import { escapeHtml, escapeAttribute, htmlTemplate, type DirectiveHandler } from '@doidor/markbook-core';

const render = htmlTemplate(new URL('./about-item.html', import.meta.url));

/**
 * ::about-item{icon="fas fa-briefcase" label="Recent role" text="First paragraph||Second paragraph" items="Point one|Point two"}
 * A single about item with an icon + label header, one or more paragraphs
 * (split on "||"), and an optional bullet list below them (pipe-separated,
 * like about-list's items).
 */
export const aboutItem: DirectiveHandler = ({ attributes }) => {
  const label = attributes.label ?? '';
  const text = attributes.text ?? '';
  const paragraphs = text
    .split('||')
    .map(p => p.trim())
    .filter(Boolean);
  const items = (attributes.items ?? '')
    .split('|')
    .map(item => item.trim())
    .filter(Boolean);

  const textHtml = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('\n');

  const itemsHtml = items.length
    ? `<ul>\n${items.map(item => `  <li>${escapeHtml(item)}</li>`).join('\n')}\n</ul>`
    : '';

  return {
    html: render({
      icon: escapeAttribute(attributes.icon ?? ''),
      label: escapeHtml(label),
      text: textHtml,
      items: itemsHtml,
    }),
    markdown: `**${label}**\n\n${paragraphs.join('\n\n')}${items.length ? `\n\n${items.map(item => `- ${item}`).join('\n')}` : ''}`,
  };
};
