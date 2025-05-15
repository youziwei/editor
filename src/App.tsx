import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router/index";
import "./image/iconfont/iconfont.css";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}

export default App;
