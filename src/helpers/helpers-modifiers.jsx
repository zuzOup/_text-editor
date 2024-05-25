export function modifier_text(data, value) {
  const obj = { ...data };
  obj.text = value;
  return obj;
}

export function modifier_url(data, value) {
  const obj = { ...data };
  const img = { ...data.img };
  img.url = value;
  obj.img = { ...img };
  return obj;
}

export function modifier_alt(data, value) {
  const obj = { ...data };
  const img = { ...data.img };
  img.alt = value;
  obj.img = { ...img };
  return obj;
}

export function modifier_float(data, value) {
  const obj = { ...data };
  const img = { ...data.img };
  img.float = value;
  obj.img = { ...img };
  return obj;
}

export function modifier_link_url(data, value) {
  const obj = { ...data };
  const link = { ...data.link };
  link.url = value;
  obj.link = { ...link };
  return obj;
}

export function modifier_link_text(data, value) {
  const obj = { ...data };
  const link = { ...data.link };
  link.text = value;
  obj.link = { ...link };
  return obj;
}

export function modifier_yt_start(data, value) {
  const obj = { ...data };
  const yt = { ...data.yt };
  yt.start = value;
  obj.yt = { ...yt };
  return obj;
}

export function modifier_yt_urlID(data, value) {
  const obj = { ...data };
  const yt = { ...data.yt };
  yt.urlID = value;
  obj.yt = { ...yt };
  return obj;
}

export const clear = {
  txtImg: function (data) {
    const obj = { ...data };
    obj.img = { alt: "", url: "", float: "right" };
    return obj;
  },
  img: function (data) {
    const obj = { ...data };
    obj.img = { alt: "", url: "" };
    return obj;
  },
  link: function (data) {
    const obj = { ...data };
    obj.link = { text: "", url: "" };
    return obj;
  },
  yt: function (data) {
    const obj = { ...data };
    obj.yt = { start: 0, urlID: "" };
    return obj;
  },
};

export const text = {
  img: function (data) {
    return data.url === "" ? "Přidat img ↗" : "Upravit ↗";
  },
  link: function (data) {
    return data.text === "" ? "Přidat link ↗" : `<em>${data.text}</em> ↗`;
  },
  yt: function (data) {
    return data.urlID === "" ? "Přidat YT ↗" : "Upravit ↗";
  },
};
