// белая плашка с информацией о событии
import "./index.css";
import Box from "../box";
import FormMiddle from "../form-middle";
import Line from "../line";

export default function Component({ date = "", address = "", type = "" }) {
  return (
    <Box>
      <FormMiddle>
        <div className="details__line">
          <div>Date</div>
          <div>{date}</div>
        </div>
        <Line />
        <div className="details__line">
          <div>Address</div>
          <div>{address}</div>
        </div>
        <Line />
        <div className="details__line">
          <div>Type</div>
          <div>{type}</div>
        </div>
      </FormMiddle>
    </Box>
  );
}
