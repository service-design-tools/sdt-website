const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

const listFormatter = new Intl.ListFormat('en', { style: 'short', type: 'disjunction' });

export { debounce, listFormatter };