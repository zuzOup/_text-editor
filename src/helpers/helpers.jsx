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
    place: { latitude: 43.7001, longitude: -79.4163, place: "Toronto" },
    title: "",
    preview: { url: "", alt: "" },
    deco: false,
  },
};

export function newA() {
  const art = {
    published: false,
    dateInTitle: true,
    articles: {},
    article_order: [],
    header: {
      date: new Date().toISOString().substring(0, 10),
      place: { latitude: 43.7001, longitude: -79.4163, place: "Toronto" },
      title: "",
      preview: { url: "", alt: "" },
      deco: false,
    },
  };
  return art;
}

export const article_fb = {
  published: false,
  dateInTitle: true,
  articles: { 0: false },
  article_order: [0],
  header: {
    date: new Date().toISOString().substring(0, 10),
    place: { latitude: 43.7001, longitude: -79.4163, place: "Toronto" },
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

export const color = (bool) => {
  return bool ? "white" : "var(--inputActive)";
};

// date = "yyyy-mm-dd"
export function dayBefore(date, value = 1) {
  let yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - value);

  return yesterday.toISOString().slice(0, 10);
}

// date = "yyyy-mm-dd"
export function dayAfter(date, value = 1) {
  let tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + value);
  return tomorrow.toISOString().slice(0, 10);
}

export function normDate(date) {
  const splitted = date.split("-").map((x) => parseInt(x));
  return `${splitted[2]}.${splitted[1]}.${splitted[0]}`;
}

