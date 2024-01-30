import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import {
  serviceDeleteCommentFeed,
  serviceGetEventFeedDetails,
} from "../../../../services/EventFeed.service";

const useAssociateDialogHook = ({ isOpen, handleToggle, data }) => {
  const [dataValue, setDataValue] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (data?.id && !isSubmitting) {
      setIsSubmitting(true);
      serviceGetEventFeedDetails({ post_id: data?.id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setDataValue(data);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
        setIsSubmitting(false);
      });
    }
  }, [data?.id]);

  const handleDeleteComment = useCallback(
    (obj) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        serviceDeleteCommentFeed({ comment_id: obj }).then((res) => {
          if (!res.error) {
            SnackbarUtils.success("Deleted Successfully");
            handleToggle();
            window.location.reload();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [setIsSubmitting, isSubmitting, dataValue, id]
  );

  return {
    dataValue,
    isSubmitting,
    handleDeleteComment,
  };
};

export default useAssociateDialogHook;
