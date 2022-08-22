export const debounce = (
  func: (...args: any[]) => void,
  delay: number,
  { leading }: { leading?: boolean } = {}
) => {
  let timerId: number | undefined;

  return (...args: any[]) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};
