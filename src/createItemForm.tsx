import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type CreateItemFormProps = {
    onClick: (value: string) => void
}

export const CreateItemForm = ({onClick}: CreateItemFormProps) => {
    const [currentTitle, setCurrentTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        if (currentTitle.trim() !== '') {
            onClick(currentTitle.trim())
            setCurrentTitle('')
        } else {
            setError('Title is required'!)
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const BtnStyle = {
        maxWidth: '40px',
        maxHeight: '40px',
        minHeight: '40px',
        minWidth: '40px'
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Text here..."
                variant="outlined"
                value={currentTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                size={"small"}
            />


            <Button onClick={createTaskHandler} variant="contained" style={BtnStyle}>
                +
            </Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};