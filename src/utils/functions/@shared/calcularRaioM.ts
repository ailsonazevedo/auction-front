function calcularRaioM(
  { lat, lng }: { lat: number; lng: number },
  { lat2, lon2 }: { lat2: number; lon2: number },
) {
  const p = 0.017453292519943295,
    c = Math.cos,
    a =
      0.5 -
      c((lat2 - lat) * p) / 2 +
      (c(lat * p) * c(lat2 * p) * (1 - c((lon2 - lng) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)) * 1000;
}

export { calcularRaioM };
