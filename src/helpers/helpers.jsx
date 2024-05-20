export function wait(t) {
  new Promise((resolve) => setTimeout(resolve, t));
}

export const article = {
  published: false,
  dateInTitle: true,
  articles: {},
  article_order: [],
  header: {
    date: new Date().toISOString().substring(0, 10),
    place: { latitude: "", longitude: "", place: "Toronto" },
    title: "",
    preview: { url: "", alt: "" },
    deco: false,
  },
};

export function chopOffEnds(text, begin, end) {
  return text.split(begin)[1].split(end)[0];
}

export function day(date) {
  const startDate = new Date("2022-10-19");
  const endDate = new Date(date);

  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return `Den ${diff}.`;
}