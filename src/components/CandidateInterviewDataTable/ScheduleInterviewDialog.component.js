import styles from "./Style.module.css";
import {Close} from "@material-ui/icons";
import CustomDatePicker from "../FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../FormFields/SelectField/SelectField.component";
import {ButtonBase, Dialog, MenuItem, Slide} from "@material-ui/core";
import CustomTextField from "../FormFields/TextField/TextField.component";
import React from "react";
import useScheduleInterview from "./ScheduleInterviewDialog.hook";
import CustomDateTimePicker from "../FormFields/DatePicker/CustomDateTimePicker";
import LogUtils from "../../libs/LogUtils";
import CustomSelect from "../FormFields/SelectField/CustomSelect";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleInterviewDialogComponent = ({isOpen, handleInterviewSchedule, selectedCandidates, jobId, handleDialog, isRecurring}) => {
    const { id, changeTextData, errorData, form, handleDelete, handleReset, handleSubmit, isSubmitting, isLoading, onBlurHandler, removeError, interviewers } = useScheduleInterview({selectedCandidates, jobId, handleInterviewSchedule,isRecurring})
    const filteredArray = interviewers.filter((obj, index, self) => {
        return index === self.findIndex((o) => o?.step === obj?.step);
      });
    const sortedfilteredArray=filteredArray?.length > 0 ? filteredArray.sort((a,b)=>a?.step >b?.step ? 1 :-1):[]
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"md"}
            keepMounted
            TransitionComponent={Transition}
            open={isOpen}
            onClose={handleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // classes={{paper: classes.dialog}}
        >
            <div className={styles.InterviewPopUpWrapper}>
                <div className={styles.closeWrap}>
                    <Close
                        style={{ cursor: "pointer" }}
                        onClick={handleDialog}
                    ></Close>
                </div>

                <div className={styles.loginSignupText}>
                    <h1 className={styles.headingText}>Schedule Interview</h1>
                    <div className={styles.newLine} />
                </div>
                <div>
                    <p>Please fill the below details to schedule the interview</p>
                </div>
                <div className={"formFlex2"}>
                    <div className={"formGroup1"}>
                        <CustomDateTimePicker
                            clearable
                            label={"Date & Time"}
                            minDate={isRecurring ? new Date('1970-01-01') : new Date()}
                            onChange={(date) => {
                              changeTextData(date, "date");
                            }}
                            value={form?.date}
                            isError={errorData?.date}
                        />
                    </div>
                    <div className="formGroup1">
                        <CustomTextField
                            isError={errorData?.venue}
                            errorText={errorData?.venue}
                            label={"Venue"}
                            value={form?.name}
                            onTextChange={(text) => {
                                changeTextData(text, "venue");
                            }}
                            onBlur={() => {
                                onBlurHandler("venue");
                            }}
                        />
                    </div>
                </div >
                <div className={"formFlex2"}>
                    <div className={"formGroup221"}>
                        {
                            isRecurring ? 
                            <CustomSelectField
                            multiple
                            isError={errorData?.sequence_rounds}
                            errorText={errorData?.sequence_rounds}
                            label={"Interview Panel"}
                            value={form?.sequence_rounds}
                            id={'SEQUEST_ROUND'}
                            handleChange={(value) => {
                                LogUtils.log('changeTextData', value);
                              changeTextData(value, "sequence_rounds");
                            }}
                        >
                            {interviewers?.map(val => {
                               return (<MenuItem value={val?.interviewer_id}>{`${val?.name} - ${val?.emp_code}`}</MenuItem>);
                            })}
                        </CustomSelectField> :
                        <CustomSelectField
                        multiple
                        isError={errorData?.sequence_rounds}
                        errorText={errorData?.sequence_rounds}
                        label={"Sequence Rounds"}
                        value={form?.sequence_rounds}
                        id={'SEQUEST_ROUND'}
                        handleChange={(value) => {
                            LogUtils.log('changeTextData', value);
                          changeTextData(value, "sequence_rounds");
                        }}
                    >
                        {sortedfilteredArray?.map(val => {
                           return (<MenuItem value={val?.interviewer_id}>{val?.step}</MenuItem>);
                        })}
                        </CustomSelectField>
                        }
                    </div>
                    <div className={"formGroup1"}>
                        <CustomSelectField
                            isError={errorData?.mode}
                            errorText={errorData?.mode}
                            label={"Mode"}
                            value={form?.mode}
                            handleChange={(value) => {
                              changeTextData(value, "mode");
                            }}
                        >
                            <MenuItem value="IN_PERSON">IN PERSON</MenuItem>
                            <MenuItem value="TELEPHONIC">TELEPHONIC</MenuItem>
                        </CustomSelectField>
                    </div>
                </div>
                <div className={"formFlex2"}>
                    <div className={"formGroup1"}>
                    <CustomTextField
                            isError={errorData?.interview_link}
                            errorText={errorData?.interview_link}
                            label={"Interview Link"}
                            value={form?.name}
                            onTextChange={(text) => {
                                changeTextData(text, "interview_link");
                            }}
                            onBlur={() => {
                                onBlurHandler("interview_link");
                            }}
                        />
                    </div>
                    <div className={"formGroup1"}> </div>
                </div>

                <div className={styles.cleckboxWrapper}>
                    <div className={styles.checkBox}>
                        <input
                            checked={form?.is_send_email_candidates}
                            type="checkbox"
                            id="is_send_email_candidates"
                            name="is_send_email_candidates"
                            onChange={() => {
                                changeTextData(!form?.is_send_email_candidates, 'is_send_email_candidates');
                            }}
                        />
                        <label htmlFor="is_send_email_candidates"> Send Email Invite to Candidates</label>
                        <br />
                    </div>
                    <div className={styles.checkBox}>
                        <input
                            checked={form?.is_send_email_interviewers}
                            type="checkbox"
                            id="is_send_email_interviewers"
                            name="is_send_email_interviewers"
                            onChange={() => {
                                changeTextData(!form?.is_send_email_interviewers, 'is_send_email_interviewers');
                            }}
                        />
                        <label htmlFor="is_send_email_interviewers"> Send Email Invite to Interview Panelist</label>
                        <br />
                    </div>
                </div>

                <div className={styles.confirmedWrapper}>
                    <ButtonBase onClick={handleSubmit} className={styles.createBtn}>SCHEDULE</ButtonBase>
                </div>
            </div>
        </Dialog>
    )
};

export default ScheduleInterviewDialogComponent;
