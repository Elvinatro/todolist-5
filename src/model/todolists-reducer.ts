import {FilterValues, TodoListType} from "../AppWithReducers.tsx";

export type removeTodoActionType = ReturnType<typeof removeTodoAC>
export type addTodoActionType = ReturnType<typeof addTodoAC>
export type changeTodoFilterActionType = ReturnType<typeof changeTodoFilterAC>
export type editTodoTitleActionType = ReturnType<typeof editTodoTitleAC>

export type ActionType = removeTodoActionType | addTodoActionType | changeTodoFilterActionType | editTodoTitleActionType

export const todoListsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODO':
            return state.filter(f => f.tdId !== action.payload.tdId)
        case 'ADD_TODO':
            return [{tdId: action.payload.tdId, title: action.payload.value, filter: "All" as FilterValues}, ...state]
        case 'CHANGE_TODO_FILTER':
            return state.map(m => m.tdId === action.payload.tdId ? {...m, filter: action.payload.filter} : m)
        case 'EDIT_TODO_TITLE':
            return state.map(m => m.tdId === action.payload.tdId ? {...m, title: action.payload.value} : m)
        default:
            return state
    }
}

export const removeTodoAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODO',
        payload: {
            tdId: todoListId
        }
    } as const
}
export const addTodoAC = (todoListId: string, value: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            tdId: todoListId,
            value
        }
    } as const
}
export const changeTodoFilterAC = (todoListId: string, filter: FilterValues) => {
    return {
        type: 'CHANGE_TODO_FILTER',
        payload: {
            tdId: todoListId,
            filter
        }
    } as const
}
export const editTodoTitleAC = (todoListId: string, value: string) => {
    return {
        type: 'EDIT_TODO_TITLE',
        payload: {
            tdId: todoListId,
            value
        }
    } as const
}