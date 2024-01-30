import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "./Component/UpperClaimInfo/UpperClaimInfo";
import usePendingEventDetail from "./PendingEventDetail.hook";
import ApproveDialog from "./Component/ApprovePopUp/ApproveDialog.view";
import RejectDialog from "./Component/RejectPopUp/RejectDialog.view";
function PendingEventDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    featureValue,
  } = usePendingEventDetail({});

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <ApproveDialog
          candidateId={id}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
        />
        <RejectDialog
          candidateId={id}
          isOpen={rejectDialog}
          handleToggle={toggleRejectDialog}
        />
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Event Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperClaimInfo data={employeeDetail} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Event Theme</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Primary Color:</span>
                    <span
                      style={{ color: employeeDetail?.theme?.primary_colour }}
                    >
                      {employeeDetail?.theme?.primary_colour}
                    </span>
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Action Color:</span>
                    <span
                      style={{ color: employeeDetail?.theme?.action_colour }}
                    >
                      {employeeDetail?.theme?.action_colour}
                    </span>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Secondary Color:</span>
                    <span
                      style={{ color: employeeDetail?.theme?.secondary_colour }}
                    >
                      {employeeDetail?.theme?.secondary_colour}
                    </span>
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>Menu Text Color:</span>
                    <span
                      style={{ color: employeeDetail?.theme?.menu_text_colour }}
                    >
                      {" "}
                      {employeeDetail?.theme?.menu_text_colour}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.heading}>Event Features</div>
        <div className={styles.otherWrap}>
          <ul className={styles.keysWrpa}>
            {featureValue?.length > 0 &&
              featureValue?.map((item, index) => (
                <li className={styles.eventKeyWrapp} key={`keys_${index}`}>
                  {item?.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Event Access</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.chap}>
                {/* <div>{!employeeDetail?.accessible_to?.all && "All"}</div> */}
                {employeeDetail?.accessibleChapters?.length > 0 && (
                  <div className={styles.mapWrap}>
                    <b>Chapters - </b>
                    <div className={styles.chapCont}>
                      {employeeDetail?.accessibleChapters?.map((item) => (
                        <div className={styles.nameWrap}>{item.name}</div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  {!employeeDetail?.accessible_to?.event_participants &&
                    "Event Participants"}
                </div>
                <div className={styles.gallery}>
                  Gallery is public? -
                  <span>
                    {employeeDetail?.is_gallery_public ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {employeeDetail?.status === "PENDING" && (
        <div
          className={
            employeeDetail?.status === "APPROVED"
              ? styles.approvedWrapper
              : styles.PdfBtnWrapper
          }
        >
          {employeeDetail?.status !== "APPROVED" &&
            employeeDetail?.status !== "ACCOUNTS_APPROVED" && (
              <div className={styles.editBtn2}>
                <ButtonBase
                  className={styles.edit}
                  onClick={toggleRejectDialog}
                >
                  REJECT
                </ButtonBase>
              </div>
            )}

          <div className={styles.btnApproveWrapper}>
            <div>
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.createBtn}
                onClick={toggleStatusDialog}
              >
                {employeeDetail?.status !== "APPROVED" &&
                employeeDetail?.status !== "ACCOUNTS_APPROVED"
                  ? "APPROVE"
                  : "PROCESS"}
              </ButtonBase>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingEventDetail;
