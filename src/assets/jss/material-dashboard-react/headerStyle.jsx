// ##############################
// // // Header styles
// #############################

import {
    container,
    defaultFont,
    primaryColor,
    defaultBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    sidebarColor,
    textColor
} from "../material-dashboard-react.jsx";

const headerStyle = theme => ({
    appBar: {
        // backgroundColor: "transparent",
        // boxShadow: "none",
        // borderBottom: "0",
        // marginBottom: "0",
        // position: "absolute",
        // width: "100%",
        // paddingTop: "10px",
        // zIndex: "1029",
        // color: "#555555",
        // border: "0",
        // borderRadius: "3px",
        // padding: "10px 0",
        // transition: "all 150ms ease 0s",
        // minHeight: "50px",
        display: "block",
        //   position: 'fixed',
        //   top: 0,
        overflow: 'hidden',
        maxHeight: 57,
        backgroundColor: sidebarColor,
        color: textColor,
        boxShadow: '0px 20px 80px #00000011'
    },
    container: {
        ...container,
        minHeight: "50px",
        display: 'flex'
    },
    flexGrow: {
        flexGrow: 1,
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        "&:hover,&:focus": {
            background: "transparent"
        }
    },
    innercontent: {
        padding: '10px 15px'
    },
    logoImage: {
      marginLeft:'12px',
    },
    appResponsive: {
        top: "8px"
    },
    primary: {
        backgroundColor: primaryColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    info: {
        backgroundColor: infoColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    success: {
        backgroundColor: successColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    warning: {
        backgroundColor: warningColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    danger: {
        backgroundColor: dangerColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    }
});

export default headerStyle;
