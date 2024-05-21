export const weather_data = [
  {
    place: "Toronto",
    latitude: 43.7001,
    longitude: -79.4163,
  },
  {
    place: "Praha",
    latitude: 50.088,
    longitude: 14.4208,
  },
  {
    place: "Niagáry",
    latitude: 43.1001,
    longitude: -79.0663,
  },
  {
    place: "New York",
    latitude: 40.7127837,
    longitude: -74.0059413,
  },
  {
    place: "Island",
    latitude: 63.529722,
    longitude: -19.513889,
  },
  {
    place: "Reyjkjavik",
    latitude: 64.1475,
    longitude: -21.935,
  },
  {
    place: "Vídeň",
    latitude: 48.2085,
    longitude: 16.3721,
  },
  {
    place: "Lisabon",
    latitude: 38.708042,
    longitude: -9.139016,
  },
];

export function weather_findMatch(value) {
  const match = weather_data
    .filter((data) => {
      const normalized = data.place.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const regex = new RegExp(value, "gi");

      if (normalized.match(regex)) {
        return data.place;
      }

      return data.place.match(regex);
    })
    .map((data) => data.place);

  return match;
}
