import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { AuthContext } from "./components/Context";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";
import CheckToken from "./components/CheckToken";
import ProtectRoute from "./components/ProtectRoute";
import { usersRequestInstance } from './api/users';

function App() {
    const [ token, setToken ] = useState("");
    const [ nickname, setNickname ] = useState("");

    useEffect(() => {
        usersRequestInstance.defaults.headers.common["Authorization"] = token;
    }, [token]);

    return (
        <>
            <AuthContext.Provider value={{ token, setToken }}>
                <Routes>
                    <Route path="/" element={<CheckToken />}>
                        <Route index element={<TodoList nickname={nickname} />} />
                    </Route>
                    <Route path="sign-in" element={<ProtectRoute />}>
                        <Route index element={<SignIn setNickname={setNickname} />} />
                    </Route>
                    <Route path="sign-up" element={<ProtectRoute />}>
                        <Route index element={<SignUp />} />
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </>
    )
}

export default App;
