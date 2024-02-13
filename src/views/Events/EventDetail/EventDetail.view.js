import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import useEventDetail from "./EventDetail.hook";
import UpperClaimInfo from "../../PendingEvents/PendingEventDetail/Component/UpperClaimInfo/UpperClaimInfo";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import timer from "../../../assets/img/ic_set_timer@2x.png";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import { useCallback } from "react";
import EventDetailCreate from "./EventDetailCreate/EventDetailCreate.view";
import historyUtils from "../../../libs/history.utils";

function EventDetail() {
  const {
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
  } = useEventDetail({});

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Set Timer</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Event Dashboard</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
        <div className={styles.BtnWrapper} >
          <ButtonBase
            onClick={() => editMasterEvent()}
            className={"createBtnMng"}
          >
            Edit Master
          </ButtonBase>
        </div>
      </div>

      <UpperClaimInfo data={employeeDetail} />
      <div className={styles.plainPaper}>
        <div className={styles.toggleWrap}>
          <div className={styles.timerWrap}>
            <div className={styles.uerr}>
              <span className={styles.heading2}>Timer</span>
              <div className={styles.SwitchWrap}>
                <span className={styles.disabled}>Hide</span>
                <CustomSwitch
                  value={form?.is_timer}
                  handleChange={() => {
                    changeTextData(!form?.is_timer, "is_timer");
                  }}
                  label={`Show`}
                />
              </div>
            </div>
            <div className={styles.verti}></div>
            <div className={styles.rightTime} onClick={handleToggleSidePannel}>
              <img src={timer} />
              <div className={styles.timetitle}>SET TIMER</div>
            </div>
          </div>
          {/* <div className={styles.timerWrap}>
            <div className={styles.uerr}>
              <span className={styles.heading2}>Polls</span>
              <div className={styles.SwitchWrap}>
                <span className={styles.disabled}>Hide</span>
                <CustomSwitch
                  value={form?.is_poll}
                  handleChange={() => {
                    changeTextData(!form?.is_poll, "is_poll");
                  }}
                  label={`Show`}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.timerWrap}>
            <div className={styles.uerr}>
              <span className={styles.heading2}>Polls Result</span>
              <div className={styles.SwitchWrap}>
                <span className={styles.disabled}>Hide</span>
                <CustomSwitch
                  value={form?.is_poll_result}
                  handleChange={() => {
                    changeTextData(!form?.is_poll_result, "is_poll_result");
                  }}
                  label={`Show`}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.timerWrap}>
            <div className={styles.uerr}>
              <span className={styles.heading2}>Event Registration</span>
              <div className={styles.SwitchWrap}>
                <span className={styles.disabled}>Hide</span>
                <CustomSwitch
                  value={form?.registration_status}
                  handleChange={() => {
                    changeTextData(
                      !form?.registration_status,
                      "registration_status"
                    );
                  }}
                  label={`Show`}
                />
              </div>
            </div>
          </div> */}
          {employeeDetail?.status !== "PENDING" &&
            employeeDetail?.status !== "INDRAFT" && (
              <div className={styles.timerWrap}>
                <div className={styles.uerr}>
                  <span className={styles.heading2}>Event Status</span>
                  <div className={styles.SwitchWrap}>
                    <span className={styles.disabled}>Upcoming</span>
                    <CustomSwitch
                      value={form?.status}
                      handleChange={() => {
                        changeTextData(!form?.status, "status");
                      }}
                      label={`Upcoming Active`}
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <EventDetailCreate
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={id}
            timer={form?.is_timer}
          />
        </SidePanelComponent>
      </div>
      <div className={styles.keysWrap}>
        {featureValue?.length > 0 &&
          featureValue?.map((item) => (
            <div
              className={styles.eventKeyWrapp}
              onClick={() => handleViewEvents(item?.url)}
            >
              <div className={styles.imgwrap}>
                <img src={item?.image} />
              </div>
              <div className={styles.nameWrapper}>
                <div>{item?.name}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventDetail;
