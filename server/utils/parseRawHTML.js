import { JSDOM } from "jsdom";

export const parseRawHTML = (rawHTML) => {
  // Chuyển article_content từ blank text sang htmlDOM
  const dom = new JSDOM(rawHTML);
  const document = dom.window.document;

  // Từ htmlDOM, lấy ra các phần tử cần thiết
  const headings = Array.from(document.querySelectorAll("h2, h3, h4"));
  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const textContent = heading.textContent.trim().toLowerCase();
    const slug = textContent.replace(/\s/g, '-'); // Replace spaces with hyphens
    const id = `${level}-${index}-${slug}`;

    heading.setAttribute('id', id);
  });

  return document.body.innerHTML;
}