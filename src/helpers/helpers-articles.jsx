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

    /*TODO: REMOVE!!!!!!!! */
    // if (
    //   url ===
    //   `https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?`
    // ) {
    //   const initialHeight = await preloadImage(
    //     `https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=${width}`
    //   );
    //   set(initialHeight);
    //   return;
    // }

    /*-----*/

    try {
      const initialHeight = await preloadImage(source);
      set(initialHeight);
    } catch (e) {
      set(30);
    }
  }
}

export function src(url, size) {
  /*TODO: REMOVE!!!!!!!! */
  // if (
  //   url ===
  //   `https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?`
  // )
  //   return url + "w=" + size;

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

export const validUrl = (target) => {
  if (target === "") return true;

  try {
    new URL(target);
    return (
      target.includes("https://drive.google.com/file/d/") ||
      target.includes("https://lh3.google.com/u/5/d/") ||
      target.includes("https://drive.google.com/thumbnail?id=")
    );
  } catch (err) {
    return false;
  }
};

export const tryUrl = (url) => {
  if (url === "") return false;
  try {
    new URL(url);
    return false;
  } catch (err) {
    return true;
  }
};

export function fmtMSS(s) {
  if (isNaN(s)) return "0:00";
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

export function colors(key) {
  const color = [
    "#E4BDB5",
    "#C5766E",
    "#B72D21",
    "#E75630",
    "#AD5430",
    "#785436",
    "#A97B44",
    "#DBA357",
    "#F4B620",
    "#ABA247",
    "#7C9A82",
    "#5E6F6C",
    "#3E516B",
    "#6391DD",
    "#98C7FD",
    "#B1BCC0",
    "#CCCFCF",
    "#E4E2DE",
  ];

  return color[(key - 1) % 18];
}

export const state = (divs) => {
  if (divs === 0) {
    return true;
  } else {
    return false;
  }
};

export const gridValues = (value) => {
  const obj = { ...value };
  const flipped = Object.keys(obj).reduce((acc, cur) => {
    acc[obj[cur]]
      ? (acc[obj[cur]] = [...acc[obj[cur]], parseInt(cur)])
      : (acc[obj[cur]] = [parseInt(cur)]);
    return acc;
  }, {});

  const rowValue = (value) => {
    return (value - ((value - 1) % 6) - 1) / 6 + 1;
  };
  const sorted = (x, y) => {
    return [x, y].sort((a, b) => a - b);
  };

  const new_arr = Object.values(flipped).map((arr) => {
    const first = arr[0];
    const last = [...arr].pop();

    return {
      rowStart: rowValue(first),
      rowEnd: rowValue(last) + 1,
      columnStart: sorted(
        first - (rowValue(first) - 1) * 6,
        last - (rowValue(last) - 1) * 6
      )[0],
      columnEnd:
        sorted(first - (rowValue(first) - 1) * 6, last - (rowValue(last) - 1) * 6)[1] + 1,
    };
  });

  return new_arr;
};

export const fetchTitle_yt = async (id, setter) => {
  const api = import.meta.env.VITE_API_YOUTUBE;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${api}&fields=items(id,snippet(title))&part=snippet`
  );
  const data = await response.json();
  const title = data.items[0].snippet.title;
  setter(title);
};
