// import './App.css'
// import {useState} from 'react'
// import {v1} from 'uuid'
// import {TodolistItem} from './TodolistItem'
// import {CreateItemForm} from "./createItemForm.tsx";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Switch from '@mui/material/Switch';
// import {ThemeProvider, createTheme} from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
//
// export type Task = {
//     id: string
//     title: string
//     isDone: boolean
// }
// export type TaskStateType = {
//     [key: string]: Task[]
// }
// export type FilterValues = 'All' | 'Active' | 'Completed'
// export type TodoListType = {
//     tdId: string,
//     title: string,
//     filter: FilterValues
// }
// type ThemeType = "dark" | "light"
//
// export const App = () => {
//     const [themeMode, changeThemeMode] = useState<ThemeType>("light")
//     const darkTheme = createTheme({
//         palette: {
//             mode: themeMode === "light" ? "light" : "dark",
//             primary: {
//                 main: '#3f50b5',
//             },
//         },
//     });
//     const changeThemeModeHandler = () => {
//         changeThemeMode(themeMode === "dark" ? "light" : "dark")
//     }
//
//     const todoListId1 = v1()
//     const todoListId2 = v1()
//
//     const [todoList, setTodoList] = useState<TodoListType[]>([
//         {tdId: todoListId1, title: "What to buy", filter: "All"},
//         {tdId: todoListId2, title: "What to learn", filter: "All"}
//     ])
//
//     const [tasks, setTasks] = useState<TaskStateType>({
//         [todoListId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//         ],
//         [todoListId2]: [
//             {id: v1(), title: 'Redux', isDone: true},
//             {id: v1(), title: 'Material UI', isDone: true},
//         ]
//     })
//
//     //--------------------------------------------------Tasks---------------------------------------------------------//
//
//     const deleteTask = (todoListId: string, taskId: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].filter(f => f.id !== taskId)})
//     }
//
//     const createTask = (todoListId: string, title: string) => {
//         const newTask = {id: v1(), title, isDone: false}
//         setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
//     }
//
//     const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
//         setTasks({
//             ...tasks, [todoListId]: tasks[todoListId].map(m => m.id === taskId ? {
//                 ...m, isDone
//             } : m)
//         })
//     }
//
//     const EditTaskSpan = (todoListId: string, taskId: string, newValue: string) => {
//         setTasks({
//             ...tasks, [todoListId]: tasks[todoListId].map(m => m.id === taskId ? {
//                 ...m, title: newValue
//             } : m)
//         })
//     }
//
//     //-----------------------------------------------TodoList---------------------------------------------------------//
//
//     const removeTodoList = (todoListId: string) => {
//         setTodoList(todoList.filter(f => f.tdId !== todoListId))
//     }
//
//     const addTodoList = (value: string) => {
//         const todoListId = v1()
//         const newTodo = {tdId: todoListId, title: value, filter: "All" as FilterValues}
//         setTodoList([newTodo, ...todoList])
//         setTasks({...tasks, [todoListId]: []})
//     }
//
//     const changeTodoFilter = (todoListId: string, filter: FilterValues) => {
//         setTodoList(todoList.map(m => m.tdId === todoListId ? {...m, filter} : m))
//     }
//
//     const editTodoTitle = (todoListId: string, value: string) => {
//         setTodoList(todoList.map(m => m.tdId === todoListId ? {...m, title: value} : m))
//     }
//
//     return (
//         <div className="app">
//             <ThemeProvider theme={darkTheme}>
//                 <CssBaseline/>
//                 <AppBar position="static">
//                     <Container fixed>
//                         <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
//                             <IconButton
//                                 size="large"
//                                 edge="start"
//                                 color="inherit"
//                                 aria-label="menu"
//                                 sx={{mr: 2}}
//                             >
//                                 <MenuIcon/>
//                             </IconButton>
//                             <div>
//                                 <Button variant={"contained"} color="primary">Login In</Button>
//                                 <Button sx={{m: "0 10px"}} variant={"contained"} color="primary">Sign In</Button>
//                                 <Button variant={"contained"} color="primary">Info</Button>
//                                 <Switch color="default" onClick={changeThemeModeHandler}/>
//                             </div>
//                         </Toolbar>
//                     </Container>
//                 </AppBar>
//
//                 <Container fixed>
//                     <Grid container sx={{m: '40px 0'}}>
//                         <CreateItemForm onClick={addTodoList}/>
//                     </Grid>
//
//                     <Grid container spacing={6}>
//                         {todoList.map(m => {
//                             let filteredTasks = tasks[m.tdId]
//                             if (m.filter === 'Active') {
//                                 filteredTasks = tasks[m.tdId].filter(task => !task.isDone)
//                             }
//                             if (m.filter === 'Completed') {
//                                 filteredTasks = tasks[m.tdId].filter(task => task.isDone)
//                             }
//                             return (
//                                 <Grid key={m.tdId}>
//                                     <Paper sx={{p: '20px'}}>
//                                         <TodolistItem
//                                             key={m.tdId}
//                                             tdId={m.tdId}
//                                             title={m.title}
//                                             tasks={filteredTasks}
//                                             deleteTask={deleteTask}
//                                             changeTodoFilter={changeTodoFilter}
//                                             createTask={createTask}
//                                             changeTaskStatus={changeTaskStatus}
//                                             filter={m.filter}
//                                             removeTodoList={removeTodoList}
//                                             EditTaskSpan={EditTaskSpan}
//                                             editTodoTitle={editTodoTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })}
//                     </Grid>
//                 </Container>
//             </ThemeProvider>
//         </div>
//     )
// }
