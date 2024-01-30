import React, {useCallback, useState} from 'react';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";


const AutoCompleteText = ({ isError, errorText, value, icon, label, onChange, onTextChange, inputProps, dataset, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = useCallback((e, value, reason) => {
        onChange && onChange(e);
        onTextChange && onTextChange(value);
        // setIsOpen(false);
    }, [onChange, onTextChange, setIsOpen]);

    return (
        <Autocomplete
            freeSolo
            autoComplete
            id="free-solo-2-demo"
            disableClearable
            value={value}
            // open={rest.value.length >= 3 &&  isOpen}
            onInputChange={handleChange}
            options={dataset}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    error={isError}
                    helperText={errorText}
                    label={label}
                    margin="dense"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search',
                    //     onFocus:() => {
                    //     setIsOpen(true)
                    // },
                    //     onBlur:() => {
                    //     setIsOpen(false)
                    // }
                    }}
                    {...rest}

                />
            )}
        />
    )
};

export default AutoCompleteText;
