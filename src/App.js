
import Header from "./components/Header";
import Modals from "./components/Modals";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadNotes from "./pages/UploadNotes";
import SearchPage from "./pages/SearchPage";
import Notes from "./pages/Notes";
import UploadQP from "./pages/UploadQP";
import QuestionPapers from "./pages/QuestionPapers";
import Signup from "./pages/Signup";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/upload" element={<UploadNotes />} />
          <Route path="/qp" element={<QuestionPapers />} />
          <Route path="/qp/upload" element={<UploadQP />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Modals />
      </SkeletonTheme>
    </div>
  );
}

export default App;
