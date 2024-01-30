import { useCallback, useEffect, useRef, useState } from "react";
import { isAlphaNumChars, isSpace } from "../../../libs/RegexUtils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventPolls,
  serviceGetEventPollsDetails,
  serviceUpdateEventPolls,
} from "../../../services/EventPolls.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import { useMemo } from "react";

const initialForm = {
  poll_question: "",
  status: true,
};

const useEventPollsCreate = ({location}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const { id } = useParams();
  const otherRef = useRef(null);

  const eventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);
  useEffect(() => {
    if (id) {
      serviceGetEventPollsDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const { options } = data;
          console.log("data", data);
          setForm({
            ...form,
            poll_question: data?.poll_question,
            status: data?.status === "ACTIVE" ? true : false,
            ques_id: data?.ques_id,
          });
          otherRef.current?.setData(options);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["poll_question"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
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
      const OtherData = otherRef.current.getData();
      let data = { ...form, status: form?.status ? "ACTIVE" : "INACTIVE" };
      data.options = OtherData;
      data.event_id = eventId;
      // if (id) {
      //   fd.append("id", id);
      // }
      let req = serviceCreateEventPolls;
      if (id) {
        req = serviceUpdateEventPolls;
      }
      req(data).then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          historyUtils.goBack()
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isOtherValid = otherRef.current.isValid();
    console.log("errors", errors, isOtherValid);
    if (!isOtherValid || Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

  const removeError = useCallback(
    (title) => {
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
    isSubmitting,
    errorData,
    handleDelete,
    handleReset,
    id,
    otherRef,
  };
};

export default useEventPollsCreate;
