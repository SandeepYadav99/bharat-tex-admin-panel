import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";
import { serviceAcceptEventUserRequest } from "../../../../services/EventUserRequest.service";
// import { serviceAcceptLeadMemberList } from "../../../../services/LeadMemberList.service";
// import { serviceGetNewEmployeeReject } from "../../../../services/NewEmployeeList.service";

const initialForm = {
  member_id: "",
};
const useAcceptDialogHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    MEMBERS: [],
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["member_id"];
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
      serviceAcceptEventUserRequest({
        lead_id: candidateId?.id,
      }).then((res) => {
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
  };
};

export default useAcceptDialogHook;
