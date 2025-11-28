import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
