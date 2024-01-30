import React, {useMemo, useRef, useEffect, useState} from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import SelectField from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import LogUtils from "../../../libs/LogUtils";

const CustomSelectField = ({ isError, errorText, label, handleChange, icon, children, ...rest}) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabelRef = useRef(null);


    const id = useMemo(() => {
        return Date.now()+'SELECTED_LABEL'+label;
    }, [label]);

    const handleChangeLocal = (event) => {
        const {
            target: { value },
        } = event;
        handleChange(value);
    };

    return (
        <FormControl fullWidth margin={'dense'} variant={'outlined'} error={isError}>
            <InputLabel
                ref={inputLabelRef}
                htmlFor={`selectField${id}`}
            >
                {label}
            </InputLabel>
            <div style={{position: 'relative', display: 'inline-block'}}>

                <SelectField
                    name={label}
                    {...rest}
                    input={
                        <OutlinedInput
                            margin={'dense'}
                            fullWidth
                            // labelWidth={labelWidth}
                            id={`selectField${id}`}
                        />
                    }
                    onChange={(e) => { handleChangeLocal && handleChangeLocal(e); }}
                >
                    {children}
                </SelectField>
            </div>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
}

export default CustomSelectField;
