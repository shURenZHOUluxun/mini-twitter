export function formatTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = 3600;
  const day = 86400;

  if (diff < minute) {
    return `${diff}s ago`;
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}m ago`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h ago`;
  }

  if (diff < day * 7) {
    return `${Math.floor(diff / day)}d ago`;
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}