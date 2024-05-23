export function modifier_text(data, value) {
  const obj = { ...data };
  obj.text = value;
  return obj;
}

export function modifier_url(data, value) {
  console.log(value);
  const obj = { ...data };
  const img = { ...data.img };
  img.url = value;
  obj.img = { ...img };
  return obj;
}

export const text = {
  img: function (data) {
    return data.url === "" ? "Přidat img ↗" : "Upravit ↗";
  },
};
