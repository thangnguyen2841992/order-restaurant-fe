import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActiveCode from "./layout/auth/ActiveCode";


function App() {
  return (
      <div className={'App'}>
          <BrowserRouter>
              <Routes>
                  <Route path = "/active/:userId/:activeCode" element={<ActiveCode/>}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
