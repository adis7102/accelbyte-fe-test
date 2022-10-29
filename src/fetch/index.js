export const request = (url, options) => {
  return fetch(url, options)
    .then((res) => {
      if(res.ok) {
       return res.json();
      } else {
        return null
      }
    })
    .catch((e) => console.error(e));
};

export default request;
