import { escapeHtml, escapeAttribute, htmlTemplate, type DirectiveHandler } from '@doidor/markbook-core';

const render = htmlTemplate(new URL('./about-list.html', import.meta.url));

/**
 * ::about-list{icon="fas fa-lightbulb" label="Interested in" items="Item one|Item two|Item three"}
 * A labeled bullet list - like about-item, but for several points instead of one line.
 */
export const aboutList: DirectiveHandler = ({ attributes }) => {
  const label = attributes.label ?? '';
  const items = (attributes.items ?? '')
    .split('|')
    .map(item => item.trim())
    .filter(Boolean);

  const itemsHtml = items.map(item => `  <li>${escapeHtml(item)}</li>`).join('\n');

  return {
    html: render({
      icon: escapeAttribute(attributes.icon ?? ''),
      label: escapeHtml(label),
      items: itemsHtml,
    }),
    markdown: `**${label}**\n\n${items.map(item => `- ${item}`).join('\n')}`,
  };
};
