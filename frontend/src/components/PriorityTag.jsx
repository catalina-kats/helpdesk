import { Flex, Tag } from "antd";

const priorityColors = [
  {
    id: 0,
    text: "low",
    color: "gold",
  },
  { id: 1, text: "medium", color: "orange" },
  { id: 2, text: "high", color: "volcano" },
  { id: 3, text: "critical", color: "red" },
];
const PriorityTag = ({ priority }) => {
  const obj = priorityColors.find(p => p.id == priority);
  return (
  <Flex gap="small" align="center" wrap>
    <Tag key={priority} color={obj.color} variant={"solid"}>
      {obj.text.toUpperCase()}
    </Tag>
  </Flex>
)};
export default PriorityTag;
