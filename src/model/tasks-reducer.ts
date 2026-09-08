import {TaskStateType} from "../AppWithReducers.tsx";
import {addTodoActionType, removeTodoActionType} from "./todolists-reducer.ts";

export type DeleteTasksActionType = ReturnType<typeof deleteTasksAC>
export type CreateTasksActionType = ReturnType<typeof createTasksAC>
export type ChangeTasksStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type EditTaskSpanActionType = ReturnType<typeof editTaskSpanAC>

export type ActionType =
    DeleteTasksActionType
    | CreateTasksActionType
    | ChangeTasksStatusActionType
    | EditTaskSpanActionType
    | removeTodoActionType
    | addTodoActionType


export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'DELETE_TASKS':
            return {
                ...state,
                [action.payload.tdId]: state[action.payload.tdId].filter(f => f.id !== action.payload.taskId)
            }
        case 'CREATE_TASK':
            return {
                ...state, [action.payload.tdId]: [{id: action.payload.tdId, title: action.payload.title, isDone: false},
                    ...state[action.payload.tdId]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.payload.tdId]: state[action.payload.tdId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        case 'EDIT_TASK_SPAN':
            return {
                ...state,
                [action.payload.tdId]: state[action.payload.tdId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    title: action.payload.newValue
                } : m)
            }
        case 'REMOVE_TODO':
            const copyState = {...state}
            delete copyState[action.payload.tdId]
            return copyState

        case "ADD_TODO":
            return {...state, [action.payload.tdId]: []}
        default:
            return state
    }
}

export const deleteTasksAC = (todoListId: string, taskId: string) => {
    return {
        type: 'DELETE_TASKS',
        payload: {
            tdId: todoListId,
            taskId
        }
    } as const
}
export const createTasksAC = (todoListId: string, title: string) => {
    return {
        type: 'CREATE_TASK',
        payload: {
            tdId: todoListId,
            title
        }
    } as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            tdId: todoListId,
            taskId,
            isDone
        }
    } as const
}
export const editTaskSpanAC = (todoListId: string, taskId: string, newValue: string) => {
    return {
        type: 'EDIT_TASK_SPAN',
        payload: {
            tdId: todoListId,
            taskId,
            newValue
        }
    } as const
}