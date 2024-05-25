export const buttons = [
  {
    name: "text",
    obj: { article_type: "text", text: "" },
  },
  {
    name: "txt+i",
    obj: { article_type: "textImg", text: "", img: { alt: "", float: "right", url: "" } },
  },
  {
    name: "img",
    obj: { article_type: "img", img: { alt: "", url: "" } },
  },
  {
    name: "grid",
    obj: { article_type: "grid", rows: "", divs: {} },
  },
  {
    name: "YT",
    obj: { article_type: "yt", yt: { urlID: "", url: "" } },
  },
  {
    name: "link",
    obj: { article_type: "link", link: { text: "", url: "" } },
  },
];

export function idStamp() {
  return new Date().valueOf();
}
