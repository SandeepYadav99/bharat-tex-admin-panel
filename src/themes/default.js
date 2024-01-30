import tinycolor from "tinycolor2";

const primary = "#E56056 ";
const secondary = "#AB183D";
const bgcolors = '#ffffff';
const textColor = "#000000";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";
const button = "#2196F3";
const tableCell = 'rgb(39, 43, 65)'
const error = '#FF0000';

const lightenRate = 7.5;
const darkenRate = 15;

export default {
    palette: {
        primary: {
            main: primary,
            light: tinycolor(primary)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(primary)
                .darken(darkenRate)
                .toHexString()
        },
        error: {
            main: error,
            light: tinycolor(error)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(error)
                .darken(darkenRate)
                .toHexString()
        },
        bgColor: {
            main: bgcolors,
            light: tinycolor(bgcolors)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(bgcolors)
                .darken(darkenRate)
                .toHexString()
        },
        textColor: textColor,
        secondary: {
            main: secondary,
            light: tinycolor(secondary)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(secondary)
                .darken(darkenRate)
                .toHexString(),
            contrastText: "#FFFFFF"
        },
        warning: {
            main: warning,
            light: tinycolor(warning)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(warning)
                .darken(darkenRate)
                .toHexString()
        },
        success: {
            main: success,
            light: tinycolor(success)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(success)
                .darken(darkenRate)
                .toHexString()
        },
        info: {
            main: info,
            light: tinycolor(info)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(info)
                .darken(darkenRate)
                .toHexString()
        },
        button: {
            main: button,
            light: tinycolor(button)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(button)
                .darken(darkenRate)
                .toHexString()
        },
        text: {
            primary: "#4A4A4A",
            secondary: "#6E6E6E",
            hint: "#B9B9B9"
        },
        background: {
            default: "#F6F7FF",
            light: "#F3F5FF"
        }
    },
    customShadows: {
        widget:
            "0px 1px 2px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        widgetDark:
            "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        widgetWide:
            "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A"
    },
    overrides: {
        MuiPaper: {
            root: {
                color: textColor,
            },
            rounded: {
                borderRadius: '16px'
            }
        },
        // MuiPaper: {
        //     rounded: {
        //         borderRadius: '16px'
        //     }
        // },
        MuiTablePagination: {
            root: {
                color: textColor,
            }
        },
        MuiTabs: {
            root: {
                paddingLeft: '25px'
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "#4A4A4A1A"
            }
        },
        MuiMenu: {
            paper: {
                boxShadow:
                    "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A"
            }
        },
        MuiSelect: {
            // select: {
            //   minWidth: '80px',
            // },
            icon: {
                color: "#B9B9B9",
            },
            label: {
                backgroundColor: 'white'
            }
        },
        MuiFormHelperText: {
            root: {
                margin: '0px',
                fontSize: '0.60rem'
            },
            contained: {
                margin: '0px',
                marginLeft: '5px',
                position: 'absolute',
                bottom: '-15px',
                right: '0px',
                marginRight: '0px',
                fontWeight: '500',
                fontSize: '0.68rem'
            },
        },
        MuiFormLabel: {
            root: {
                color: textColor,
            },
            filled: {
                backgroundColor: bgcolors
            }
        },
        MuiListItem: {
            button: {
                // '&:hover, &:focus': {
                //   backgroundColor: '#F3F5FF',
                // },
            },
            selected: {
                // backgroundColor: '#F3F5FF !important',
                // '&:focus': {
                //     backgroundColor: '#F3F5FF',
                // },
            }
        },
        MuiTouchRipple: {
            child: {
                backgroundColor: "white"
            }
        },
        MuiTableRow: {
            root: {
                height: 40,
            }
        },
        MuiButton: {
            root: {
                color: textColor,
            },
            containedPrimary: {
                color: bgcolors
            }
        },
        // MuiInputBase: {
        //     root: {
        //         border: '1px solid '+textColor,
        //         color: textColor,
        //     },
        //     selected: {
        //         border: 'none',
        //         '&:focus': {
        //             border: 'none',
        //         },
        //     }
        // },
        MuiTypography: {
            colorTextSecondary: {
                color: textColor
            }
        },
        MuiTableCell: {
            root: {
                padding: '10px',
                borderBottom: '1px solid rgba(224, 224, 224, .3)',
                // fontWeight: '600',
                fontFamily: ' \'Montserrat\', sans-serif',
                fontSize: '14px',
                // color: 'black !important'
                // borderBottom: '1px solid rgba(224, 224, 224, .5)',
            },
            head: {
                fontSize: '0.7rem',
                padding: '15px 10px',
                background: '#FEECED',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                lineHeight: '1rem',
                '&:first-child': {
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                },
                '&:last-child': {
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                }
            },
            body: {
                fontSize: '0.8rem',
                padding: '14px 10px',
                color: tableCell
            }
        }
    }
};
