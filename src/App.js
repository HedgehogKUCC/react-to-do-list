import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { AuthContext } from "./components/Context";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";
import CheckToken from "./components/CheckToken";

function App() {
    const [ token, setToken ] = useState(null);

    return (
        <>
            <AuthContext.Provider value={{ token, setToken }}>
                <Routes>
                    <Route path="/" element={<CheckToken />}>
                        <Route path="/" element={<TodoList />} />
                    </Route>
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                </Routes>
            </AuthContext.Provider>
        </>
    )
}

export default App;
