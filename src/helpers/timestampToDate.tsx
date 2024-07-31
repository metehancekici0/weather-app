const timestampToDate = (timestamp: number, isMillis: boolean = false): string => {
  if (isMillis) {
    timestamp = Math.floor(timestamp / 1000);
  }

  const date = new Date(timestamp * 1000);

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default timestampToDate;
