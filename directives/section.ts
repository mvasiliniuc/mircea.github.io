import { escapeAttribute, htmlTemplate, type DirectiveHandler } from '@doidor/markbook-core';

const render = htmlTemplate(new URL('./section.html', import.meta.url));

/**
 * :::section{icon="fas fa-briefcase" label="Currently" class="about-grid"}
 * Container directive — wraps inner content (including nested directives)
 * in a section with an optional labeled header and optional grid wrapper.
 * Omit `label` for an unlabeled group (e.g. a plain about-grid).
 */
export const section: DirectiveHandler = ({ attributes, innerHtml, innerMarkdown }) => {
  const label = attributes.label ?? '';
  const id = label.toLowerCase();
  const className = attributes.class ?? '';
  const gridOpen = className ? `<div class="${escapeAttribute(className)}">` : '';
  const gridClose = className ? '</div>' : '';
  const header = label
    ? `<div class="section-label"><i class="${escapeAttribute(attributes.icon ?? '')}"></i> ${label}</div>`
    : '';

  return {
    html: render({
      id,
      header,
      gridOpen,
      gridClose,
      innerHtml: innerHtml ?? '',
    }),
    markdown: label ? `## ${label}\n\n${innerMarkdown ?? ''}` : (innerMarkdown ?? ''),
  };
};
