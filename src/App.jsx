import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Amparo from "./pages/Amparo";
import SeleccionPatologia from "./pages/SeleccionPatologia";
import Cobertura from "./pages/Cobertura";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cobertura" element={<SeleccionPatologia />} />
          <Route path="cobertura/:patologiaId" element={<Cobertura />} />
          <Route path="amparo" element={<Amparo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
