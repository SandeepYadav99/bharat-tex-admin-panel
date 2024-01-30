import React from "react";
import PropTypes from "prop-types";
import {Menu as MenuIcon, MoreVert as OptionIcon} from "@material-ui/icons";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {
    withStyles,
    AppBar,
    Toolbar,
    IconButton,
    Hidden,
    Button,
    Menu,
    MenuItem,
    Switch
} from "@material-ui/core";
import cx from "classnames";

import headerStyle from "../../assets/jss/material-dashboard-react/headerStyle.jsx";
import {actionLogoutUser} from "../../actions/auth_index.action";
import { actionChangeTheme } from '../../actions/AppSettings.action';
import CredaiLogo from "../../assets/img/CredaiCommonLogo.png"
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
// import HeaderLinks from "./HeaderLinks";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            dark:false,
            note: null
        };
        this._handleClick = this._handleClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
        this._handleChangeTheme = this._handleChangeTheme.bind(this);
        this._handleNotification = this._handleNotification.bind(this);
        this._handleNoteClose = this._handleNoteClose.bind(this);
        this._handleResetPassword = this._handleResetPassword.bind(this);
    }
    activeRoute = (routeName, otherData) => {
        if (!otherData.should_regex) {
            return routeName == this.props.location.pathname;
        }
        return routeName == this.props.location.pathname || this.props.location.pathname.indexOf(routeName) > -1 ? true : false ;
        // return props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
    makeBrand() {
        var name = '';
        this.props.routes.map((prop, key) => {
            if (this.activeRoute(prop.path, prop)) {
                name = prop.navbarName;
            }
            return null;
        });
        return name;
    }


    _handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    _handleNotification = event => {
        this.setState({note: event.currentTarget});
    };

    _handleClose = () => {
        this.setState({anchorEl: null});
    };
    _handleNoteClose = () => {
        this.setState({note: null});
    }
    _handleLogout() {
        this.props.actionLogoutUser();
        this.setState({anchorEl: null});
    }

    _handleChangeTheme(){
        const { themeType } = this.props;
        this.props.actionChangeTheme(themeType == 'dark' ? 'light' : 'dark');
    }

    _handleResetPassword() {
        historyUtils.push(RouteName.RESET_PASSWORD_FIRST);
        this.setState({anchorEl: null});
    }

    render() {
        const {classes, color, themeType, userData} = this.props;
        const { anchorEl ,note} = this.state;
        const appBarClasses = cx({
            [" " + classes[color]]: color
        });

        const palletType = this.state.dark ? "dark" : "light";
        const mainPrimaryColor = this.state.dark ? '' : '';
        const mainSecondaryColor = this.state.dark ? '' : '';

        return (
            <AppBar position={"static"} className={classes.appBar + appBarClasses}>
                <Toolbar className={classes.container}>
                    <IconButton className={classes.menuButton} onClick={this.props.handleHeaderClick} color="inherit"
                                aria-label="Menu">
                        <img src={require("../../assets/img/ic_hamburger@2x.png")} height={15}/>
                        {/*<MenuIcon className={'menuItem'}/>*/}
                    </IconButton>
                    <Button href="#" className={classes.title}>
                        {/*{this.makeBrand()}*/}
                    </Button>

                    <div className={classes.flexGrow}>
                        {/*<Switch checked={themeType == 'dark'} onChange={this._handleChangeTheme}/>*/}
                    </div>
                    <div>
                        {/*<IconButton aria-label="show 3 new notifications" color="inherit" onClick={this._handleNotification}>*/}
                        {/*    <Badge badgeContent={0} color="secondary">*/}
                        {/*        <NotificationsIcon />*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        <Popover
                            // id={id}
                            open={Boolean(note)}
                            anchorEl={note}
                            onClose={this._handleNoteClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                        >
                            <div className={classes.innercontent}>James sent you a message</div>
                        </Popover>
                    </div>

                    <div className={classes.logoImage}>
                        <img src={CredaiLogo} height={30} width={30} style={{borderRadius:"50%"}}/>    
                    </div>

                    <div>
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this._handleClick}
                            style={{ color: 'black' }}
                        >
                            <OptionIcon/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this._handleClose}
                        >
                            {/*<MenuItem onClick={this._handleClose}>Profile</MenuItem>*/}
                            <MenuItem onClick={this._handleResetPassword}>Reset Password</MenuItem>
                            <MenuItem onClick={this._handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    {/*<IconButton*/}
                    {/*className={classes.appResponsive}*/}
                    {/*color="inherit"*/}
                    {/*aria-label="open drawer"*/}
                    {/*onClick={props.handleDrawerToggle}*/}
                    {/*>*/}
                    {/*<Menu />*/}
                    {/*</IconButton>*/}
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

const temp = withStyles(headerStyle)(Header);

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        actionLogoutUser: actionLogoutUser,
        actionChangeTheme: actionChangeTheme,
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        themeType: state.app_setting.theme,
        userData: state?.auth?.user
    }
}

export  default  connect(mapStateToProps, mapDispatchToProps)(temp);
