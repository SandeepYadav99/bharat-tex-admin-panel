import React, { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceGetEventBoolsDetails,
  serviceGetEventListDetails,
  serviceUpdateEventPoll,
  serviceUpdateEventReg,
  serviceUpdateEventStatus,
  serviceUpdateEventTimer,
} from "../../../services/EventList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { EventData } from "../../../helper/helper";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";

const initialForm = {
  is_timer: false,
  registration_status: false,
  status: false,
  is_poll: false,
  is_poll_result: false,
};

function useEventDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const [isSidePanel, setSidePanel] = useState(false);
  const [featureValue, setfeatureValue] = useState([]);
  const { id } = useParams();
  const eventKeys = [...EventData];

  useEffect(() => {
    let req = serviceGetEventListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  useEffect(() => {
    let req = serviceGetEventBoolsDetails({ id: id });
    req.then((data) => {
      const boolData = data?.data?.details;
      let res = {};
      Object.keys({ ...initialForm }).forEach((key) => {
        if (key === "status") {
          res[key] = boolData[key] === "ONGOING";
        } else {
          res[key] = boolData[key];
        }
      });
      setForm({ ...form, ...res });
    });
  }, [id]);


  useEffect(() => {
    if (employeeDetail && eventKeys?.length > 0) {
      const feature = { ...employeeDetail?.features };
   
      let filteredValue = eventKeys.filter(
        (item) => feature[item?.key] !== undefined && feature[item?.key]
      );
      console.log(employeeDetail.testimonial);
      setfeatureValue(filteredValue);
    }
  }, [id, employeeDetail]);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);

      submitToServer(fieldName, t);
    },
    [form, setForm]
  );

  const submitToServer = useCallback(
    (fieldName, fd) => {
      let req;
      if (fieldName === "registration_status") {
        req = serviceUpdateEventReg({
          id: id,
          registration_status: fd[fieldName] ? true : false,
        });
      } else if (fieldName === "status") {
        req = serviceUpdateEventStatus({
          id: id,
          status: fd[fieldName] ? "ONGOING" : "UPCOMING",
        });
      } else if (fieldName === "is_timer") {
        req = serviceUpdateEventTimer({
          id: id,
          is_timer: fd[fieldName] ? true : false,
        });
      } else {
        if (fieldName === "is_poll") {
          req = serviceUpdateEventPoll({
            id: id,
            is_poll: fd[fieldName] ? true : false,
          });
        } else {
          req = serviceUpdateEventPoll({
            id: id,
            is_poll_result: fd[fieldName] ? true : false,
          });
        }
      }
      req.then((res) => {
        if (!res.error) {
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
      });
    },
    [form, id]
  );

  const handleViewEvents = useCallback(
    (data) => {
      console.log("data", data);
      if (data) {
        historyUtils.push(data + id);
      }
    },
    [id]
  );

  const editMasterEvent = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENTS_UPDATE}${id}`); //+data.id
  }, [id]);

  const handleViewEventsPush = useCallback((data)=>{
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EXHIBITOR_LIST}`); 
  })

  
  return {
    id,
    employeeDetail,
    handleToggleSidePannel,
    isSidePanel,
    changeTextData,
    form,
    featureValue,
    handleViewEvents,
    editMasterEvent,
    handleViewEventsPush,
  };
}

export default useEventDetail;
