import React from "react";
import {
  serviceDetailsMemberChapter,
  serviceDetailsMemberList,
  serviceDetailsMemberUsers,
} from "../../../services/MemberList.service";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

function useMemberDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [allData, setAllData] = useState({});
  const [userData, setUserData] = useState([]);
  const [otherData, setOtherData] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();

  const toggleApprovalDialog = useCallback(
    (obj) => {
      setIsApprovalPopUp((e) => !e);
      if (obj?.id) {
        setFormValue(obj);
      } else {
        setFormValue({});
      }
    },
    [isApprovalPopUp, formValue]
  );

  console.log("allfd", formValue);
  useEffect(() => {
    if (id) {
      Promise.allSettled([
        serviceDetailsMemberChapter({ member_id: id }),
        serviceDetailsMemberUsers({ member_id: id }),
        serviceDetailsMemberList({ id: id }),
      ]).then((promises) => {
        const memberData = promises[0]?.value?.data;
        const userData = promises[1]?.value?.data;
        const otherData = promises[2]?.value?.data;
        setAllData(memberData);
        setUserData(userData);
        setOtherData(otherData);
      });
    }
  }, [id]);

  const handleAsociateUserDetail = useCallback((data) => {
    historyUtils.push(`${RouteName.USER_PROFILE}${data?.id}`);
  }, []);

  return {
    data,
    id,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
    userData,
    otherData,
    formValue,
    handleAsociateUserDetail,
  };
}

export default useMemberDetail;
