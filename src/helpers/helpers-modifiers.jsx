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

export const clear = {
  txtImg: function (data, value) {
    const obj = { ...data };
    obj.img = { alt: value, url: value, float: "right" };
    return obj;
  },
};

export const text = {
  img: function (data) {
    return data.url === "" ? "Přidat img ↗" : "Upravit ↗";
  },
};
