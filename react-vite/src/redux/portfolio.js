const GET_CURRENT_PORTFOLIOS = 'portfolio/getCurrentPortfolios';
const CREATE_PORTFOLIO = 'portfolio/createPortfolio';
// const CREATE_PORTFOLIO_JSON = 'portfolio/createPortfolioJSON';
const BUY_SELL_STOCK_IN_PORTFOLIO = 'portfolio/buySellStockInPortfolio';
const DELETE_PORTFOLIO = 'portfolio/deletePortfolio';
const TRANSFER_IN_PORTFOLIO = 'portfolio/transferInPortfolio'

// action
const getCurrentPortfoliosAction = (portfolios) => {
  return {
    type: GET_CURRENT_PORTFOLIOS,
    payload: portfolios
  }
}

const createPortfolioAction = (portfolio) => {
  return {
    type: CREATE_PORTFOLIO,
    payload: portfolio
  }
}

const buySellStockInPortfolioAction = (portfolio) => {
  return {
    type: BUY_SELL_STOCK_IN_PORTFOLIO,
    payload: portfolio
  }
}

const transferInPortfolioAction = (portfolio) => {
  return {
    type: TRANSFER_IN_PORTFOLIO,
    payload: portfolio
  }
}

const deletePortfolioAction = (portfolioId) => {
  return {
    type: DELETE_PORTFOLIO,
    payload: portfolioId
  }
}


// Thunk Creators

export const getCurrentPortfoliosThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/portfolios');
  const data = await response.json();

  if (response.ok) {
    dispatch(getCurrentPortfoliosAction(data.portfolios));
    return data
  }
  throw data;
}

export const createPortfolioThunk = (portfolio) => async (dispatch) => {
  // const { title, is_retirement } = portfolio;

  const response = await fetch('/api/portfolios', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ portfolio })
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(createPortfolioAction(data));
    return data;
  } else {
    throw data;
  }

}

export const createPortfolioJSONThunk = (portfolio) => async () => {
  // const { title, is_retirement } = portfolio;

  const response = await fetch(`/api/portfolios/${portfolio.id}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    // body: JSON.stringify({ portfolio })
  });
  const data = await response.json();


  if (response.ok) {

      // dispatch(createPortfolioAction(data));
      return data;
    } else {

    throw data;
  }

}

export const deletePortfolioThunk = (portfolioId) => async (dispatch) => {
  // const { title, is_retirement } = portfolio;

  const response = await fetch(`/api/portfolios/${portfolioId}`, {
    method: "DELETE"
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(deletePortfolioAction(portfolioId));
    return data;
  } else {
    throw data;
  }

}

export const buySellStockInPortfolioThunk = (portfolio, order) => async (dispatch) => {

  const response = await fetch(`/api/portfolios/${portfolio.id}/makeorder`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order })
  })

  const data = await response.json();
  if (response.ok) {
    dispatch(buySellStockInPortfolioAction(data));
    return data;
  } else {
    throw data;
  }
}

export const transferInPortfolioThunk = (portfolio, transfer) => async (dispatch) => {

  const response = await fetch(`/api/portfolios/${portfolio.id}/transfer`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transfer })
  })

  const data = await response.json();
  if (response.ok) {

    dispatch(transferInPortfolioAction(data));
    return data;
  } else {
    throw data;
  }
}

// state update
const initialState = { Portfolios: {} };

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PORTFOLIOS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Portfolios: { ...newObj } };
    }
    case CREATE_PORTFOLIO: {
      return { ...state, Portfolios: {...state.Portfolios, ...{[action.payload.id]: action.payload}}}
    }
    case BUY_SELL_STOCK_IN_PORTFOLIO: {
      return { ...state, Portfolios: {...state.Portfolios, ...{[action.payload.id]: action.payload}}}
    }
    case TRANSFER_IN_PORTFOLIO: {
      return { ...state, Portfolios: {...state.Portfolios, ...{[action.payload.id]: action.payload}}}
    }
    case DELETE_PORTFOLIO: {
      const newState = { ...state };
      delete newState.Portfolios[action.payload];
      return newState
    }

    default:
      return state;
  }
}


export default portfolioReducer;
