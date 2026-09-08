import {type ChangeEvent} from 'react'
import type {FilterValues, Task} from './AppWithReducers.tsx'
import Button from '@mui/material/Button';
import "./App.css"
import {CreateItemForm} from "./createItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (todoListId: string, taskId: string) => void
    changeTodoFilter: (todoListId: string, filter: FilterValues) => void
    createTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValues
    tdId: string
    removeTodoList: (tdId: string) => void
    EditTaskSpan: (todoListId: string, taskId: string, value: string) => void
    editTodoTitle: (todoListId: string, value: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        title,
        tasks,
        deleteTask,
        changeTodoFilter,
        createTask,
        changeTaskStatus,
        filter,
        tdId,
        removeTodoList,
        EditTaskSpan,
        editTodoTitle
    } = props

    const changeTodoFilterHandler = (value: FilterValues) => {
        changeTodoFilter(tdId, value)
    }

    const addTaskHandler = (value: string) => {
        createTask(tdId, value)
    }

    const editTodoTitleHandler = (value: string) => {
        editTodoTitle(tdId, value)
    }

    return (
        <div>
            <div className={"titleBox"}>
                <h3>
                    <EditableSpan title={title} onClick={editTodoTitleHandler}/>
                </h3>
                <IconButton onClick={() => removeTodoList(tdId)}>
                    <Delete/>
                </IconButton>
            </div>

            <CreateItemForm onClick={addTaskHandler}/>

            {tasks.length === 0 ? (
                <p style={{margin: "20px 0"}}>No Tasks</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(tdId, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(tdId, task.id, newStatusValue)
                        }
                        const onChangeTaskTitle = (title: string) => {
                            EditTaskSpan(tdId, task.id, title)
                        }

                        return (
                            <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}
                                      style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <Checkbox checked={task.isDone}
                                              onChange={changeTaskStatusHandler}/>
                                    <EditableSpan title={task.title} onClick={onChangeTaskTitle}/>
                                </div>

                                <IconButton onClick={deleteTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Button variant={filter === 'All' ? 'contained' : 'outlined'}
                        onClick={() => changeTodoFilterHandler('All')}>All</Button>
                <Button variant={filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={() => changeTodoFilterHandler('Active')}>Active</Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={() => changeTodoFilterHandler('Completed')}>Completed</Button>
            </div>
        </div>
    )
}
