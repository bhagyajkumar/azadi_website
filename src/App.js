
import Header from "./components/Header";
import Modals from "./components/Modals";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      
      <Modals />
    </div>
  );
}

export default App;
