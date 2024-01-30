/**
 * Created by charnjeetelectrovese@gmail.com on 2/7/2020.
 */

import React, {Component, useMemo} from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    TimePicker,
    DatePicker
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import LogUtils from "../../../libs/LogUtils";
import {InputAdornment} from "@material-ui/core";
import { rest } from 'lodash';

const CustomTimePicker = ({onChange, minDate, isError, maxDate, value, label, clearable,...rest}) => {
    const handleOnChange = (e, d) => {
        // const tempDate  = new Date(e);
        // const formattedDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear();
        // console.log(formattedDate);
        onChange && onChange(e);
    }

    const mD = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 10);
        return maxDate ? maxDate : d;
    }, [maxDate]);

    if (clearable) {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    clearable
                    margin="dense"
                    variant="inline"
                    id="time-picker"
                    fullWidth
                    label={label}
                    value={value ? value : (null)}
                    onChange={handleOnChange}
                    inputVariant={'outlined'}
                    format={
                        "HH:mm"
                    }
                    error={isError ? true : false}
                    minDate={minDate}
                    maxDate={mD}
                    showTodayButton
                    {...rest}
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change time',
                    // }}
                />
            </MuiPickersUtilsProvider>
        );
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                label={label}
                value={value ? value : (new Date())}
                onChange={handleOnChange}
                inputVariant={'outlined'}
                format={
                    "HH:mm"
                }
                error={isError}
                minDate={minDate}
                maxDate={mD}
                // KeyboardButtonProps={{
                //     'aria-label': 'change time',
                // }}
            />
        </MuiPickersUtilsProvider>
    );
}

export default CustomTimePicker;
