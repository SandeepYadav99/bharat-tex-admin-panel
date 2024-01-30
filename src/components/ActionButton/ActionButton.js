import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import React from 'react'
import MuiStyle from '../../libs/MuiStyle';

const useStyle = makeStyles(MuiStyle);

const ActionButton=({children, ...rest})=> {
const classes = useStyle();
  return (
    <Button className={classes.btnAction} {...rest}>{children}</Button>
  )
}

export default ActionButton
