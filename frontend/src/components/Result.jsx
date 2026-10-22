import { Result } from "antd";

const CustomResult = ({ status, element }) => {
  return <Result status={status} title={`Successfully created ${element}`} />;
};
export default CustomResult;
