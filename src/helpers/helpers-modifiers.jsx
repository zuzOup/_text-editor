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

export const clear = {
  txtImg: function (data, value) {
    const obj = { ...data };
    obj.img = { alt: value, url: value, float: "right" };
    return obj;
  },
  img: function (data, value) {
    const obj = { ...data };
    obj.img = { alt: value, url: value };
    return obj;
  },
  link: function (data, value) {
    const obj = { ...data };
    obj.link = { text: value, url: value };
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
    return data.yt === "" ? "Přidat YT ↗" : "Upravit ↗";
  },
};
