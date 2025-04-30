import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router/index";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}

export default App;
