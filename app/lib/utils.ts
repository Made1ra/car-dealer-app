export function getYears() {
  return Array.from(
    { length: new Date().getFullYear() - 2015 + 1 },
    (_, index) => 2015 + index,
  );
}
