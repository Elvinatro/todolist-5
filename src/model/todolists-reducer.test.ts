import {beforeEach, expect, test} from 'vitest'
import {v1} from "uuid";
import {TodoListType} from "../AppWithReducers.tsx";
import {addTodoAC, changeTodoFilterAC, editTodoTitleAC, removeTodoAC, todoListsReducer} from "./todolists-reducer.ts";

let todoListId1 = v1()
let todoListId2 = v1()
let initialState: TodoListType[] = []

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    initialState = [
        {tdId: todoListId1, title: "What to buy", filter: "All"},
        {tdId: todoListId2, title: "What to learn", filter: "All"}
    ]
})

test('check to remove todo', () => {
    const endState = todoListsReducer(initialState, removeTodoAC(todoListId1))
    expect(endState.length).toBe(1)
    expect(endState[0].tdId).toBe(todoListId2)
})
test('check to add todo', () => {
    const newTodoId = v1()
    const endState = todoListsReducer(initialState, addTodoAC(newTodoId, 'New Todo'))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("New Todo")
})
test('check to change todo filter', () => {
    const endState = todoListsReducer(initialState, changeTodoFilterAC(todoListId1, "Active"))
    expect(endState[0].filter).toBe("Active")
})
test('check to edit todo title', () => {
    const endState = todoListsReducer(initialState, editTodoTitleAC(todoListId1, "New Title"))
    expect(endState[0].title).toBe("New Title")
})