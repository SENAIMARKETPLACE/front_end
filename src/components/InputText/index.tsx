import { TextField } from "@mui/material";
import React, {FC, InputHTMLAttributes} from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}


const InputText = ({label}) => {
    return (
        <TextField id="outlined-basic" label={label}  margin="dense"/>
    )

}
export default InputText


