import React, {useMemo} from 'react';
import {Chip, FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LogUtils from "../../../libs/LogUtils";

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const CustomSelect = ({isError, errorText, label, value, handleChange, icon, children, ...rest}) => {

    const handleChangeLocal = (event) => {
        LogUtils.log('event', event);
        const {
            target: { value },
        } = event;
        LogUtils.log(value);
        handleChange(event.target.value);
    };

    const id = useMemo(() => {
        return Date.now();
    }, [label]);

    const handleChangeMultiple = (event) => {
        const {options} = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        LogUtils.log('value', value);
        // setPersonName(value);
    };

    return (
        <FormControl fullWidth margin={'dense'} variant={'outlined'} error={isError}>
            <InputLabel  htmlFor={`selectField${id}`} id="demo-mutiple-chip-label">{label}</InputLabel>
            <div style={{position: 'relative', display: 'inline-block'}}>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={value}
                    onChange={handleChangeLocal}
                    input={<OutlinedInput
                        margin={'dense'}
                        fullWidth
                        // labelWidth={labelWidth}
                        id={`selectField${id}`}
                    />}
                    // renderValue={(selected) => (
                    //     <div className={classes.chips}>
                    //         {selected.map((value) => (
                    //             <Chip key={value} label={value} className={classes.chip}/>
                    //         ))}
                    //     </div>
                    // )}
                    MenuProps={MenuProps}
                    {...rest}
                >
                    {children}
                </Select>
            </div>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
};

export default CustomSelect;
