import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    apiDeleteUserSignOut,
    apiGetTodos,
    apiPatchTodo,
    apiPostTodo,
    apiDeleteTodo,
} from '../api/index';
import { useAuth } from './Context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function List({ status, todo, callApiGetTodos }) {
    const handleChangeCheck = (e, status) => {
        callApiPatchTodo(e.target.dataset.id, status);
    }
    const handleClickDelete = (e, status) => {
        e.preventDefault();
        callApiDeleteTodo(e.target.dataset.id, status);
    }

    async function callApiPatchTodo(id, status) {
        try {
            await apiPatchTodo(id);
            callApiGetTodos(status);
        } catch (err) {
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                }
            )
        }
    }
    async function callApiDeleteTodo(id, status) {
        try {
            await apiDeleteTodo(id);
            callApiGetTodos(status);
        } catch (err) {
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                }
            )
        }
    }

    return (
        <li>
            <label className="todoList_label">
                <input checked={ !!todo.completed_at } data-id={ todo.id } className="todoList_input" type="checkbox" onChange={(e) => handleChangeCheck(e, status)} />
                <span>{ todo.content }</span>
            </label>
            <a href="#" onClick={(e) => handleClickDelete(e, status)}>
                <i data-id={ todo.id } className="bi bi-x-lg"></i>
            </a>
        </li>
    )
}

function TodoList({ nickname }) {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [filterTodos, setFilterTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        callApiGetTodos(status);
    }, []);

    const signOut = (e) => {
        e.preventDefault();
        callApiDeleteUserSignOut();
    }

    const handleClickStatus = (e, status) => {
        e.preventDefault();
        setStatus(status);
        switch (status) {
            case 'pending':
                setFilterTodos(todos.filter((todo) => !todo.completed_at ))
                break;
            case 'completed':
                setFilterTodos(todos.filter((todo) => todo.completed_at ))
                break;
            default:
                setFilterTodos(todos);
        }
    }
    const handleInput = (e) => {
        setUserInput(e.target.value.trim());
    }
    const handleClickAdd = (e, status) => {
        e.preventDefault();
        if (!userInput) {
            MySwal.fire(
                {
                    titleText: "請輸入待辦事項",
                    icon: 'warning',
                    showConfirmButton: false,
                }
            )
            return;
        }

        const data = {
            todo: {
                content: userInput
            }
        }
        callApiPostTodo(data, status);
    }

    async function callApiDeleteUserSignOut() {
        try {
            const res = await apiDeleteUserSignOut();
            MySwal.fire(
                {
                    titleText: `${res.data.message}成功`,
                    icon: 'success',
                    showConfirmButton: false,
                }
            ).then(() => {
                setToken("");
                localStorage.removeItem("todolist_token");
                localStorage.removeItem("todolist_nickname");
                navigate('/sign-in', { replace: true });
            })
        } catch (err) {
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                }
            )
        }
    }
    async function callApiGetTodos(status) {
        try {
            const res = await apiGetTodos();
            const todos = res.data.todos;
            setTodos(todos);
            switch (status) {
                case 'pending':
                    setFilterTodos(todos.filter((todo) => !todo.completed_at ))
                    break;
                case 'completed':
                    setFilterTodos(todos.filter((todo) => todo.completed_at ))
                    break;
                default:
                    setFilterTodos(todos);
            }
        } catch (err) {
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                }
            )
        }
    }
    async function callApiPostTodo(data, status) {
        try {
            await apiPostTodo(data);
            MySwal.fire(
                {
                    titleText: "新增待辦事項成功",
                    icon: 'success',
                    showConfirmButton: false,
                }
            ).then(() => {
                setUserInput("");
                callApiGetTodos(status);
            })
        } catch (err) {
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                }
            )
        }
    }

    return (
        <div className="bg-half">
            <nav>
                <h1>
                    <Link to="/">ONLINE TODO LIST</Link>
                </h1>
                <ul>
                    <li className="todo_sm"><a href="#"><span>{ nickname } 的代辦</span></a></li>
                    <li><a href="#" onClick={signOut}>登出</a></li>
                </ul>
            </nav>
            <div className="container todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input
                            type="text"
                            placeholder="請輸入待辦事項"
                            value={userInput}
                            onInput={handleInput}
                        />
                        <a href="#" onClick={(e) => handleClickAdd(e, status)}>
                            <i className="bi bi-plus-lg"></i>
                        </a>
                    </div>
                    {todos.length === 0 &&
                        <div style={{ textAlign: "center", marginTop: 60, color: "#333333" }}>
                            <p style={{ fontSize: 22, marginBottom: 16 }}>目前尚無待辦事項</p>
                            <img src="https://i.imgur.com/iacWuS8.png" alt=""/>
                        </div>
                    }
                    {todos.length > 0 &&
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li>
                                <a
                                    href="#"
                                    className={status === 'all' ? 'active' : ''}
                                    onClick={(e) => handleClickStatus(e, "all")}
                                >全部</a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={status === 'pending' ? 'active' : ''}
                                    onClick={(e) => handleClickStatus(e, "pending")}
                                >待完成</a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={status === 'completed' ? 'active' : ''}
                                    onClick={(e) => handleClickStatus(e, "completed")}
                                >已完成</a>
                            </li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                {filterTodos.map((todo) => <List todo={todo} status={status} callApiGetTodos={callApiGetTodos} key={todo.id} />)}
                            </ul>
                            <div className="todoList_statistics">
                                <p>{
                                    status === "pending" ? todos.filter((todo) => !todo.completed_at ).length : todos.filter((todo) => todo.completed_at ).length
                                } 個<span style={status === "pending" ? { color: 'red' } : {}}>{ status === "pending" ? '待' : '已' }</span>完成項目</p>
                                <a href="#">清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;
