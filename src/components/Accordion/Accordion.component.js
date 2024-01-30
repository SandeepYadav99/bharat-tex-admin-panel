/**
 * Created by charnjeetelectrovese@gmail.com on 5/27/2020.
 */
import React, { Component } from "react";
import { IconButton, Paper, withStyles } from "@material-ui/core";
import styles from "./Style.module.css";
import classNames from "classnames";
import {
  Edit,
  KeyboardArrowRight as DownIcon,
  KeyboardArrowUp as UpIcon,
} from "@material-ui/icons";

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      expand: true,
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleExpand = this._handleExpand.bind(this);
  }

  componentDidMount() {
    if (this.props.initial) {
      this.setState({
        open: false,
      });
    } else {
      this.setState({
        open: true,
      });
    }
  }

  _handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  _handleExpand() {
    this.setState({
      expand: !this.state.expand,
    });
  }

  _handleLowerView() {
    const { onEditClick, quesIndex } = this.props;
    if (this.props.newValue) {
      return (
        <div>
          <div
            onClick={this._handleExpand}
            className={classNames(
              styles.innerPanel,
              this.state.open ? styles.panelOpen : styles.panelClose
            )}
          >
            <span className={styles.titleBlue}>{this.props.newValue}</span>
            <span className={styles.iconContainerBelow}>
              {!this.state.expand ? <DownIcon /> : <UpIcon />}
            </span>
          </div>
          <div
            className={classNames(
              styles.panelCollapse,
              this.state.expand ? styles.panelOpen : styles.panelClose
            )}
          >
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div className={classNames(styles.panelGroup)}>
          <div className={classNames(styles.panelHeader)}>
            <span className={styles.title}>{this.props.title}</span>
            <div className={classNames(styles.editFlex, "editAccordion")}>
              <span
                className={styles.iconContainer}
                onClick={this._handleClick}
              >
                {!this.state.open ? <DownIcon /> : <UpIcon />}
              </span>
              {this?.props?.isDrishtipage ? (
                <></>
              ) : (
                <IconButton
                  onClick={() => {
                    onEditClick && onEditClick(quesIndex);
                  }}
                >
                  <Edit color={"primary"} fontSize={"small"} />
                </IconButton>
              )}
            </div>
          </div>
          <div
            className={classNames(
              this.state.open ? styles.panelOpen : styles.panelClose
            )}
          >
            <div
              className={classNames(
                styles.panelCollapse,
                this.state.expand ? styles.panelOpen : styles.panelClose
              )}
            >
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return <div>{this._handleLowerView()}</div>;
  }
}

const useStyles = (theme) => ({
  highlightColor: {
    borderColor: theme.highlightColor,
  },
});

export default withStyles(useStyles)(Collapse);
