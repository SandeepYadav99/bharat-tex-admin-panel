import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateAlbumList,
  serviceGetAlbumDetails,
  serviceUpdateAlbumList,
} from "../../../services/GalleryAlbum.service";
import { isDate, isInvalidDateFormat } from "../../../libs/RegexUtils";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";

const useAlbumCreateHook = () => {
  const initialForm = {
    name: "",
    event_date: "",
    description: "",
    thumbnail: "",
    images: "",
    related_chapter_id: "",
    related_event_id: "",
    visible_event_ids: [],
    visible_chapter_ids: [],
    status: true,
    all_chapters: "",
    chapters: "",
    videos: "",
  };
  const eventkeys = ["all_chapters", "chapters"];
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [select, setSelect] = useState("all_chapters");
  const [selectEvent, setSelectEvent] = useState(false);
  const [selectRelated, setSelectRelated] = useState("events");
  const descriptionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectImages, setSelectImages] = useState([]);
  const [selectVideos, setSelectVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
  });

  useEffect(() => {
    serviceGetList([
      "ADMIN",
      "CHAPTERS",
      "EVENTS",
      "ADMIN_CHAPTERS",
      "ADMIN_EVENTS",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      serviceGetAlbumDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setSelectImages(data?.images);
          setThumbnail(data?.thumbnail);
          if (data?.related_to) {
            if (data?.related_to?.chapter) {
              setSelectRelated("CHAPTERS");
            } else {
              setSelectRelated("EVENTS");
            }
          }
          if (data?.visible_to) {
            const { event_participants, all_chapters } = data?.visible_to;
            if (all_chapters) {
              setSelect("all_chapters");
            } else {
              setSelect("chapters");
            }
            setSelectEvent(event_participants ? true : false);
          }
          setForm({
            ...form,
            // id:data._id,
            name: data?.name,
            event_date: data?.event_date,
            description: data?.description,
            related_chapter_id: data?.relatedChapter,
            related_event_id: data?.relatedEvent,
            visible_chapter_ids: data?.visibleChapters,
            visible_event_ids: data?.visibleEvents,
            // document: data.document,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  const renderImages = (image) => {
    setSelectImages([...image]);
  };

  const renderVideo = (videos) => {
    setSelectVideos([...videos]);
  };
  useEffect(() => {
    if (select === "all_chapters") {
      setForm({ ...form, visible_chapter_ids: [] });
    }
  }, [select]);

  useEffect(() => {
    if (!selectEvent) {
      setForm({ ...form, visible_event_ids: [] });
    }
  }, [selectEvent]);

  useEffect(() => {
    if (selectRelated === "chapters") {
      setForm({ ...form, related_event_id: "" });
    } else if (selectRelated === "events") {
      setForm({ ...form, related_chapter_id: "" });
    }
  }, [selectRelated]);

  const checkFormValidation = useCallback(() => {
    const errors = {};

    const requiredFields = [
      "name",
      // "event_date",
      // "description",
      ...(id ? [] : ["thumbnail", "images"]),
    ];

    if (selectRelated === "chapters") {
      requiredFields.push("related_chapter_id");
      delete errors["related_event_id"];
    } else if (selectRelated === "events") {
      requiredFields.push("related_event_id");
      delete errors["related_chapter_id"];
    }

    if (select === "chapters") {
      requiredFields.push("visible_chapter_ids");
      delete errors["visible_event_ids"];
    } else if (select === "all_chapters") {
      delete errors["visible_chapter_ids"];
    }

    if (selectEvent) {
      requiredFields.push("visible_event_ids");
      delete errors["visible_chapter_ids"];
    }

    requiredFields.forEach((field) => {
      if (
        (!form?.[field] && parseInt(form?.[field]) !== 0) ||
        (Array.isArray(form?.[field]) && form?.[field]?.length === 0)
      ) {
        errors[field] = true;
      }

      if (form?.event_date && !isDate(form?.event_date)) {
        if (isInvalidDateFormat(form?.event_date)) {
          errors["event_date"] = true;
        }
      }
    });

    return errors;
  }, [form, id, select, selectRelated, selectEvent]);

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
      } else if (fieldName === "visible_event_ids") {
        t[fieldName] = text.filter((item, index, self) => {
          return index === self.findIndex((i) => i.id === item.id);
        });
      } else if (fieldName === "visible_chapter_ids") {
        t[fieldName] = text.filter((item, index, self) => {
          return index === self.findIndex((i) => i.id === item.id);
        });
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        if (!form.event_date) {
       delete  form.event_date 
        }
        const chapterId =
          Array.isArray(form?.visible_chapter_ids) &&
          form.visible_chapter_ids.length > 0
            ? form?.visible_chapter_ids.map((item) => item.id)
            : [];

        form.visible_chapter_ids = chapterId;

        if (form?.related_chapter_id) {
          fd.append("related_chapter_id", form?.related_chapter_id?.id);
        }

        if (form?.related_event_id) {
          fd.append("related_event_id", form?.related_event_id?.id);
        }

        if (selectImages?.length > 0) {
          fd.append("remote_images", JSON.stringify(selectImages));
        }

        const visibleEventId =
          Array.isArray(form?.visible_event_ids) &&
          form.visible_event_ids.length > 0
            ? form.visible_event_ids.map((item) => item.id)
            : [];

        form.visible_event_ids = visibleEventId;

        const accessKey = { event_participants: selectEvent ? true : false };

        for (const prop in form) {
          if (eventkeys.includes(prop)) {
            accessKey[prop] = prop === select;
            delete form[prop];
          }
        }

        form.visible_to = accessKey;

        form.related_to = {
          event: selectRelated === "events",
          chapter: selectRelated === "chapters",
        };

        Object.keys(form).forEach((key) => {
          if (
            key !== "thumbnail" &&
            key !== "images" &&
            key !== "videos" &&
            key !== "related_event_id" &&
            key !== "related_chapter_id"
          ) {
            if (key === "status") {
              fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
            } else if (key === "related_to") {
              fd.append(key, JSON.stringify(form[key]));
            } else if (
              key === "visible_to" ||
              key === "visible_chapter_ids" ||
              key === "visible_event_ids"
            ) {
              fd.append(key, JSON.stringify(form[key]));
            } else {
              fd.append(key, form[key]);
            }
          }
        });

        if (form?.thumbnail) {
          fd.append("thumbnail", form?.thumbnail);
        }

        if (id) {
          fd.append("id", id);
        }

        if (form?.images?.length > 0) {
          form?.images?.forEach((item) => {
            fd.append("images", item);
          });
        }

        if (form?.videos?.length > 0) {
          form?.videos?.forEach((item) => {
            fd.append("videos", item);
          });
        }

        let req;
        if (id) {
          req = serviceUpdateAlbumList(fd);
        } else {
          req = serviceCreateAlbumList(fd);
        }

        req.then((res) => {
          if (!res.error) {
            //  handleToggleSidePannel();
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [
      form,
      isSubmitting,
      setIsSubmitting,
      select,
      selectRelated,
      id,
      selectEvent,
      selectImages,
    ]
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
    // checkFormValidation,
    [
      setErrorData,
      form,
      submitToServer,
      checkFormValidation,
      select,
      selectEvent,
      selectImages,
    ]
  );

  descriptionRef.current = changeTextData;
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    select,
    setSelect,
    selectRelated,
    setSelectRelated,
    id,
    selectEvent,
    setSelectEvent,
    selectImages,
    setSelectImages,
    setSelectVideos,
    selectVideos,
    thumbnail,
    setThumbnail,
    selectImages,
    renderImages,
    renderVideo,
  };
};

export default useAlbumCreateHook;
