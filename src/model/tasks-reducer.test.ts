import {beforeEach, expect, test} from 'vitest'
import {v1} from "uuid";
import {TaskStateType} from "../AppWithReducers.tsx";
import {changeTaskStatusAC, createTasksAC, deleteTasksAC, editTaskSpanAC, tasksReducer} from "./tasks-reducer.ts";

let todoListId1 = v1()
let todoListId2 = v1()
let initialState: TaskStateType = {}

beforeEach(() => {
    initialState = {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'Material UI', isDone: true},
        ]
    }
})

test('check to delete tasks', () => {
    const endState = tasksReducer(initialState, deleteTasksAC(todoListId1, initialState[todoListId1][0].id))
    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId1][0].title).toBe("JS")
})
test('check to create tasks', () => {
    const endState = tasksReducer(initialState, createTasksAC(todoListId2, "New Todo"))
    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][0].title).toBe("New Todo")
})
test('check to change task Status', () => {
    const endState = tasksReducer(initialState, changeTaskStatusAC(todoListId2, initialState[todoListId2][0].id, false))
    expect(endState[todoListId2][0].isDone).toBe(false)
})
test('check to edit task span', () => {
    const endState = tasksReducer(initialState,
        editTaskSpanAC(todoListId2, initialState[todoListId2][0].id, "New Title"))
    expect(endState[todoListId2][0].title).toBe("New Title")
})