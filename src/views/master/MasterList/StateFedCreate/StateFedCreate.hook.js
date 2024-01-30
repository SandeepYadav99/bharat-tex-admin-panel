import { useCallback, useEffect, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isNum,
  isSpace,
} from "../../../../libs/RegexUtils";
import useDebounce from "../../../../hooks/DebounceHook";
import LogUtils from "../../../../libs/LogUtils";
import {
  serviceCreateMasterList,
  serviceGetMasterListDetails,
  serviceUpdateMasterList,
  serviceCheckMasterList,
} from "../../../../services/MasterList.service";
import historyUtils from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../../config/constants";
import { serviceGetList } from "../../../../services/index.services";

const initialForm = {
  name: "",
  code: "",
  image: "",
  admin_id: "",
  status: true,
};

const useStateFedCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const codeDebouncer = useDebounce(form?.code, 1000);
  const nameDebouncer = useDebounce(form?.name, 1000);

  const { id } = useParams();
  const [listData, setListData] = useState({
    ADMIN: [],
  });

  useEffect(() => {
    if (id) {
      serviceGetMasterListDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          const fd = {};
          Object.keys({ ...initialForm }).forEach((val) => {
            fd[val] = data[val];
          });
          setForm({
            ...form,
            ...fd,
            status: fd?.status === Constants.GENERAL_STATUS.ACTIVE,
            image: "",
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  useEffect(() => {
    serviceGetList(["ADMIN"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkCodeValidation = useCallback(() => {
    serviceCheckMasterList({ code: form?.code, id: id ? id : "" }).then(
      (res) => {
        if (!res?.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res?.data?.is_exists) {
            errors["code"] = "State code already exists";
            setErrorData(errors);
          } else {
            delete errors?.code;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.code, id]);

  const checkNameValidation = useCallback(() => {
    serviceCheckMasterList({ name: form?.name, id: id ? id : "" }).then(
      (res) => {
        if (!res?.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res?.data?.is_exists) {
            errors["name"] = "State name already exists";
            setErrorData(errors);
          } else {
            delete errors?.name;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.name, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  useEffect(() => {
    if (nameDebouncer) {
      checkNameValidation();
    }
  }, [nameDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code", "admin_id"];
    if (!id) {
      required.push("image");
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
        if (["image", "status"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      if (form?.image) {
        fd.append("image", form?.image);
      }
      if (id) {
        fd.append("id", id);
      }
      let req = serviceCreateMasterList;
      if (id) {
        req = serviceUpdateMasterList;
      }
      req(fd).then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          historyUtils.push("/master");
        } else {
          SnackbarUtils.success(res.message);
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
        if (!text || ( isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
      } else if (fieldName === "code") {
        if (!text || ( isAlphaNumChars(text))) {
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
    [changeTextData, checkCodeValidation, checkNameValidation]
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
    id,
    listData,
    image,
  };
};

export default useStateFedCreate;
