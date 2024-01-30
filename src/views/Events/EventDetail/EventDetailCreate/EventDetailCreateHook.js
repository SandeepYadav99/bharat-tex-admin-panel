import { useCallback, useEffect, useState } from "react";
import { isAlphaNumChars } from "../../../../libs/RegexUtils";
import historyUtils from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import { serviceGetEventBoolsDetails, serviceUpdateEventTimer } from "../../../../services/EventList.service";

const initialForm = {
  timer_date: "",
};

const useEventDetailCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  timer,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    let req = serviceGetEventBoolsDetails({ id: empId });
    req.then((data) => {
      const boolData = data?.data?.details;
      setForm({ ...form, timer_date: boolData?.timer_date});
    });
  }, [empId]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["timer_date"];
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

      let req = serviceUpdateEventTimer({
        ...form,
        id: empId ? empId : "",
        is_timer: timer ? true : false,
      });
      req.then((res) => {
        if (!res.error) {
          handleToggleSidePannel();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("errors", errors);
    if (Object.keys(errors).length > 0) {
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
    handleDelete,
    handleReset,
    empId,
  };
};

export default useEventDetailCreate;
