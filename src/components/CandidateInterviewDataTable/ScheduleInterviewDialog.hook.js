import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import {isAlphaNumChars, isSpace} from "../../libs/RegexUtils";
import LogUtils from "../../libs/LogUtils";
import {useDispatch, useSelector} from "react-redux";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {serviceScheduleInterview} from "../../services/JobOpenings.service";
import {actionGetJobOpeningCandidates} from "../../actions/JobOpeningDetail.action";




const useScheduleInterview = ({jobId, handleInterviewSchedule, selectedCandidates,isRecurring}) => {
    const initialForm = {
        date: null,
        time: null,
        sequence_rounds: [],
        mode: 'IN_PERSON',
        interview_link: '',
        venue: '',
        is_send_email_candidates: isRecurring ? false :true,
        is_send_email_interviewers: isRecurring ? false :true,
    };
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const dispatch = useDispatch();
    const {interviewers} = useSelector((state) => state.job_opening_detail);

    // const steps = useMemo(() => {
    //     return interviewers.map(val => val.step);
    // }, [interviewers]);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['date', 'sequence_rounds', 'mode', 'venue'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if ([].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        })
        return errors;
    }, [form, errorData]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const candidatIds = selectedCandidates.map(val => val.candidate_id);
            //start

            const interviewerIdBySequence=interviewers.filter((item)=>form?.sequence_rounds.includes(item.interviewer_id))
            const getId=interviewerIdBySequence.map((item)=>item.step)
            const IDSameStep=interviewers.filter(obj => getId.includes(obj.step));
            const getInterviewerIds= IDSameStep.map((item)=>item.interviewer_id)

            // end
            const interviewerIds = getInterviewerIds;
            const steps = [];
            interviewerIds.forEach((val) => {
                const index = interviewers.findIndex(interviewer => interviewer.interviewer_id === val);
                if (index >= 0) {
                    steps.push({
                        interviewer_id: val,
                        step: interviewers[index]?.step
                    });
                }
                ;
            });
            serviceScheduleInterview({
                ...form,
                interview_date: form?.date,
                sequence_rounds: steps,
                interviewers: interviewerIds,
                id: jobId,
                candidateIds: candidatIds,
                link: form?.interview_link
            }).then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    dispatch(actionGetJobOpeningCandidates(jobId));
                    handleInterviewSchedule();
                } else {
                    SnackbarUtils.success(res.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, jobId, interviewers, handleInterviewSchedule, selectedCandidates]);

    const submitToServerRP = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const candidatIds = selectedCandidates.map(val => val.candidate_id);
            const interviewerIds = form?.sequence_rounds;
            const steps = [];
            interviewerIds.forEach((val) => {
                const index = interviewers.findIndex(interviewer => interviewer.interviewer_id === val);
                if (index >= 0) {
                    steps.push({
                        interviewer_id: val,
                        step: interviewers[index]?.step
                    });
                }
                ;
            });

            serviceScheduleInterview({
                ...form,
                interview_date: form?.date,
                sequence_rounds: steps,
                interviewers: form?.sequence_rounds,
                id: jobId,
                candidateIds: candidatIds,
                link: form?.interview_link
            }).then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    dispatch(actionGetJobOpeningCandidates(jobId));
                    handleInterviewSchedule();
                } else {
                    SnackbarUtils.success(res.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, jobId, interviewers, handleInterviewSchedule, selectedCandidates]);
    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        LogUtils.log('errors', errors);
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        if(isRecurring){
            submitToServerRP()
        }
        else{
            submitToServer();
        }

    }, [
        checkFormValidation,
        setErrorData,
        form,
        submitToServer
    ]);

    const removeError = useCallback(
        title => {
            const temp = JSON.parse(JSON.stringify(errorData));
            temp[title] = false;
            setErrorData(temp);
        },
        [setErrorData, errorData],
    );

    const changeTextData = useCallback((text, fieldName) => {
        let shouldRemoveError = true;
        const t = {...form};
        if (fieldName === 'venue') {
            if (!text || (isAlphaNumChars(text))) {
                t[fieldName] = text;
            }
        } else {
            t[fieldName] = text;
        }
        setForm(t);
        shouldRemoveError && removeError(fieldName);
    }, [removeError, form, setForm]);

    const onBlurHandler = useCallback(
        type => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        }, [changeTextData]);

    const handleDelete = useCallback(() => {

    }, []);


    const handleReset = useCallback(() => {
        setForm({...initialForm})
    }, [form])

    return {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        handleSubmit,
        isLoading,
        isSubmitting,
        errorData,
        handleDelete,
        handleReset,
        interviewers
    };
};

export default useScheduleInterview;
