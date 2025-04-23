export default function getTimeElapsedReadable(dateString: string) {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - inputDate.getTime(); // milliseconds difference

  const msInMinute = 1000 * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;
  const msInMonth = msInDay * 30; // approximate

  if (diffMs < msInHour) {
    const minutes = Math.floor(diffMs / msInMinute);
    return minutes <= 1 ? "just now" : `${minutes} mins ago`;
  }

  if (diffMs < msInDay) {
    const hours = Math.floor(diffMs / msInHour);
    return `${hours} h`;
  }

  const days = Math.floor(diffMs / msInDay);
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  const months = (diffMs / msInMonth).toFixed(1);
  return `${months} month${months !== "1.0" ? "s" : ""} ago`;
}
