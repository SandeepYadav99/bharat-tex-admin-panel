import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../../libs/RegexUtils";
import {
  serviceAdminUserCheck,
  serviceCreateAdminUser,
  serviceGetAdminUserDetails,
  serviceUpdateAdminUser,
  serviceUpdateAdminUserSearch,
} from "../../../../services/AdminUser.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";
import { useParams } from "react-router";
import {
  serviceAddMemberChapterUsers,
  serviceAddMemberUsers,
} from "../../../../services/MemberList.service";

const initialForm = {
  name: "",
  title: "",
  contact: "",
  email: "",
  member_id: "",
};

const useStateMemCreate = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [disabled, setDisabled] = useState({});
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const handleChangeCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  const [listData, setListData] = useState({
    MEMBERS: [],
    CHAPTERS: [],
    // ADMIN_MEMBERS:[]
  });
  useEffect(() => {
    serviceGetList(["MEMBERS", ["CHAPTERS"],"ADMIN_MEMBERS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (id && isSidePanel) {
  //     setForm({ ...form, member_id: id });
  //   }
  // }, [id, isSidePanel]);

  useEffect(() => {
    if (empId) {
      serviceGetAdminUserDetails({ id: empId }).then((res) => {
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

  const checkCodeValidation = useCallback(
    (number) => {
      serviceUpdateAdminUserSearch({ contact: number }).then((res) => {
        if (!res.error) {
          const empData = res?.data;
          if (empData !== null) {
            const fd = {};
            const disabledField = {};
            Object.keys({ ...initialForm }).forEach((val) => {
              if (empData[val]) {
                fd[val] = empData[val];
                disabledField[val] = true;
              }
            });
            setUserId(empData?.id);
            setDisabled({ ...disabled, ...disabledField });
            setForm({
              ...form,
              ...fd,
            });
          } else {
            setDisabled({});
            setUserId("");
          }
        }
      });
    },
    [form?.contact, disabled, setDisabled, userId, setUserId]
  );

  

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "title", "contact", "email"];
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
      const fdData = {};
      if (userId) {
        fdData.user_id = userId;
      }
      if (id) {
        fdData.chapter_id = id;
      }
      Object.keys(form).forEach((key) => {
        if (key === "contact") {
          fdData[key] = form[key].replace(/\+/g, "");
        } else {
          fdData[key] = form[key];
        }
      });

      let req;
      if (empId) {
        req = serviceUpdateAdminUser({ ...form, id: empId ? empId : "" });
      } else {
        req = serviceAddMemberChapterUsers(fdData);
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
  }, [form, isSubmitting, setIsSubmitting, empId, userId, setUserId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, userId, setUserId]);

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
      if (type === "contact") {
        checkCodeValidation(form[type]);
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
    isEdit,
    handleDelete,
    handleReset,
    empId,
    listData,
    disabled,
    selectedCountry,
    setSelectedCountry,
    handleChangeCountry,
  };
};

export default useStateMemCreate;
