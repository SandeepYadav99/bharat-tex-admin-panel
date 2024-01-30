import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import LogUtils from "../../../libs/LogUtils";

const useStyles = makeStyles((theme) => ({
    relative: {
      position: 'relative'
    },
    label: {
        display: 'block',
    },
    input: {
        width: 200,
    },
    listbox: {
        width: '100%',
        margin: 0,
        padding: 0,
        zIndex: 100,
        position: 'absolute',
        listStyle: 'none',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 200,
        border: '1px solid rgba(0,0,0,.25)',
        '& li': {
            padding: '5px'
        },
        '& li[data-focus="true"]': {
            backgroundColor: '#4a8df6',
            color: 'white',
            cursor: 'pointer',
        },
        '& li:active': {
            backgroundColor: '#2977f5',
            color: 'white',
        },
    },
}));


const CustomAutoComplete = ({isError, errorText, icon, label, onChange, onTextChange, inputProps, dataset, datasetKey, value, autoCompleteProps,disabledList=false, ...rest }) => {
    const classes = useStyles();
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete-demo'+Date.now(),
        options: dataset,
        value: value,
       // freeSolo: true,
        defaultValue: value,
        getOptionLabel: (option) => option,
        onChange: (event, value) => {
            onChange && onChange(event);
            onTextChange && onTextChange(value);
        },
        ...(autoCompleteProps ? autoCompleteProps : {}),
    });


    return (
        <div className={classes.relative}>
            <div {...getRootProps()}>
                <TextField
                    {...rest}
                    fullWidth
                    error={isError}
                    helperText={errorText}
                    label={label}
                    margin="dense"
                    variant="outlined"
                    // InputProps={{ ...params.InputProps, type: 'search' }}
                    {...getInputProps()}

                />
            </div>
            {(groupedOptions?.length > 0 && !disabledList ) ? (
                <ul className={classes.listbox} {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>{datasetKey ? option[datasetKey] : option }</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default CustomAutoComplete;
