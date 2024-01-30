import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import RouteName from "../../../../../routes/Route.name";
import { serviceGetList } from "../../../../../services/index.services";
import {
  serviceAcceptLeadMemberList,
  serviceRejectLeadMemberList,
} from "../../../../../services/LeadMemberList.service";
import { isEmail } from "../../../../../libs/RegexUtils";
import {
  serviceAddMemberUsers,
  serviceUpdateMemberUsers,
} from "../../../../../services/MemberList.service";
import { useParams } from "react-router";

const initialForm = {
  name: "",
  email: "",
  title: "",
  is_send_sms: false,
  contact: "",
};
const useAddUserDialogHook = ({ isOpen, handleToggle, formValue }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});

  const [listData, setListData] = useState({
    MEMBERS: [],
  });
  const { id } = useParams();
  console.log(isRejectPopUp, "Reject", isOpen, "Open");
  console.log("id", id);
  useEffect(() => {
    if (isOpen) {
      if (formValue?.id) {
        const obj = { id: formValue?.id };
        Object.keys({ ...initialForm }).forEach((item) => {
          if (item === "contact") {
            obj[item] = formValue["full_contact"];
          } else if (item === "is_send_sms") {
            obj[item] = formValue["is_send_sms"] ? true : false;
          } else {
            obj[item] = formValue[item];
          }
        });
        setForm({ ...form, ...obj });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);
  console.log("formValue", formValue);
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  useEffect(() => {
    serviceGetList(["MEMBERS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "contact") {
        if (text >= 0 && text?.length <= 10) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "email", "contact", "title"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
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
      let req;
      if (formValue?.id) {
        req = serviceUpdateMemberUsers({ ...form, member_id: id ? id : "" });
      } else {
        req = serviceAddMemberUsers({
          ...form,
          contact: `91 ${form?.contact}`,
          member_id: id ? id : "",
        });
      }
      req.then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Accepted");
          handleToggle();
          window.location?.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
      handleToggle();
    },

    [isRejectPopUp, setDataValue, isOpen]
  );

  const handleRejectApi = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceRejectLeadMemberList({ lead_id: dataValue?.id }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Rejected Successfully");
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [setIsSubmitting, isSubmitting, dataValue]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    listData,
    toggleRejectDialog,
    handleRejectApi,
    isRejectPopUp,
  };
};

export default useAddUserDialogHook;
