import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Redirect from "./components/Redirect";

function App() {
    return (
        <>
            <div className="app">
                <Router>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/posts" element={<Redirect />} />
                    </Routes>
                    <Widgets />
                </Router>
            </div>
        </>
    );
}

export default App;
