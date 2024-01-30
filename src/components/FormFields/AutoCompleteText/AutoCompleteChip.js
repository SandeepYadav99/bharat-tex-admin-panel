import React, {useState} from 'react';
import {Autocomplete} from "@material-ui/lab";
import {Chip, TextField} from "@material-ui/core";
import LogUtils from "../../../libs/LogUtils";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    chip: {
        height: '24px'
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));

const AutoCompleteChip = ({value, isError, dataset, errorText, label, handleChange}) => {
    const classes = useStyles();
    // const [keywords, setKeywords] = useState([]);

    const handleChangeKeywords = (event, valuePr) => {
        const keywords = value;
        const tempKeywords = valuePr.filter((val, index) => {
            if (val.trim() === '' || !/^[a-zA-Z0-9]*$/.test(val.trim())) {
                return false;
            }
            else if (val.length >= 21){
                // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Enter Characters less than 20', type: 'error'});
                return false;
            } else {
                return true;
                const key = val.trim().toLowerCase();
                const isThere = keywords.findIndex((keyTwo, indexTwo) => { return (keyTwo.toLowerCase() === key) });
                return isThere < 0;
            }
        });
        let filterdData = [];
        if (tempKeywords.length > 1) {
            tempKeywords.reverse().forEach((val, index) => {
                if (index < tempKeywords.length) {
                    let isThere = false;
                    for (let i = index + 1; i < tempKeywords.length ; i++) {
                        if (val.trim().toLowerCase() === tempKeywords[i].trim().toLowerCase()) {
                            isThere = true;
                        }
                    }
                    if (!isThere) {
                        filterdData.push(val.trim());
                    }
                }
            });
            filterdData.reverse();
        } else {
            filterdData = tempKeywords;
        }

        if (filterdData.length <= 1) {
            handleChange(filterdData);
        } else if (tempKeywords.length > 1)  {
            // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Maximum 5 Keywords ', type: 'error'});
        }
    }
    return (
        <Autocomplete
            multiple
            onChange={handleChangeKeywords}
            id="tags-filled"
            options={dataset}
            value={value}
            freeSolo
            // noOptionsText={this._renderNoText}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip classes={{root: classes.chip}} variant="outlined" label={option} {...getTagProps({ index })}/>
                ))
            }
            renderInput={(params) => (
                <TextField  fullWidth
                            error={isError}
                            helperText={errorText} label={label} margin={'dense'} {...params} variant="outlined"  placeholder={label} />
            )}
        />
    )
};

export default AutoCompleteChip;
