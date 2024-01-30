import React, { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceGetPendingEventListDetails } from "../../../services/PendingEventList.service";
import { EventData } from "../../../helper/helper";

function usePendingEventDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [featureValue, setfeatureValue] = useState([]);
  const eventKeys = [...EventData];

  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetPendingEventListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);

  useEffect(() => {
    if (employeeDetail && eventKeys?.length > 0) {
      const feature = { ...employeeDetail?.features };
      let filteredValue = eventKeys.filter(
        (item) => feature[item?.key] !== undefined && feature[item?.key]
      );
      setfeatureValue(filteredValue);
    }
  }, [id, employeeDetail]);

  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);

  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    featureValue,
    toggleRejectDialog,
    rejectDialog,
  };
}

export default usePendingEventDetail;
