import { htmlTemplate, type DirectiveHandler } from '@doidor/markbook-core';

const render = htmlTemplate(new URL('./about-section.html', import.meta.url));

/**
 * ::about-section{text="..."}
 * Leaf directive — renders the about section with intro paragraph and divider.
 */
export const aboutSection: DirectiveHandler = ({ attributes }) => {
  const text = attributes.text ?? '';
  return {
    html: render({ text }),
    markdown: text,
  };
};
