const GET_CURRENT_WATCHLISTS = 'watchlist/getCurrentWatchlists';
const CREATE_WATCHLIST = 'watchlist/createWatchlist'

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


// state update
const initialState = { Watchlists: {} };

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
    default:
      return state;
  }
}


export default watchlistReducer;
