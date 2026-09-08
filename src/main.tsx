import {createRoot} from 'react-dom/client'
import './index.css'
import {AppWithReducers} from "./AppWithReducers.tsx";

createRoot(document.getElementById('root')!).render(<AppWithReducers/>)
