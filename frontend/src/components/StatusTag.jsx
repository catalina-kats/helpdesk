import { Flex, Tag } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleFilled,
  LockFilled,
  SyncOutlined,
} from "@ant-design/icons";

const statusColors = [
  {
    id: 0,
    status: "open",
    text: "open",
    color: "warning",
    icon: <ClockCircleOutlined />,
  },
  {
    id: 1,
    status: "inprogress",
    text: "in progress",
    color: "processing",
    icon: <SyncOutlined spin />,
  },
  {
    id: 2,
    status: "resolved",
    text: "resolved",
    color: "success",
    icon: <CheckCircleFilled />,
  },
  {
    id: 3,
    status: "closed",
    text: "closed",
    color: "default",
    icon: <LockFilled />,
  },
];

const StatusTag = ({status}) => {
  const obj = statusColors.find((el) => el.id == status);
  return (
    <Flex gap="small" align="center" wrap>
      <Tag key={status} color={obj.color} icon={obj.icon} variant={"solid"}>
        {obj.text}
      </Tag>
    </Flex>
  );
};
export default StatusTag;
