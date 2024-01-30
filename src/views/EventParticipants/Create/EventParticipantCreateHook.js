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
import historyUtils from "../../../libs/history.utils";
import {
  serviceEventParticipantCheck,
  serviceCreateEventParticipant,
  serviceGetEventParticipantDetails,
  serviceUpdateEventParticipant,
} from "../../../services/EventParticipant.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceUpdateAdminUserSearch } from "../../../services/AdminUser.service";
import LogUtils from "../../../libs/LogUtils";
import { serviceGetList } from "../../../services/Common.service";
import { useParams } from "react-router";

const initialForm = {
  name: "",
  // country_code: "91",
  contact: "",
  email: "",
  title: "",
  is_default_password: false,
  reg_id: "",
  user_id: "",
  is_auto: false,
  member: "",
};

const useEventParticipantCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.code, 500);
  const { id } = useParams();
  const [isContactInList, setIsContactInList] = useState(false);
  const [countryCode,setCountryCode] = useState();

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  useEffect(()=>{
    if(!countryCode){
       setCountryCode("91")
    }
  })

  const [listData, setListData] = useState({
    MEMBERS: [],
  });

  useEffect(() => {
    serviceGetList(["MEMBERS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (empId) {
      serviceGetEventParticipantDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...form,
            name: data?.name,
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
    serviceUpdateAdminUserSearch({
      contact: `91 ${form?.contact}`,
      id: empId ? empId : "",
    }).then((res) => {
      if (!res.error) {
        const data = res?.data;

        if (data?.contact === form?.contact) {
          setIsContactInList(true);
        }

        if (data) {
          const tForm = {
            ...initialForm,
            name: data?.name,
            contact: data?.contact,
            email: data?.email,
            title: data.title,
            reg_id: data?.reg_id,
            user_id: data?.id,
            member: data?.company_name,
          };
          setForm(tForm);
        } else {
          if (data?.contact !== form?.contact) {
            setIsContactInList(false);
          }
          setForm({
            ...form,
            user_id: "",
          });
        }
      }
    });
  }, [form, setForm, isContactInList, empId, id, form?.contact]);

  // useEffect(() => {
  //   if (codeDebouncer) {
  //     checkCodeValidation();
  //   }
  // }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      // "country_code",
      "contact",
      "email",
      "reg_id",
      "title",
      "member",
    ];
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
      let req;
      if (empId) {
        req = serviceUpdateEventParticipant({
          ...form,
          id: empId ? empId : "",
          event_id: id,
        });
      } else {
        req = serviceCreateEventParticipant({
          ...form,
          contact: `${countryCode} ${form?.contact}`,
          company_name: form?.member?.name,
          event_id: id,
        });
      }
      req.then((res) => {
        if (!res.error) {
          // handleToggleSidePannel();
          historyUtils.goBack();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    LogUtils.log("errors", errors);
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
      } else if (fieldName === "company_name") {
        t["member"] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, id, empId]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
      if (type === "contact") {
        checkCodeValidation();
      }
    },
    [changeTextData, checkCodeValidation, form?.contact, empId]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form, setForm, isContactInList]);

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
    listData,
    isContactInList,
    countryCode,
    handleCountryCode,
  };
};

export default useEventParticipantCreate;
