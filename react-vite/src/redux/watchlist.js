const GET_CURRENT_WATCHLISTS = 'watchlist/getCurrentWatchlists';

// action
const getCurrentWatchlistsAction = (watchlists) => {
  return {
    type: GET_CURRENT_WATCHLISTS,
    payload: watchlists
  }
}

// Thunk Creators

export const getCurrentWatchlistsThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/watchlists');
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getCurrentWatchlistsAction(data.watchlists));
  return data
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
    default:
      return state;
  }
}


export default watchlistReducer;
