import { TextField } from "@mui/material";

interface InputTextProps {
    label: string
}

export default function InputText  ({label}) {
    return (
        <TextField id="outlined-basic" label={label} variant="outlined" />
    )
}
