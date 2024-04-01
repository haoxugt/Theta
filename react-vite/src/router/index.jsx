import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from './Pages/Home/HomePage';
import StockInfo from './Pages/StockInfo/StockInfo';
import WatchlistShowPage from './Pages/Watchlist/WatchlistShowPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/stockinfo/:stockCode",
        element: <StockInfo />,
      },
      {
        path: "/watchlists/:watchlistId",
        element: <WatchlistShowPage />,
      },
    ],
  },
]);
