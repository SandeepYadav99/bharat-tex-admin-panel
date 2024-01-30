import React, { Component } from "react";
import styles from './style.module.css'

class CustomRadioLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: false
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(event) {
        const data = event.target.value;
        // this.props.handleChange(data)
    }

    render() {
        const {thirdValue, name} = this.props;
        return (
            <form style={{display:'inline-block'}}>
                <div className="radio-group">
                    <div>
                    <input
                        type="radio"
                        name={name}
                        id={name+'options-one'}
                        value={this.props.firstValue}
                        // checked={!this.state.selectedOption}
                        onChange={this.onValueChange}/>
                    <label htmlFor={name+'options-one'} className={'badge'}>{this.props.firstValue}</label>
                    </div>
                    <div>
                    <input
                        type="radio"
                        name={name}
                        id={name+'options-two'}
                        value={this.props.secondValue}
                        // checked={!this.state.selectedOption}
                        onChange={this.onValueChange}/>
                    <label htmlFor={name+'options-two'} className={'badge'}>{this.props.secondValue}</label>
                    </div>
                    {thirdValue && (
                        <div>
                        <input
                            type="radio"
                            name={name}
                            id={name+"option-three"}
                            value={this.props.thirdValue}
                            // checked={!this.state.selectedOption}
                            onChange={this.onValueChange}/>
                            <label htmlFor={name+"option-three"} className={'badge'}>{this.props.thirdValue}</label>
                        </div>
                        )}


                </div>
            </form>
        );
    }
}

export default CustomRadioLabel;
