import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import FCMProvider from "./context/FCMContext";

const App = () => {
  return (
    <FCMProvider>
      <RouterProvider router={router} />
    </FCMProvider>
  );
};

export default App;
