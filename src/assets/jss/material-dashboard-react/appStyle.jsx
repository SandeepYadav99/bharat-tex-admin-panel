/* eslint-disable no-tabs */
// ##############################
// // // App styles
// #############################

import { drawerWidth, transition, container } from '../material-dashboard-react';

const appStyle = theme => ({
	wrapper: {
		position: 'relative',
		top: '0',
		height: '100vh',
		overflowX: 'hidden',
		// backgroundColor: theme.palette.bgColor.main
	},
	mainPanel: {
		// [theme.breakpoints.up("md")]: {
		//   width: `calc(100% - ${drawerWidth}px)`
		// },
		overflow: 'auto',
		position: 'relative',
		float: 'right',
		...transition,
		maxHeight: '100%',
		width: '100%',
		overflowScrolling: 'touch',
	},
	appBar: {
		width: `calc(100% - ${50}px)`,
		marginLeft: 45,
		[theme.breakpoints.down("xs")]: {
		marginLeft:0,
		  width: `calc(100% - ${0}px)`
		},
		
		// transition: theme.transitions.create(['margin', 'width'], {
		//     easing: theme.transitions.easing.sharp,
		//     duration: theme.transitions.duration.leavingScreen,
		// }),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		// transition: theme.transitions.create(['margin', 'width'], {
		//     easing: theme.transitions.easing.easeOut,
		//     duration: theme.transitions.duration.enteringScreen,
		// }),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},

	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		// marginTop: '70px',
		padding: '30px 15px',
		minHeight: 'calc(100% - 123px)',
	},
	container,
	map: {
		// marginTop: '70px',
	},
});

export default appStyle;
