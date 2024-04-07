import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from './Pages/Home/HomePage';
import StockInfo from './Pages/StockInfo/StockInfo';
import WatchlistShowPage from './Pages/Watchlist/WatchlistShowPage';
import RetirementPage from './Pages/RetirementPage/RetirementPage';
import PortfoliosPage from './Pages/PortfoliosPage/PortfoliosPage';
import TransferPage from './Pages/TransferPage/TransferPage';
import StocksPage from './Pages/StocksPage/StocksPage';
import FAQPage from './Pages/FAQPage/FAQPage';
import ManagePage from './Pages/ManagePage/ManagePage';
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
      {
        path: "/retirement",
        element: <RetirementPage />,
      },
      {
        path: "/stocks",
        element: <StocksPage />,
      },
      {
        path: "/portfolios/current",
        element: <PortfoliosPage />,
      },
      {
        path: "/transfer",
        element: <TransferPage />,
      },
      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/manage",
        element: <ManagePage />,
      },
    ],
  },
]);
