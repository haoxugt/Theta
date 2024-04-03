const GET_CURRENT_PORTFOLIOS = 'portfolio/getCurrentPortfolios';
const CREATE_PORTFOLIO = 'portfolio/createPortfolio';
const BUY_SELL_STOCK_IN_PORTFOLIO = 'portfolio/buySellStockInPortfolio';

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


// Thunk Creators

export const getCurrentPortfoliosThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/portfolios');
  const data = await response.json();
  // console.log("data======>", data)
  if (response.ok) {
    dispatch(getCurrentPortfoliosAction(data.portfolios));
    return data
  }
  throw response;
}

export const createPortfolioThunk = (portfolio) => async (dispatch) => {
  // const { title, is_retirement } = portfolio;

  const response = await fetch('/api/portfolios', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ portfolio })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createPortfolioAction(data));
    return data;
  } else {
    throw response;
  }

}

export const buySellStockInPortfolioThunk = (portfolio, order) => async (dispatch) => {
  // console.log("44444444444444444444444444", portfolio)
  const response = await fetch(`/api/portfolios/${portfolio.id}/makeorder`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order })
  })

  if (response.ok) {
    const data = await response.json();
    // console.log("data =================>", data)
    dispatch(buySellStockInPortfolioAction(data));
    return data;
  } else {
    throw response;
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
    // case GET_SINGLE_WATCHLIST: {
    //   return { ...state, watchlistShow: {...action.payload }}
    // }
    // case REMOVE_STOCK_IN_WATCHLIST: {
    //   const watchlist = state.Watchlists[action.payload.watchlist.id];
    //   const updatedStockArray = watchlist.stocks.filter(stock => stock.code !== action.payload.stockCode);
    //   const updatedWatchlist = { ...watchlist, stocks: updatedStockArray}
    //   return { ...state,
    //           Watchlists: { ...state.Watchlists, [action.payload.watchlist.id]: updatedWatchlist},
    //           watchlistShow: { ...action.payload.watchlist}}
    // }
    // case ADD_STOCK_TO_WATCHLIST: {
    //   const watchlist = state.Watchlists[action.payload.watchlist.id];
    //   let watchlistShow = state.watchlistShow;
    //   watchlist.stocks.push(action.payload.stock);
    //   const updatedStockArray = watchlist.stocks;
    //   const updatedWatchlist = { ...watchlist, stocks: updatedStockArray}
    //   if (watchlistShow.id == updatedWatchlist.id) {
    //     watchlistShow = {...updatedWatchlist};
    //   }

    //   return { ...state,
    //           Watchlists: { ...state.Watchlists, [action.payload.watchlist.id]: updatedWatchlist},
    //           watchlistShow: { ...watchlistShow}}
    // }
    default:
      return state;
  }
}


export default portfolioReducer;
