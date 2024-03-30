const GET_ALL_STOCKS_HOLD = 'stockhold/getAllStocksHold';

// action
const getAllStocksHoldAction = (stocks) => {
  return {
    type: GET_ALL_STOCKS_HOLD,
    payload: stocks
  }
}

// Thunk Creators

export const getAllStocksHoldThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/portfolios/investing/stockshold');
  const data = await response.json();
  // console.log("data======>", data.Stockshold)

  dispatch(getAllStocksHoldAction(data.Stockshold));
  return data
}

// state update
const initialState = { Stockshold: {} };

const stocksholdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STOCKS_HOLD: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Stockshold: { ...newObj } };
    }
    default:
      return state;
  }
}


export default stocksholdReducer;
