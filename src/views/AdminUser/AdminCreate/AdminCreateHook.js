import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";

import {
  serviceAdminUserCheck,
  serviceAdminUserCheckExist,
  serviceCreateAdminUser,
  serviceGetAdminUserDetails,
  serviceUpdateAdminUser,
} from "../../../services/AdminUser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";

const initialForm = {
  name: "",
  contact: "",
  email: "",
  password: "",
  type: "ADMIN",
  role: "",
  country_code:'',
  status: true,
};

const useAdminCreate = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [countryCode, setCountryCode] = useState();

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  useEffect(()=>{
    if(!countryCode){
       setCountryCode("91")
    }
  })


  const codeDebouncer = useDebounce(form?.contact, 500);
  useEffect(() => {
    if (empId) {
      serviceGetAdminUserDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            name: data?.name,
            contact: data?.contact,
            email: data?.email,
            country_code:data?.country_code,
            role: data?.role,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkCodeValidation = useCallback(() => {
    serviceAdminUserCheckExist({
      contact: `${form?.contact}`,
    }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data.is_exists) {
          errors["contact"] = "Admin User Contact Exists";
          setErrorData(errors);
        } else {
          delete errors.contact;
          setErrorData(errors);
        }
      }
    });
  }, [errorData, setErrorData]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "country_code",
      "contact",
      "email",
      // "password",
      // "type",
      "role",
      // "image",
    ];
    if (!empId){
      required?.push("password");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
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
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (key === "contact") {
          fd.append(key, `${form?.country_code} ${form?.contact}`);
        } else {
          fd.append(key, form[key]);
        }
      });
      if(empId){
        fd.delete("password")
        fd.append("id",empId);
      }
      let req;
      
      if (empId) {
        req = serviceUpdateAdminUser(fd);
      } else {
        req = serviceCreateAdminUser(fd);
      }
      
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
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);
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
      } else if (fieldName === "contact") {
        if (text >= 0 && text?.length <= 10) {
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
    [changeTextData, checkCodeValidation]
  );
  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
      // handleSubmit()
    },
    [isRejectPopUp, setDataValue]
  );

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
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    isRejectPopUp,
    setIsRejectPopUp,
    handleCountryCode,
    countryCode,
    toggleRejectDialog,
  };
};

export default useAdminCreate;
