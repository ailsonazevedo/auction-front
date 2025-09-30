function sortArrayByObjectKeys<T>(
  array: T[],
  keys: Array<{ key: keyof T; order: "asc" | "des" }>,
): T[] {
  if (!array?.length) return [];
  const sortedArray = [...array];

  sortedArray.sort((a, b) => {
    for (const { key, order } of keys) {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return sortedArray;
}

export default sortArrayByObjectKeys;
