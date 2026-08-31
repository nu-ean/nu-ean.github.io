export function resolveImage(file?: string) {
  const images = import.meta.glob("/src/assets/images/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  if (!file) return "";
  const entry = Object.entries(images).find(([key]) =>
    key.endsWith(`/${file}`)
  );
  return entry ? entry[1] : "";
}

export function formatPeriod(startDate: string, endDate?: string) {
  const formattedStartDate = startDate.slice(0, 7).replace("-", ".");
  const formattedEndDate = endDate
    ? endDate.slice(0, 7).replace("-", ".")
    : "진행중";

  if (formattedStartDate === formattedEndDate) {
    return formattedStartDate;
  }

  return `${formattedStartDate} ~ ${formattedEndDate}`;
}
