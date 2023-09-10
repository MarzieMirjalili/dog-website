import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { DogsList } from "./pages/dogsList/DogsList";

const querClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={querClient}>
      <DogsList />
    </QueryClientProvider>
  );
}

export default App;
