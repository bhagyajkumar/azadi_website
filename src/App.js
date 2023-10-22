
import Header from "./components/Header";
import Modals from "./components/Modals";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import SearchPage from "./pages/SearchPage";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={ <Notes /> } />
        <Route path="/upload" element={ <UploadPage /> }/>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      
      <Modals />
    </div>
  );
}

export default App;
