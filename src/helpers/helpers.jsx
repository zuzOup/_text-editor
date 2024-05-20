export function wait(t) {
  new Promise((resolve) => setTimeout(resolve, t));
}

export const article = {
  published: false,
  dateInTitle: true,
  articles: {},
  article_order: [],
  header: {
    date: "",
    place: { latitude: "", longitude: "", place: "Toronto" },
    title: "",
    preview: { url: "", alt: "" },
    deco: false,
  },
};

export function chopOffEnds(text, begin, end) {
  return text.split(begin)[1].split(end)[0];
}
