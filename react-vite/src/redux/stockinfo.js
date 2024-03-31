const GET_SINGLE_STOCK_INFO = 'stockinfo/getSingleStock';

// action
const getSingleStockAction = (stock) => {
  return {
    type: GET_SINGLE_STOCK_INFO,
    payload: stock
  }
}

// Thunk Creators

export const getSingleStockThunk = (stockCode) => async (dispatch) => {
  const response = await fetch(`/api/stockinfo/${stockCode}`);
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getSingleStockAction(data.stock));
  return data
}

// state update
const initialState = { stock: {} };

const stockinfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_STOCK_INFO: {
      return { ... {stock: {...action.payload}}};
    }
    default:
      return state;
  }
}


export default stockinfoReducer;
