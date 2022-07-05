export default function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const monthDate = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${monthDate}`;
}
