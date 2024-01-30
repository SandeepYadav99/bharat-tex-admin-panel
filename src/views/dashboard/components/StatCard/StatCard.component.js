/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Card, CardContent, Grid, Typography} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 500,
        fontSize: '14px'
    },
    avatar: {
        backgroundColor: 'black',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.error.dark
    },
    differenceValue: {
        marginRight: theme.spacing(1),
        fontWeight: 500,
    },
    cardContent: {
        paddingBottom: '10px !important'
    },
    caption: {
        fontWeight: 400,
        marginLeft: '5px',
        fontSize: '14px'
    }
}));

const Budget = props => {
    const {className, title, value, weekTitle, weekValue, icon, ...rest} = props;

    const classes = useStyles();
    const TempIcon = icon;
    return (
        <Card
            {...rest}
            className={classnames(classes.root, className)}
        >
            <CardContent className={classes.cardContent}>
                <Grid
                    container
                    justify="space-between"
                    alignItems={'center'}
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">{value}</Typography>
                        {/*<Avatar className={classes.avatar}>*/}
                        {/*    <TempIcon className={classes.icon}/>*/}
                        {/*</Avatar>*/}
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        {weekTitle}
                    </Typography>
                    <div>
                        <Typography
                            // className={classes.caption}
                            variant="h5"
                        >
                            {weekValue}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

Budget.propTypes = {
    className: PropTypes.string
};

export default Budget;
