const GET_CURRENT_ORDERS = 'order/getCurrentOrders';
const CREATE_ORDER = 'order/createOrder';

// action
const getCurrentOrdersAction = (orders) => {
  return {
    type: GET_CURRENT_ORDERS,
    payload: orders
  }
}

const createOrderAction = (order) => {
  return {
    type: CREATE_ORDER,
    payload: order
  }
}

// Thunk Creators

export const getCurrentOrdersThunk = () => async (dispatch) => {
  const response = await fetch('/api/orders/current');
  const data = await response.json();

  if (response.ok) {
    dispatch(getCurrentOrdersAction(data.orders));
    return data
  } else {
    throw response;
  }
}

export const createOrderThunk = (order) => async (dispatch) => {
  // const { name } = watchlist;

  const response = await fetch('/api/orders', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ order })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createOrderAction(data));
    return data;
  } else {
    throw response;
  }

}

// state update
const initialState = { Orders: {} };

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDERS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Orders: { ...newObj } };
    }
    case CREATE_ORDER: {
      return { ...state, Orders: {...state.Orders, ...{[action.payload.id]: action.payload}}}
    }
    default:
      return state;
  }
}


export default orderReducer;
