import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home/home.jsx";
import List from "./pages/list/List.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
