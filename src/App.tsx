import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActiveCode from "./layout/auth/ActiveCode";
import Register from "./layout/auth/Register";
import Login from "./layout/auth/Login";
import AdminHome from "./layout/admin/AdminHome";


function App() {
  return (
      <div className={'App'}>
          <BrowserRouter>
              <Routes>
                  <Route path = "/active/:userId/:activeCode" element={<ActiveCode/>}></Route>
                  <Route path = "/register" element={<Register/>}></Route>
                  <Route path = "/login" element={<Login/>}></Route>
                  <Route path = "/admin/home" element={<AdminHome/>}></Route>
                  <Route path = "/" element={<Login/>}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
