import React, {useCallback, useRef} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {serviceUploadImage} from "../../../../../services/Common.service";
import LogUtils from "../../../../../libs/LogUtils";

const NewEditor = ({editorData, handleChange, type, value, ...rest}) => {
    const editor = useRef();

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const onImageUploadBefore = (files, info, uploadHandler) => {


                const formData = new FormData();
                formData.append("image", files[0]);

                serviceUploadImage(formData).then((res) => {
                    LogUtils.log('formData',  res?.data);
                    const data = {
                        result: [
                            {
                                url: res?.data?.image,
                                name: "thumbnail",
                            },
                        ],
                    };

                    uploadHandler(data);
                });


        // return (files, _info, _core, uploadHandler) => {
        //     LogUtils.log(files, _info, _core, uploadHandler);
        //     // (async () => {
        //     //     const formData = new FormData();
        //     //     formData.append("image", files[0]);
        //     //
        //     //     const res = await serviceUploadImage(formData);
        //     //
        //     //     const data = {
        //     //         result: [
        //     //             {
        //     //                 url: res?.data,
        //     //                 name: "thumbnail",
        //     //             },
        //     //         ],
        //     //     };
        //     //
        //     //     uploadHandler(data);
        //     // })();
        //
        //     // called here for stop double image
        //     // uploadHandler();
        // };
    }

    return (
        <div>
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                onImageUploadBefore={onImageUploadBefore}
                // placeholder="Please type here..."
                defaultValue={editorData}
                setOptions={{ height: 200, buttonList: [['bold','italic', 'underline', 'list',],['image', 'link', 'codeView']] }}
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
