function preloadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = function () {
      res(img.naturalHeight);
    };
    img.onerror = img.onabort = function () {
      rej(src);
    };
    img.src = src;
  });
}

export async function setInitialHeight(url, set, width) {
  if (url !== "") {
    const source = src(url, width);

    try {
      const initialHeight = await preloadImage(source);
      set(initialHeight);
    } catch (e) {
      set(0);
    }
  }
}

export function src(url, size) {
  /*TODO: REMOVE!!!!!!!! */
  if (
    url ===
    `https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?`
  )
    return url + "w=" + size;

  /*-----*/

  let id;
  let index;

  const extractId = (toBeSplit) => {
    for (let i = 0; i < toBeSplit.length; i++) {
      if (toBeSplit[i] === "/") index = i;
    }

    return (id = toBeSplit.slice(index + 1));
  };

  if (url.includes("https://drive.google.com/thumbnail?id=")) {
    const arr = url.split("&sz=w");
    arr.pop();
    return arr + "&sz=w" + size;
  } else if (!url.includes("view?usp=sharing")) {
    id = extractId(url);
  } else {
    const splitted = url.split("/");
    splitted.pop();
    const joined = splitted.join("/");

    id = extractId(joined);
  }

  const newUrl = "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + size;

  return newUrl;
}
