import React, {useCallback} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const NewEditor = ({editorData, handleChange, type, value, ...rest}) => {

    return (
        <div>
            <SunEditor
            // placeholder="Please type here..."
                defaultValue={editorData}
                setOptions={{ height: 200, buttonList: [['bold','italic', 'underline', 'list',],['image', 'link']] }}
                onChange={(text) => {
                    handleChange(text)
                }}
                {...rest}
                setContents={editorData}
            />
        </div>
    );
};
export default NewEditor;
