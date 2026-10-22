import { Avatar, Flex, Listy, Typography, Empty } from "antd";
const { Title } = Typography;
import { UserOutlined } from "@ant-design/icons";
import { stringToDate } from "../../utils/functions";

const CommentsList = ({ items }) => (
  <>
    <Title level={5}>Comments</Title>
    {items && items.length > 0 ? (
      <Listy
        items={items}
        rowKey="id"
        //height={400}
        styles={{ body: { overflowY: "visible" } }}
        itemRender={(item) => (
          <Flex gap="middle" align="flex-start">
            <Avatar icon={<UserOutlined />} />
            <Flex vertical flex="auto" style={{ minWidth: 0 }}>
              <Flex justify="space-between" gap="small">
                <Typography.Text strong>{item.createdBy}</Typography.Text>
                <Typography.Text type="secondary">
                  {stringToDate(item.createdAt)}
                </Typography.Text>
              </Flex>
              <Typography.Text type="secondary">{item.text}</Typography.Text>
            </Flex>
          </Flex>
        )}
      />
    ) : (
      <Empty />
    )}
  </>
);
export default CommentsList;
