import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAlphaNumChars, isEmail } from "../../../../libs/RegexUtils";
import useDebounce from "../../../../hooks/DebounceHook";
import {
  serviceEventCategoryCheck,
  serviceCreateEventCategory,
  serviceGetEventCategoryDetails,
  serviceUpdateEventCategory,
} from "../../../../services/EventCategory.service";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";

const initialForm = {
  name: "",
  contact: "",
  priority: "",
  email:"",
  status: true,
};

const useCategoryCreate = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [countryCode,setCountryCode] = useState('');
  const codeDebouncer = useDebounce(form?.name, 500);
  const { id } = useParams();

  const eventId = location?.state?.event_id;
  const parentId = location?.state?.parentId;

  const handleCountryCodeChange =(e)=>{
    setCountryCode(e.target.value)
  }


  useEffect(() => {
    if (id) {
      serviceGetEventCategoryDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log(data)
          setForm({
            ...form,
            name: data?.name,
            contact: data?.contact,
            email:data?.email,
            priority:data?.priority ? data?.priority.toString() : "",
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            id: data?.id,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  console.log("form", form);
  const checkCodeValidation = useCallback(() => {
    serviceEventCategoryCheck({
      name: form?.name,
      event_id: eventId ? eventId : "",
    }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data.is_exists) {
          errors["name"] = "EventCategory Name Exists";
          setErrorData(errors);
        } else {
          delete errors.name;
          setErrorData(errors);
        }
      }
    });
  }, [errorData, setErrorData, form?.name]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"]; // "contact","email"
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["name"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.email && !isEmail(form?.email)) {
      errors["email"] = true;
    }
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
      const fd = { ...form };
      fd.status = form?.status ? "ACTIVE" : "INACTIVE";
      fd.contact = `${countryCode}${form?.contact}`;
      if (eventId) {
        fd.event_id = eventId;
      }
      if (parentId) {
        fd.event_help_desk_category_id = parentId;
      }
      let req;
      if (id) {
        req = serviceUpdateEventCategory(fd);
      } else {
        req = serviceCreateEventCategory(fd);
      }
      req.then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
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
        if (!text || isAlphaNumChars(text)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "contact" || fieldName === "priority") {
        if (text > 0 && text?.length <= 10 ) {
          t[fieldName] = text.trim();
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
    [changeTextData, checkCodeValidation]
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
    id,
    handleCountryCodeChange,
    countryCode,
  };
};

export default useCategoryCreate;
