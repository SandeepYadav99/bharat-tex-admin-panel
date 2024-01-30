import { useCallback, useEffect, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateCityAssocList,
  serviceGetCityAssocListDetails,
  serviceUpdateCityAssocList,
  serviceCheckCityAssocList,
} from "../../../services/CityAssocList.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import { serviceGetList } from "../../../services/index.services";

const initialForm = {
  name: "",
  code: "",
  image: "",
  admin_id: "",
  status: true,
  parent_chapter_id: "",
};

const useCityAssCreate = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);

  const codeDebouncer = useDebounce(form?.code, 500);
  const nameDebouncer = useDebounce(form?.name, 500);

  const { id } = useParams();
  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
  });
  const parentId = location?.state?.parent_id;

  useEffect(() => {
    if (parentId && listData?.CHAPTERS && !id) {
      const hodIndex = listData?.CHAPTERS.findIndex(
        (val) => val.id === parentId
      );
      if (hodIndex >= 0) {
        const parentValue = listData?.CHAPTERS[hodIndex];
        setForm({ ...form, parent_chapter_id: parentValue });
      }
    }
  }, [parentId, listData?.CHAPTERS]);

  useEffect(() => {
    if (id) {
      serviceGetCityAssocListDetails({ id: id || parentId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          const fd = {};
          Object.keys({ ...initialForm }).forEach((val) => {
            if (val === "parent_chapter_id") {
              fd[val] = data["parentChapter"];
            }else if(parentId){
              fd[val] = data["name"];
            }
            else{
              fd[val] = data[val];
            }
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
    serviceGetList(["ADMIN", "CHAPTERS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkCodeValidation = useCallback(() => {
    serviceCheckCityAssocList({ code: form?.code, id: id ? id : "" }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["code"] = "City Association Code Exists";
            setErrorData(errors);
          } else {
            delete errors.code;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.code, id]);

  const checkNameValidation = useCallback(() => {
    serviceCheckCityAssocList({ name: form?.name, id: id ? id : "" }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["name"] = "City Association Name Exists";
            setErrorData(errors);
          } else {
            delete errors.name;
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
      } else if (["code","name"].indexOf(val) < 0) {
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
          if (key === "parent_chapter_id") {
            fd.append(key, form[key]?.id);
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      if (form?.image) {
        fd.append("image", form?.image);
      }
      if (id) {
        fd.append("id", id);
      }
      // fd.append("parent_chapter_id", parentId);
      let req = serviceCreateCityAssocList;
      if (id) {
        req = serviceUpdateCityAssocList;
      }
      req(fd).then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          historyUtils.goBack();
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
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 150)) {
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

export default useCityAssCreate;
