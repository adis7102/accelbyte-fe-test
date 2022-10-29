export const setSearchQuery = (keyword) => {
  window.history.pushState(
    { search: keyword },
    "",
    `?search=${encodeURIComponent(keyword)}`
  );
};

export const removeSearchQuery = () => {
  const hrefUrl = new URL(window.location.href);

  hrefUrl.searchParams.delete("search");

  window.history.pushState({}, "", hrefUrl);
};

export const getSearchParams = (key) => {
  const searchParams = new URLSearchParams(window.location.search);

  const param = searchParams.get(key);

  return param;
}