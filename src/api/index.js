import {
    postUserSignUp,
    postUserSignIn,
    deleteUserSignOut
} from './users';

import {
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
    patchTodo
} from './todos';

export const apiPostUserSignUp = postUserSignUp;
export const apiPostUserSignIn = postUserSignIn;
export const apiDeleteUserSignOut = deleteUserSignOut;

export const apiGetTodos = getTodos;
export const apiPostTodo = postTodo;
export const apiPutTodo = putTodo;
export const apiDeleteTodo = deleteTodo;
export const apiPatchTodo = patchTodo;
