const GET_CURRENT_WATCHLISTS = 'watchlist/getCurrentWatchlists';
const CREATE_WATCHLIST = 'watchlist/createWatchlist';
const GET_SINGLE_WATCHLIST = 'watchlist/getSingleWatchlist';
const REMOVE_STOCK_IN_WATCHLIST = 'watchlist/removeStockInWatchlist'

// action
const getCurrentWatchlistsAction = (watchlists) => {
  return {
    type: GET_CURRENT_WATCHLISTS,
    payload: watchlists
  }
}

const createWatchlistAction = (watchlist) => {
  return {
    type: CREATE_WATCHLIST,
    payload: watchlist
  }
}

const getSingleWatchlistAction = (watchlist) => {
  return {
    type: GET_SINGLE_WATCHLIST,
    payload: watchlist
  }
}

const removeStockInWatchlistAction = (watchlist, stockCode) => {
  return {
    type: REMOVE_STOCK_IN_WATCHLIST,
    payload: {
      watchlist,
      stockCode
    }
  }
}

// Thunk Creators

export const getCurrentWatchlistsThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/watchlists');
  const data = await response.json();
  // console.log("data======>", data)
  if (response.ok) {
    dispatch(getCurrentWatchlistsAction(data.watchlists));
    return data
  }
  return response;
}

export const createWatchlistThunk = (watchlist) => async (dispatch) => {
  const { name } = watchlist;

  const response = await fetch('/api/users/current/watchlists', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ name })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createWatchlistAction(data));
    return data;
  } else {
    throw response;
  }

}

export const getSingleWatchlistThunk = (watchlistId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlistId}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getSingleWatchlistAction(data))
    return data
  } else {
    throw response;
  }
}

export const removeStockInWatchlistThunk = (watchlist, stockCode) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlist.id}/removestock`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stockCode })
  })

  if (response.ok) {
    const data = await response.json();
    console.log("data =================>", data)
    dispatch(removeStockInWatchlistAction(data, stockCode));
    return data;
  } else {
    throw response;
  }
}

// state update
const initialState = { Watchlists: {}, watchlistShow: {} };

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_WATCHLISTS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Watchlists: { ...newObj } };
    }
    case CREATE_WATCHLIST: {
      return { ...state, Watchlists: {...state.Watchlists, ...{[action.payload.id]: action.payload}}}
    }
    case GET_SINGLE_WATCHLIST: {
      return { ...state, watchlistShow: {...action.payload }}
    }
    case REMOVE_STOCK_IN_WATCHLIST: {
      const watchlist = state.Watchlists[action.payload.watchlist.id];
      const updatedStockArray = watchlist.stocks.filter(stock => stock.code !== action.payload.stockCode);
      const updatedWatchlist = { ...watchlist, stocks: updatedStockArray}
      return { ...state,
              Watchlists: { ...state.Watchlists, [action.payload.watchlist.id]: updatedWatchlist},
              watchlistShow: { ...action.payload.watchlist}}
    }
    default:
      return state;
  }
}


export default watchlistReducer;
