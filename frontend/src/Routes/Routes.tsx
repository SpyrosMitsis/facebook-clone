import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import { Login } from "../Pages";
import App from "../App";
import Home from "../Pages/Home/Home";
import Post from "../components/Feed";
import { RequireAuth } from 'react-auth-kit'


function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" /> {<Login />}
      </Routes>
    </BrowserRouter>
  );
}
