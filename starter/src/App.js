import "./App.css";
import { MainPage } from "./components/MainPage"
import { SearchPage } from "./components/SearchPage"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
       <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/main" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
       </Routes>

    </div>
  );
}

export default App;
