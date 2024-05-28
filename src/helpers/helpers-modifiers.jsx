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

export function modifier_grid_rows(data, value) {
  const obj = { ...data };
  obj.rows = value;
  return obj;
}

export function modifier_grid_divsRC(data, value) {
  if (data.divs !== 0) {
    const obj = { ...data };
    const divs = { ...obj.divs };

    let newDivs = {};

    for (let i = 0; i < Object.keys(divs).length; i++) {
      if (value[i] !== undefined) {
        const key = Object.keys(divs)[i];
        newDivs[i + 1] = divs[key];
      }
    }

    value.forEach((value_obj, i) => {
      const curDiv = { ...newDivs[i + 1] };
      curDiv.rowStart = value_obj.rowStart;
      curDiv.rowEnd = value_obj.rowEnd;
      curDiv.columnStart = value_obj.columnStart;
      curDiv.columnEnd = value_obj.columnEnd;
      curDiv.alt = curDiv.alt || "";
      curDiv.url = curDiv.url || "";
      newDivs[i + 1] = curDiv;
    });
    obj.divs = newDivs;
    return obj;
  } else {
    const obj = { ...data };
    const divs = {};
    value.forEach((value_obj, i) => {
      const newDivs = { ...value_obj, alt: "", url: "" };
      divs[i + 1] = newDivs;
    });
    obj.divs = divs;
    return obj;
  }
}

//arr = [value, item]
export function modifier_grid_url(data, arr) {
  const obj = { ...data };
  const divs = { ...data.divs };
  const item = { ...divs[arr[1]] };
  item.url = arr[0];
  divs[arr[1]] = item;
  obj.divs = { ...divs };
  return obj;
}

//arr = [value, item]
export function modifier_grid_alt(data, arr) {
  const obj = { ...data };
  const divs = { ...data.divs };
  const item = { ...divs[arr[1]] };
  item.alt = arr[0];
  divs[arr[1]] = item;
  obj.divs = { ...divs };
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
  grid: function (data) {
    const obj = { ...data };
    obj.divs = 0;
    obj.rows = "1";
    return obj;
  },

  grid_img: function (data, item) {
    const obj = { ...data };
    const divs = { ...data.divs };
    const items = { ...divs[item] };
    items.alt = "";
    items.url = "";
    divs[item] = items;
    obj.divs = divs;
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
  grid: function () {
    return "Přidat grid ↗";
  },
  gridImg: function (data) {
    return data.url === "" ? "Přidat img ↗" : "Upravit ↗";
  },
};
