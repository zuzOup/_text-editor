const flipObject = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[obj[cur]]
      ? (acc[obj[cur]] = [...acc[obj[cur]], parseInt(cur)])
      : (acc[obj[cur]] = [parseInt(cur)]);
    return acc;
  }, {});
};

const rowValue = (value) => {
  return (value - ((value - 1) % 6) - 1) / 6 + 1;
};

const findIntersection = (arr1, arr2) => {
  const intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    const x = arr1[i];
    if (arr2.indexOf(x) !== -1 && intersection.indexOf(x) === -1) {
      intersection.push(x);
    }
  }
  return intersection;
};

const partialyCovered = (arr, int) => {
  return !(arr.length === 0 || int.length === 0 || int.length === arr.length);
};

const findDifference = (arr1, arr2) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const addToObject = (arr, obj, ct) => {
  arr.forEach((square) => (obj[square] = ct));
};

const getItems = (obj, arr) => {
  return [
    ...new Set(
      arr.reduce((acc, square) => {
        return [...acc, obj[square]];
      }, [])
    ),
  ];
};

const sortIntoRows = (arr) => {
  return arr.reduce((acc, cur) => {
    acc[rowValue(cur)]
      ? (acc[rowValue(cur)] = [...acc[rowValue(cur)], cur])
      : (acc[rowValue(cur)] = [cur]);
    return acc;
  }, {});
};

const skip = (arr, i) => {
  return arr[i] - arr[i - 1] !== 1;
};

const rowSkip = (arr) => {
  if (arr.length === 1) return false;
  for (let i = 1; i < arr.length; i++) {
    if (skip(arr, i)) return true;
  }
  return false;
};

const findRowSkip = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (skip(arr, i)) return arr[i];
  }
};

const rowLength = (obj) => {
  return !Object.values(obj).every((row) => row.length === Object.values(obj)[0].length);
};

const findRowLength = (obj) => {
  return Object.keys(obj).find(
    (key) => obj[key].length !== obj[Object.keys(obj)[0]].length
  );
};

const toBeDeleted = (arr, obj, condition) => {
  return arr
    .filter((key) => key >= condition)
    .reduce((acc, key) => {
      return [...acc, obj[key]];
    }, [])
    .flat();
};

// squaresBefore_obj = {square:item} | squaresNew = [square] | counter = item (new) | shift = true/false
// squaresAfter_obj = {square:item} | squaresBefore = [square]
// intersection = [squares] affected

export default function IG_setSquares(squaresBefore_obj, squaresNew, counter, shift) {
  //
  let squaresAfter_obj = { ...squaresBefore_obj };
  
  const squaresBefore = Object.keys(squaresBefore_obj).map((square) => parseInt(square));
  const intersection = findIntersection(squaresNew, squaresBefore);

  // isAllCovered([],[]) => true/false  Are any items partialy covered?
  if (partialyCovered(squaresBefore, intersection)) {
    // [squares] to be deleted
    let squaresToBeDeleted = [];
    //  [items] affected
    getItems(squaresBefore_obj, intersection).forEach((item) => {
      //
      // itemsLeft = [square] of unaffected items
      const itemsLeft = findDifference(
        flipObject(squaresBefore_obj)[item],
        findIntersection(flipObject(squaresBefore_obj)[item], squaresNew)
      );

      //is more than one square left?
      if (itemsLeft.length > 1) {
        //rows = {row : [squares]}
        //rows_keys = [row]

        const rows = sortIntoRows(itemsLeft);
        const rows_keys = Object.keys(rows).map((key) => parseInt(key));
        const rows_values = Object.values(rows);

        //rowSkip([...]) = true/false   Are there empty rows? -> delete every row after the empty row
        if (rowSkip(rows_keys)) {
          //

          squaresToBeDeleted.push(toBeDeleted(rows_keys, rows, findRowSkip(rows_keys)));

          //rowLength({...}) = true/false   Are any rows of different length? -> delete every row after diff. row (incl.)
        } else if (rowLength(rows)) {
          const deleted = toBeDeleted(rows_keys, rows, findRowLength(rows));

          squaresToBeDeleted.push(deleted);

          const firstRow = findDifference(rows_values[0], deleted);
          if (rowSkip(firstRow)) {
            squaresToBeDeleted.push(
              firstRow.filter((square) => square >= findRowSkip(firstRow))
            );
          }

          //rowSkip([...]) = true/false  Is there skip in first (and thus all) row? -> delete every column after the skip
        } else if (rowSkip(rows[rows_keys[0]])) {
          const toBeDeleted = Object.values(rows).map((row) => {
            return row.filter(
              (square) => (square - 1) % 6 >= findRowSkip(rows[rows_keys[0]]) - 1
            );
          });

          squaresToBeDeleted.push(toBeDeleted.flat());
        }
      }
    });

    squaresToBeDeleted.flat().forEach((square) => {
      delete squaresAfter_obj[square];
    });
  }

  if (shift) {
    squaresNew.forEach((square) => {
      delete squaresAfter_obj[square];
    });
  } else {
    addToObject(squaresNew, squaresAfter_obj, counter);
  }

  return squaresAfter_obj;
}
