import {useState, type ChangeEvent} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanProps = {
    title: string
    onClick: (value: string) => void
}

export const EditableSpan = ({title, onClick}: EditableSpanProps) => {
    const [currentTitle, setCurrentTitle] = useState<string>(title)
    const [edit, setEdit] = useState(false)

    const showEdit = () => {
        setEdit(true)
    }

    const closeEdit = () => {
        setEdit(false)
        onClick(currentTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }
    return (
        edit
            ?
            <TextField
                variant="standard"
                value={currentTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={closeEdit}
            />
            :
            <span onClick={showEdit}>{title}</span>
    )
        ;
};