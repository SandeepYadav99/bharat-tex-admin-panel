import styles from "./Style.module.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { servicePollDetail } from "../../actions/PollResults.action";
import PieChart from "./PieChart";

const PollResult = () => {
  const dispatch = useDispatch();

  let params = {
    event_id: "6506c66b16a405bd4498f3df",
  };

  useEffect(() => {
    dispatch(servicePollDetail({ ...params }));
  }, []);

  const { pollInfo } = useSelector((state) => state.Poll);

  return (
    <div className={styles.container}>
      {pollInfo?.data?.map((val, i) => {
        return (
          <>
            <Paper
              elevation={3}
              style={{ padding: "20px", margin: "20px", width: "70%" }}
            >
              <Typography
                variant="h6"
                component="div"
                style={{ marginBottom: "10px" }}
              >
                {val?.poll_question}
              </Typography>
              <PieChart optionsData={val?.options} />
            </Paper>
          </>
        );
      })}
    </div>
  );
};

export default PollResult;
