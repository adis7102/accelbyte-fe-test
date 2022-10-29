import fetcher from "../../fetch/index.js";

let getListDataController = new AbortController();

export const setLoading = (status) => {
  return {
    type: "LOADING",
    loading: status
  }
};

export const setError = (error) => {
  return (dispatch) => {
    dispatch({
      type: "ERROR",
      error
    })
    setTimeout(() => {
      dispatch({
        type: "ERROR",
        error: false
      })
    }, 3000)
  }
};

export const getListData = (url, status) => {
  return (dispatch) => {
    dispatch(setLoading(true))

    if(status === 'refetch') {
      getListDataController = new AbortController();
    }

    fetcher(url, {
      method: "GET",
      signal: getListDataController.signal
    })
    .then(async (data) => {
      if(data) {
        const newData = await Promise.all(data.map(async id => {
          try {
            const response = await fetcher(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, {
              method: "GET",
              signal: getListDataController.signal
            });
  
            return response
          } catch (e) {
            console.error(e)
            throw "Failed to get the data ..."
          }
        }));
  
        dispatch({
          type: "GET_LIST_DATA",
          listData: newData
        })
      } else {
        throw "Failed to get the data ..."
      }
    })
    .catch((e) => {
      console.error(e)
      dispatch(setError(JSON.stringify(e)))
    })
    .finally(() => dispatch(setLoading(false)))
  };
};

export const getDataById = (url) => {
  return (dispatch) => {
    dispatch(setLoading(true))

    getListDataController.abort(); 

    fetcher(url, {
      method: "GET"
    })
    .then((data) => {
      dispatch({
        type: "GET_LIST_DATA",
        listData: [data]
      })
    })
    .catch((e) => {
      console.error(e)
      dispatch(setError(JSON.stringify(e)))
    })
    .finally(() => dispatch(setLoading(false)))
  };
};