import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import cx from "classnames";
import clsx from 'clsx';
import {
    withStyles,
    Drawer,
    SwipeableDrawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import sidebarStyle from "../../assets/jss/material-dashboard-react/sidebarStyle.jsx";
import logoImg from "../../assets/img/Bharat_tax_logo.png"


class CustomListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    _renderLinks() {

    }

    _renderNavLink(prop, nested) {
        const {classes, color, key, activeRoute} = this.props;
        const listItemClasses = cx({
            [" " + classes[color]]: activeRoute(prop.path, prop),
            [" " + classes['nested']]: nested
        });
        const whiteFontClasses = cx({
            [" " + classes.whiteFont]: activeRoute(prop.path, prop)
        });
        return (
            <NavLink
                to={prop?.is_external ? {pathname: prop.path} : prop.path}
                className={classes.item}
                activeClassName="active"
                target={prop?.is_external ? '_blank' : '_self'}
                // key={key}
            >
                <ListItem button className={classes.itemLink + listItemClasses}>
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                        <prop.icon className={classes.sidebarIcon}/>
                    </ListItemIcon>
                    <ListItemText
                        primary={prop.sidebarName}
                        className={classes.itemText + whiteFontClasses}
                        disableTypography={true}
                    />
                </ListItem>
            </NavLink>
        );
    }


    _renderNestedLinks(slug, nested=false) {
        const { routes } = this.props;
        const links = [];
        routes.forEach((val, index) => {
            if (val.parent == slug && val.is_sidebar) {
                links.push(this._renderNavLink(val, nested));
            }
        });
        return links;
    }

    render() {
        const {prop, classes, color, key, activeRoute} = this.props;
        if (!prop.is_sidebar) return null;
        if (prop.redirect) return null;
        if (!prop.parent && !prop.is_parent) {
            return (
                <>
                    {this._renderNavLink(prop)}
                </>
            )
        } else if (prop.is_parent) {
            const listItemClasses = cx({
                [" " + classes[color]]: activeRoute(prop.path, prop)
            });
            const whiteFontClasses = cx({
                [" " + classes.whiteFont]: activeRoute(prop.path, prop)
            });
            return (
                <>
                    <ListItem button className={classes.itemLink + listItemClasses} onClick={this._handleClick}>
                        <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                            <prop.icon className={classes.sidebarIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={prop.sidebarName}
                            className={classes.itemText + whiteFontClasses}
                            disableTypography={true}
                        />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this._renderNestedLinks(prop.slug, true)}
                        </List>
                    </Collapse>
                </>
            );
        }
        return null;
    }
}

class CustomLink extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderLinks() {
        const {routes, classes, color, activeRoute} = this.props;
        const links = [];
        routes.forEach((prop, key) => {
            links.push(<CustomListItem routes={routes} key={key} prop={prop} classes={classes} activeRoute={activeRoute}
                                       color={color}/>);
        });
        return links;
    }

    render() {
        const {routes, classes} = this.props;
        return (
            <List className={classes.list}>
                {this._renderLinks()}
            </List>
        )
    }
}

const Sidebar = ({...props}) => {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName, otherData) {
        if (!otherData.should_regex) {
            return routeName == props.location.pathname;
        }
        return routeName == props.location.pathname || props.location.pathname.indexOf(routeName) > -1 ? true : false ;
        // return props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    const {classes, color, logo, image, logoText, routes} = props;
    var brand = (
        <div className={classes.logo}>
            <div className={classes.logoImage}>
                <img src={logoImg} alt="logo" className={classes.img}/>
            </div>
            {logoText}
        </div>
    );
    return (
        <div>
            <Hidden mdUp>
                <Drawer
                    variant="permanent"
                    // anchor="right"
                    open={props.open}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: props.open,
                        [classes.drawerClose]: !props.open,
                    })}
                    classes={{
                        // paper: classes.drawerPaper
                        paper: clsx({
                            [classes.drawerOpen]: props.open,
                            [classes.drawerClose]: !props.open,
                        }),
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {/*<HeaderLinks />*/}
                        <CustomLink routes={routes} classes={classes} color={color} activeRoute={activeRoute}/>
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    // anchor="left"
                    variant="permanent"
                    open={props.open}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: props.open,
                        [classes.drawerClose]: !props.open,
                    })}
                    classes={{
                        // paper: classes.drawerPaper
                        paper: clsx({
                            [classes.drawerOpen]: props.open,
                            [classes.drawerClose]: !props.open,
                        }),
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        <CustomLink routes={routes} classes={classes} color={color} activeRoute={activeRoute}/>
                    </div>
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
