import axios from 'axios';

const todosRequest = axios.create({
    baseURL: `${process.env.REACT_APP_ApiBaseUrl}/todos`,
    timeout: 5000,
});

export const todosRequestInstance = todosRequest;
export const getTodos = () => todosRequest.get("");
export const postTodo = (data) => todosRequest.post("", data);
export const putTodo = (id, data) => todosRequest.put(`/${id}`, data);
export const deleteTodo = (id) => todosRequest.delete(`/${id}`);
export const patchTodo = (id) => todosRequest.patch(`/${id}/toggle`);
