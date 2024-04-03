const GET_ALL_STOCKS_HOLD = 'stockhold/getAllStocksHold';
const GET_RETIREMENT_STOCKS_HOLD = 'stockhold/getRetirementStocksHold';
const BUY_STOCKS_HOLD = 'stockhold/buyStocksHold';
// const SELL_STOCKS_HOLD = 'stockhold/sellStocksHold';

// action
const getAllStocksHoldAction = (stocks) => {
  return {
    type: GET_ALL_STOCKS_HOLD,
    payload: stocks
  }
}

const getRetirementStocksHoldAction = (stocks) => {
  return {
    type: GET_RETIREMENT_STOCKS_HOLD,
    payload: stocks
  }
}
const buyStocksHoldAction = (stock) => {
  return {
    type: BUY_STOCKS_HOLD,
    payload: stock
  }
}

// const sellStocksHoldAction = (stock) => {
//   return {
//     type: SELL_STOCKS_HOLD,
//     payload: stock
//   }
// }
// Thunk Creators

export const getAllStocksHoldThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/portfolios/investing/stockshold');
  const data = await response.json();
  // console.log("data======>", data.Stockshold)

  dispatch(getAllStocksHoldAction(data.Stockshold));
  return data
}

export const getRetirementStocksHoldThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/portfolios/retirement/stockshold');
  const data = await response.json();
  // console.log("data======>", data.Stockshold)

  dispatch(getRetirementStocksHoldAction(data.Stockshold));
  return data
}

export const buyStocksHoldThunk = (order) => async (dispatch) => {
  // const { stock_info_code, portfolio_id, shares, is_buy, transaction_price } = order;

  const response = await fetch('/api/stockhold/buy', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ order })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(buyStocksHoldAction(data));
    return data;
  } else {
    throw response;
  }

}

export const sellStocksHoldThunk = (order) => async (dispatch) => {
  // const { stock_info_code, portfolio_id, shares, is_buy, transaction_price } = order;

  const response = await fetch('/api/stockhold/sell', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ order })
  });

  if (response.ok) {
    // const data = await response.json();
    const data = dispatch(getAllStocksHoldThunk());
    return data;
  } else {
    throw response;
  }

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
    case GET_RETIREMENT_STOCKS_HOLD: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Stockshold: { ...newObj } };
    }
    case BUY_STOCKS_HOLD: {
      return { ...state, Stockshold: {...state.Stockshold, ...{[action.payload.id]: action.payload}} };
    }
    default:
      return state;
  }
}


export default stocksholdReducer;
