const GET_SINGLE_STOCK_INFO = 'stockinfo/getSingleStock';
const GET_INDEX_INFO = 'stockinfo/getIndex';
const GET_ALL_STOCK_INFO = 'stockinfo/getAllStock';
const GET_SINGLE_STOCK_REALTIME_DATA = 'stockinfo/getSingleStockRealtimeData'

// action
const getAllStockAction = (stocks) => {
  return {
    type: GET_ALL_STOCK_INFO,
    payload: stocks
  }
}

const getIndexAction = (indexs) => {
    return {
      type: GET_INDEX_INFO,
      payload: indexs
    }
  }

const getSingleStockAction = (stock) => {
  return {
    type: GET_SINGLE_STOCK_INFO,
    payload: stock
  }
}

const getSingleStockRealtimeDataAction = (data) => {
    return {
      type: GET_SINGLE_STOCK_REALTIME_DATA,
      payload: data
    }
  }

// Thunk Creators
export const getAllStockThunk = () => async (dispatch) => {
  const response = await fetch(`/api/stockinfo`);
  const data = await response.json();

  dispatch(getAllStockAction(data.stocks));
  return data
}

export const getIndexThunk = () => async (dispatch) => {
    const response = await fetch('/api/stockinfo/index');
    const data = await response.json();

    if (response.ok) {
      dispatch(getIndexAction(data.indexs));
      return data
    }
    throw data;
  }


export const getSingleStockThunk = (stockCode) => async (dispatch) => {
  const response = await fetch(`/api/stockinfo/${stockCode}`);
  const data = await response.json();


  dispatch(getSingleStockAction(data.stock));
  return data
}

export const getSingleStockRealtimeDataThunk = (stockCode) => async (dispatch) => {
    const response = await fetch(`/api/stockinfo/${stockCode}/data`);
    const data = await response.json();

    // dispatch(getSingleStockAction(data.stock));
    dispatch(getSingleStockRealtimeDataAction(data))
    return data
}

// state update
const initialState = { Stocklists: {}, stock: {}, rawdata: {}, indexs: {}};

const stockinfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STOCK_INFO: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.code] = { ...el });
      return { ...state, Stocklists: { ...newObj } };
    }
    case GET_INDEX_INFO: {
        return { ...state, ...{indexs: {...action.payload }}};
      }
    case GET_SINGLE_STOCK_REALTIME_DATA: {
        // const newObj = {};
        // action.payload.forEach(el => newObj[el.code] = { ...el });
        return { ...state, rawdata: { ...action.payload } };
      }
    case GET_SINGLE_STOCK_INFO: {
      return { ...state, ... {stock: {...action.payload}}};
    }
    default:
      return state;
  }
}


export default stockinfoReducer;
