
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {MenuItem, Button} from '@material-ui/core';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import EventEmitter from "../../../../libs/Events.utils";


let lastValue = '';
let isExists = false;


let requiredFields = [];

const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};

const defaultTheme = createTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                // marginTop: 0,
                width: "100%",
            },
            editor: {
                borderBottom: "1px solid gray"
            }
        }
    }
})


class HtmlEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_checked: false,
            editor: null,
            editor_data: null
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleTitleChange = this._handleTitleChange.bind(this);
        this._handleEditor = this._handleEditor.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        let htmlData = '';
        if (data) {
            htmlData = data
        } else {
            htmlData = ''
            requiredFields = [];
        }

        const contentHTML = convertFromHTML(htmlData)
        const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
        this.setState({
            editor_data:  JSON.stringify(convertToRaw(state))
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.title !== this.props.title) {
            const contentHTML = convertFromHTML(this.props.data)
            const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
            this.setState({
                editor_data:  JSON.stringify(convertToRaw(state))
            })
        }
    }

    _handleSubmit(tData) {
        const { editor} = this.state;
        const { title } = this.props;
        if (editor) {
            tData['value'] = editor;
            this.props.handleDataSave(title, editor)
        } else {
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, 'Please Write Content');
        }

    }

    _handleEditor(data) {
        const html = stateToHTML(data.getCurrentContent());
        this.setState({
            editor: html
        })
    }

    handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
    }

    _renderEditor() {
        const { editor_data } = this.state;
        if (editor_data) {
            return (
                <MuiThemeProvider theme={defaultTheme}>
                    <MUIRichTextEditor
                        defaultValue={editor_data}
                        onChange={this._handleEditor}
                        label="Start typing..."
                        controls={["bold", "italic", "underline", "strikethrough", , "undo", "redo", "numberList", "bulletList", "quote"]} //"highlight"
                        inlineToolbar={true}
                    />
                </MuiThemeProvider>
            )
        }
    }

    _handleTitleChange(e) {
        this.props.change('slug', e.target.value.replace(/ /g,'-').replace(/[^\w-]+/g,'').toLowerCase());
    }

    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked
        })
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }

    render() {
        const {handleSubmit, title, data} = this.props;
        return (
            <div>
                <h3>{title.replaceAll('_', ' ')} Detail</h3>
                <hr/>
                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            {this._renderEditor()}
                        </div>
                    </div>


                    <br/>
                    <br/>
                    <div style={{float: 'right'}}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

const ReduxForm = reduxForm({
    form: 'HtmlEditor',  // a unique identifier for this form
    validate,
    enableReinitialize: true,
})(HtmlEditor);

export default connect(null, null)(ReduxForm);
