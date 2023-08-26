export const formatDate = (date: string) => {
  let newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(newDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
