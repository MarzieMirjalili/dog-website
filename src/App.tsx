import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DogsList } from "./pages/dogsList/DogsList";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<DogsList />} />
      </Route>
    </Routes>
  );
}

export default App;
