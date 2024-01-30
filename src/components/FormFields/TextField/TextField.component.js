import React, {useCallback, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const CustomTextField = ({isError, errorText, icon, label, onChange, onTextChange, inputProps, style,...rest }) => {

    const handleChange = useCallback((e) => {
        onChange && onChange(e);
        onTextChange && onTextChange(e.target.value);
    }, [onChange, onTextChange]);

   return (
       <TextField
           error={isError}
           helperText={errorText}
           label={label}
           InputProps={{
               startAdornment: icon ? (
                   <InputAdornment position="start">
                       {icon ? <img className={'fieldIcon'} src={icon}/> : '' }
                   </InputAdornment>
               ):'',
               ...(inputProps ? inputProps : {})
           }}
           onChange={handleChange}
           variant={'outlined'}
           margin={"dense"}
           fullWidth={true}
           style={style}
           {...rest}
       />
   )
}

export default CustomTextField;
