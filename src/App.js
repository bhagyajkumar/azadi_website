
import Header from "./components/Header";
import Modals from "./components/Modals";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/upload" element={ <UploadPage /> }/>
      </Routes>
      
      <Modals />
    </div>
  );
}

export default App;
