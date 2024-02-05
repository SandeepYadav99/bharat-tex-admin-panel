import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  HexCodeValid,
  isAlphaNumChars,
  isDate,
  isInvalidDateFormat,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCheckEventList,
  serviceCreateEventList,
  serviceGetEventListDetails,
  serviceUpdateEventList,
} from "../../../services/EventList.service";
import useDebounce from "../../../hooks/DebounceHook";
import { serviceGetList } from "../../../services/index.services";

function useEventCreate() {
  const InitialKeys = [
    "name",
    "slug",
    "start_date",
    "end_date",
    "location",
    "url",
    "admin_id",
    "registration_url",
    "description",
    "organised_by",
    "id",
    "registration_status",
    "is_digital",
    "is_gallery_public",
    "relatedEvents",
    "accessibleChapters",
    "status",
  ];
  const initialForm = {
    name: "",
    slug: "",
    organised_by: "",
    start_date: "",
    end_date: "",
    location: "",
    admin_id: "",
    url: "",
    registration_url: "",
    registration_status: "",
    is_digital: "",
    is_gallery_public: "",
    related_event_ids: [],
    description: "",
    logo: "",
    thumbnail: "",
    banner: "",
    primary_colour: "",
    secondary_colour: "",
    action_colour: "",
    menu_text_colour: "",
    all_event_participants: true,
    all_chapters: false,
    chapters: false,
    accessible_chapter_ids: [],
  };
  const featureKey = {
    event_participants: true,
    event_schedule: true,
    about_event: true,
    exhibitor:false,
    testimonial:false,
    event_organizing_committee: false,
    event_speakers: true,
    event_gallery: false,
    analytics: false,
    help_desk: false,
    poll: false,
    surveys: false,
    sponsors: false,
    city_guide: false,
    event_feed: true,
    profile: true,
    networking: true,
    feedback: false,
    event_banner: false,
    youtube_live: false,
    information_center: false,
  };
  const colorKey = [
    "primary_colour",
    "secondary_colour",
    "action_colour",
    "menu_text_colour",
  ];
  const eventkeys = ["all_chapters", "chapters", "all_event_participants"];
  const [form, setForm] = useState({ ...initialForm });
  const [feature, setFeature] = useState({ ...featureKey });
  const [select, setSelect] = useState("all_chapters");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState("");
  const [thumb, setthumb] = useState("");
  const codeDebouncer = useDebounce(form?.name, 500);

  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
    ADMIN_CHAPTERS:[],
    ADMIN_EVENTS:[],
  });

  useEffect(() => {
    if (id) {
      serviceGetEventListDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log("data", data);
          const { accessible_to, features, theme, ...rest } = data;
          const fd = {
            all_event_participants: data?.accessible_to?.all_event_participants,
          };
          InitialKeys?.forEach((key) => {
            if (
              [
                "registration_status",
                "is_gallery_public",
                "is_digital",
              ].includes(key)
            ) {
              fd[key] = data[key] ? "YES" : "NO";
            } else if (key === "relatedEvents") {
              fd["related_event_ids"] = data[key];
            } else if (key === "accessibleChapters") {
              fd["accessible_chapter_ids"] = data[key];
            } else {
              fd[key] = data[key];
            }
          });
          setForm({
            ...form,
            ...accessible_to,
            ...fd,
            ...theme,
          });
          setFeature({ ...feature, ...features });
          setLogo(data?.logo);
          setthumb(data?.thumbnail);
          if (data?.accessible_to) {
            if (data?.accessible_to?.all_chapters) {
              setSelect("all_chapters");
            } else {
              setSelect("chapters");
            }
          }
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkCodeValidation = useCallback(() => {
    serviceCheckEventList({ name: form?.name }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data.is_exists) {
          errors["name"] = "Event name already exist .";
          setErrorData(errors);
        } else {
          delete errors?.name;
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

  useEffect(() => {
    serviceGetList(["PRODUCT_CATEGORY","PRODUCT_GROUP"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (select === "all_chapters") {
      setForm({ ...form, accessible_chapter_ids: [] });
    }
  }, [select]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "organised_by",
      "start_date",
      "end_date",
      "location",
      "admin_id",
      "registration_status",
      "is_digital",
      "description",
      "primary_colour",
      "secondary_colour",
      "action_colour",
      "menu_text_colour",
      "is_gallery_public",
    ];
    if (!id) {
      required.push(...["logo", "thumbnail", "banner"]);
    }
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    ["url", "registration_url"].forEach((val) => {
      if (form[val] && !validateUrl(form[val])) {
        errors[val] = true;
        SnackbarUtils.error("Please Enter the Valid Url");
      }
    });
    colorKey.forEach((item) => {
      if (item && !HexCodeValid(form[item])) {
        errors[item] = true;
      }
    });
    if (form?.start_date && !isDate(form?.start_date)) {
      if (isInvalidDateFormat(form?.start_date)) {
        errors["start_date"] = true;
      }
    }
    if (form?.end_date && !isDate(form?.end_date)) {
      if (isInvalidDateFormat(form?.end_date)) {
        errors["end_date"] = true;
      }
    }
    if (form?.start_date && form?.end_date) {
      const joinDate = new Date(form?.start_date);
      const expectedDate = new Date(form?.end_date);
      joinDate.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      if (joinDate.getTime() > expectedDate.getTime()) {
        SnackbarUtils.error("End date should not be Less than Start date");
        errors["end_date"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [errorData, id, colorKey, form]);

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
        t[fieldName] = text;
        t["slug"] = text.toLowerCase().replace(/ /g, "-");
      } else if (fieldName === "accessible_chapter_ids") {
        t[fieldName] = text.filter((item, index, self) => {
          return index === self.findIndex((i) => i.id === item.id);
        });
      }
       else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );


  const changeFeatureData = useCallback(
    (text, fieldName) => {
      const t = { ...feature };
      t[fieldName] = text;
      setFeature(t);
    },
    [feature, setFeature]
  );
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        const relatedId =
          Array.isArray(form.related_event_ids) &&
          form.related_event_ids.length > 0
            ? form.related_event_ids.map((item) => item.id)
            : [];
        form.related_event_ids = relatedId;
        const chapterId =
          Array.isArray(form.accessible_chapter_ids) &&
          form.accessible_chapter_ids.length > 0
            ? form.accessible_chapter_ids.map((item) => item.id)
            : [];
        form.accessible_chapter_ids = chapterId;

        const themeData = {};
        const accessKey = {};
        for (const prop in form) {
          if (colorKey.includes(prop)) {
            themeData[prop] = form[prop];
            delete form[prop];
          }
          if (eventkeys.includes(prop)) {
            if (prop === "chapters" || prop === "all_chapters") {
              accessKey[prop] = prop === select;
            } else {
              accessKey[prop] = form[prop];
            }
            delete form[prop];
          }
        }
        form.accessible_to = accessKey;
        form.theme = themeData;
        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (
            ["registration_status", "is_gallery_public", "is_digital"].includes(
              key
            )
          ) {
            fd.append(key, form[key] === "YES" ? true : false);
          } else if (
            [
              "related_event_ids",
              "accessible_chapter_ids",
              "theme",
              "accessible_to",
            ].includes(key)
          ) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            if (form[key]) {
              fd.append(key, form[key]);
            }
          }
        });
        fd.append("features", JSON.stringify(feature));
        if (status) {
          fd.append("status", status);
        }
        let req;
        if (id) {
          req = serviceUpdateEventList(fd);
        } else {
          req = serviceCreateEventList(fd);
        }
        req.then((res) => {
          if (!res.error) {
            historyUtils.push("/events");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [isSubmitting, form, feature, id, colorKey, eventkeys, select]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }

      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer, feature, select]
  );

  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    changeFeatureData,
    feature,
    select,
    setSelect,
    id,
    logo,
    thumb,
  };
}

export default useEventCreate;
