// system libraries
import React from 'react';

// internal framework libraries
import { AppFrameProvider, AppFrame, AppModal } from './appframe.js';
import { NetAppProvider, WSConnection } from './appnetwork.js';

// application-logic libraries
import { BIPSAppProvider, BIPSAppContext } from './AppData.js';

// application-UI-pages goes here
import MainPage from './app_pages/mainPage.js';

import LandingPage, { CustomFrameHeaderLanding, Landing } from './app_pages/landingPage.js';
import PortfolioPage from './app_pages/portfolioPage.js';
import StockSummaryPage from './app_pages/stockSummary.js';
import AnalyticPage, { CustomFrameHeaderAnalytic, Analytic } from './app_pages/analyticPage';
import ChatSupportPage, { CustomFrameHeaderChatSupportPage } from './app_pages/chatsupportPage';
import LiveTradePage from './app_pages/livetradePage';
import MarketStatistikPage, { CustomFrameHeaderMarketStatistik, MarketStatistik } from './app_pages/marketstatistikPage';
import StockPage, { CustomFrameHeaderStock, Stock } from './app_pages/stockPage';
import { Trade, CustomFrameHeaderTrade } from './app_pages/tradePage';

class App extends React.Component {
  /*
    Important system components:

    WSConnection: web socket connection
  */

  render() {
    return (
      <AppFrameProvider
        initialClasses={{ Landing, MarketStatistik, Stock, Trade, ChatSupportPage, LiveTradePage, Analytic }}
        initialFrames={
          [
            { className: 'Landing', title: <CustomFrameHeaderLanding />, instanceName: 'landingPage' },
            { className: 'MarketStatistik', title: <CustomFrameHeaderMarketStatistik />, instanceName: 'marketstatistikPage' },
            { className: 'Stock', title: <CustomFrameHeaderStock />, instanceName: 'stockPage' },
            { className: 'Trade', title: <CustomFrameHeaderTrade />, instanceName: 'tradePage' },
            { className: 'Analytic', title: <CustomFrameHeaderAnalytic />, instanceName: 'analyticPage' },
            { className: 'LiveTradePage', title: '', instanceName: 'livetradePage' },
            { className: 'ChatSupportPage', title: <CustomFrameHeaderChatSupportPage />, instanceName: 'chatsupportPage' },
          ]
        }
        initActions={[
          ['switchPage', { instanceName: 'stockSummaryPage' }],
        ]}
      >
        {
          /*
          Remember that internal-framework Providers (like NetAppProvider) must be put FIRST before
          application-level Providers because the application-level providers may subscribe to the context of
          internal-framework Providers
          */
        }
        <NetAppProvider>
          <BIPSAppProvider>
            {/*<WSConnection />*/}
            <MainPage />
          </BIPSAppProvider>
        </NetAppProvider>
      </AppFrameProvider>
    )
  }
}

export default App;
