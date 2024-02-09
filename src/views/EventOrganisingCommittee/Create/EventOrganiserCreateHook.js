import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {

  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";

import {

  serviceCreateEventOrganiser,

  serviceUpdateEventOrganiser,
} from "../../../services/EventOrganiser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

import {useParams} from "react-router";
import {actionCreateEventOrganiser, actionUpdateEventOrganiser} from "../../../actions/EventOrganiser.action";
import {useDispatch} from "react-redux";

const initialForm = {
  title: "",
  priority: "",
};

const useEventOrganiserCreate = ({ handleToggleSidePannel, isSidePanel, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    if (data) {
      setForm({
        ...initialForm,
        title: data?.title,
        priority: data?.priority,
      });
    }
  }, [data]);


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "priority",
    ];

    required.forEach((val) => {
      if (
        !form?.["title"] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
      if (form?.email && !isEmail(form?.email)) {
        errors["email"] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req;
      if (data) {
        req = serviceUpdateEventOrganiser({ ...form, id: data?.id, event_id: id });
      } else {
        req = serviceCreateEventOrganiser({...form,  event_id: id });
      }
      req.then((res) => {
        if (!res.error) {
          handleToggleSidePannel();
          if (data) {
            dispatch(actionUpdateEventOrganiser(res?.data));
          } else {
            dispatch(actionCreateEventOrganiser(res?.data));
          }
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, data, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

  const removeError = useCallback(
    (title, type) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;

     
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      }  else if (fieldName === 'priority') {
        if (!text || (isNum(text))) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    data,
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
};

export default useEventOrganiserCreate;
