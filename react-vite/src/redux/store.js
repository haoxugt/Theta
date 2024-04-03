import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import watchlistReducer from "./watchlist";
import stocksholdReducer from "./stock_hold";
import stockinfoReducer from "./stockinfo";
import orderReducer from "./order";
import portfolioReducer from "./portfolio";

const rootReducer = combineReducers({
  session: sessionReducer,
  watchlist: watchlistReducer,
  stockshold: stocksholdReducer,
  stockinfo: stockinfoReducer,
  order: orderReducer,
  portfolio: portfolioReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
