/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 2019-04-18.
 */
import React, { Component } from 'react';
// import Popover from "material-ui/Popover";
import PropTypes from 'prop-types';
// import Menu from "material-ui/Menu";
// import MenuItem from "material-ui/MenuItem";
// import IconButton from "material-ui/IconButton";
// import RaisedButton from "material-ui/RaisedButton";
// import RemoveIcon from "material-ui/svg-icons/content/remove-circle-outline";
// import {TextField} from "material-ui";

import {TextField,MenuItem,Menu,Popover,IconButton,Button,ButtonGroup,Checkbox,FormControl,InputLabel,Select} from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import {RemoveCircle} from '@material-ui/icons/RemoveCircle'
const styles = {
    questionnaireContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
    },
    floatingLabelStyle: {
        top: '30px',
        lineHeight: '0px',
        fontSize: '14px'
    },
    inputStyle: {
        height: '50px',
        marginTop: '0px'
    },
    flex1: {
        flex:1,
        margin:'0px 5px'
    }
}
class QuestionaireComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popover_open: false,
            anchorEl: null,
            applied: '',
            checked: true
        };
        this._handlePopover = this._handlePopover.bind(this);
        this._handleTouchTap = this._handleTouchTap.bind(this);
        this._addField = this._addField.bind(this);
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleRemoveField = this._handleRemoveField.bind(this);
        this._handleMenuClick = this._handleMenuClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            popover_open: true,
            anchorEl: event.currentTarget,
        });
    }

    _handlePopover() {
        this.setState({
            popover_open: false,
        });
    }

    _addField(field, type = null) {
        this.setState({
            popover_open: false,
        });
        const tempQuestionnaire = this.props.questionnaire;
        let tempQuestion = {name: '', type: '', is_mandatory: false, applies_to:''};
        if(field == 'TEXT') {
            tempQuestion = { ...tempQuestion, type: field };
        } else if(field == 'FILE') {
            tempQuestion = { ...tempQuestion, type: field };
        } else if(field == 'CHECKBOX') {
            tempQuestion = { ...tempQuestion, type: field };
        }
        tempQuestionnaire.push(tempQuestion);
        this.props.handleQuestionnaire(tempQuestionnaire);
    }

    _handleRemoveField(index) {
        const tempQuestionnaire = this.props.questionnaire;
        tempQuestionnaire.splice(index,1);
        this.props.handleQuestionnaire(tempQuestionnaire);
    }

    _handleTextChange(e, index) {
        const tempQuestionnaire = this.props.questionnaire;
        const indexData = tempQuestionnaire[index];
        indexData.name = e.target.value;
        if(e.target.value.length <= 100) {
            this.props.handleQuestionnaire(tempQuestionnaire);
        }
    }

    _handleChange(e, index){
        this.setState({
            applied: e.target.value
        })
        const tempQuestionnaire = this.props.questionnaire;
        const indexData = tempQuestionnaire[index];
        indexData.applies_to = e.target.value;
        this.props.handleQuestionnaire(tempQuestionnaire);
    }

    _handleMenuClick(e, index){
        const {checked} = this.state
        this.setState({
            checked: !this.state.checked
        }, () => {
            const tempQuestionnaire = JSON.parse(JSON.stringify(this.props.questionnaire));
            const indexData = tempQuestionnaire[index];
            indexData.is_mandatory = !this.state.checked;
            this.props.handleQuestionnaire(tempQuestionnaire);
        })
    }

    _renderQuestionnaire() {
        const { isDisabled } = this.props;
        return this.props.questionnaire.map((val, index) => {
            return (
                <div style={styles.questionnaireContainer}>
                    <div>
                        <Checkbox
                            name={'is_mandatory'}
                             checked={val.is_mandatory}
                             onChange={(e) => this._handleMenuClick(e,index)}
                        />
                    </div>
                    <div style={styles.flex1}>
                    <TextField
                        margin={'dense'}
                        onChange={(e) => {this._handleTextChange(e, index)}}
                        value={val.name}
                        fullWidth={true}
                        label={`${val.type} Field`}
                        // floatingLabelText={`${val.field} Field`}
                        name={'title'}
                        // inputStyle={styles.inputStyle}
                        className={'questionnaireStyle'}
                        variant={'outlined'}
                        disabled={isDisabled}
                        // floatingLabelStyle={styles.floatingLabelStyle}
                    />
                    </div>
                    <div style={styles.flex1}>
                        <div>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel  margin={'dense'}>Applies To</InputLabel>
                                <Select
                                    onChange={(e) => {this._handleChange(e, index)}}
                                     value={val.applies_to}
                                    fullWidth={true}
                                    // floatingLabelText="Title"
                                    name={'applies_to'}
                                    margin={'dense'}
                                    // variant={'outlined'}
                                    label={'Applies To'}
                                >
                                    <MenuItem value={'CUSTOMER'}>Customer</MenuItem>
                                    <MenuItem value={'MANUFACTURE'}>Manufacturer</MenuItem>
                                    <MenuItem value={'BOTH'}>Both</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <IconButton
                            disabled={isDisabled}
                            aria-label="X"
                            onClick={this._handleRemoveField.bind(this, index)}
                        >
                            <RemoveCircleIcon/>
                        </IconButton>
                    </div>
                </div>
            )
        });
    }
    render() {
        const {isDisabled} = this.props;
        return (
            <div>
                <div style={{}}><div>

                        {!isDisabled && (<ButtonGroup variant="contained" color="primary" aria-label="split button"><Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={this._handleTouchTap}
                        aria-controls={'split-button-menu'}
                        aria-haspopup="menu"
                    >
                        Add Form Details
                        <ArrowDropDownIcon/>
                    </Button></ButtonGroup>)}
                    {isDisabled && (<h4>Form Fields Data</h4>)}
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={this.state.popover_open}
                        onClose={this._handlePopover}
                    >
                        <MenuItem onClick={this._addField.bind(this, 'TEXT')}>Text Field</MenuItem>
                        {/*<MenuItem onClick={this._addField.bind(this, 'FILE', 'PDF')}>Enter the PDF file title</MenuItem>*/}
                        <MenuItem onClick={this._addField.bind(this, 'FILE', 'JPG')}>Picture Field</MenuItem>
                        <MenuItem onClick={this._addField.bind(this, 'CHECKBOX', 'JPG')}>Enter the checkbox file title</MenuItem>

                    </Menu>
                    {/*<Popover*/}
                        {/*open={this.state.popover_open}*/}
                        {/*anchorEl={this.state.anchorEl}*/}
                        {/*anchorOrigin={{ "horizontal":"left","vertical":"top" }}*/}
                        {/*targetOrigin={{ "horizontal":"left","vertical":"bottom" }}*/}
                        {/*onRequestClose={this._handlePopover}*/}
                    {/*>*/}
                        {/*dsad*/}
                        {/*/!*<Menu>*!/*/}
                            {/*/!*<MenuItem onClick={this._addField.bind(this, 'TEXT')} primaryText="Enter the Text file Title"/>*!/*/}
                            {/*/!*<MenuItem onClick={this._addField.bind(this, 'FILE', 'PDF')}  primaryText="Enter the PDF file title"/>*!/*/}
                            {/*/!*<MenuItem onClick={this._addField.bind(this, 'FILE', 'JPG')}  primaryText="Enter the jpg/png file title"/>*!/*/}
                            {/*/!*<MenuItem onClick={this._addField.bind(this, 'CHECKBOX', 'JPG')}  primaryText="Enter the checkbox file title"/>*!/*/}
                        {/*/!*</Menu>*!/*/}
                    {/*</Popover>*/}
                </div>
                </div>
                <div>
                    {this._renderQuestionnaire()}
                </div>
            </div>
        )
    }
}
QuestionaireComponent.propTypes = {
    questionnaire: PropTypes.array.isRequired,
    handleQuestionnaire: PropTypes.func.isRequired,
}
export default QuestionaireComponent;
