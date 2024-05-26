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
    obj: { article_type: "grid", rows: "1", divs: 0 },
  },
  {
    name: "YT",
    obj: { article_type: "yt", yt: { urlID: "", start: 0 } },
  },
  {
    name: "link",
    obj: { article_type: "link", link: { text: "", url: "" } },
  },
];

export function idStamp() {
  return new Date().valueOf();
}

export const divs = {
  url: "",
  alt: "",

  rowStart: 0,
  rowEnd: 0,
  columnStart: 0,
  columnEnd: 0,
};
