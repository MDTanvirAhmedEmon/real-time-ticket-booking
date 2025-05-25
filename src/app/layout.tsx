"use client";

import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
// import ReduxProviders from "@/utils/ReduxProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-new-gr-c-s-check-loaded="14.1235.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
        monica-id="ofpnmcalabcbjgholdjcjblkibolbppb"
        monica-version="7.9.4"
        className={``}
      >
        {/* <ReduxProviders> */}
        <Provider store={store}>
          <Header></Header>
          {children}
          <Footer></Footer>
          {/* </ReduxProviders> */}
        </Provider>
      </body>
    </html >
  );
}
