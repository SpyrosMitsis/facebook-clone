import React from "react";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from 'react-auth-kit'
import App from "./App";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

