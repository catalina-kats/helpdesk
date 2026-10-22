import React, { useState } from "react";
import { Typography, Input, Form, Space, Button, Spin } from "antd";
import { commentPostApi } from "../../api/CommentService";
const { Title } = Typography;

const AddCommentSection = ({ ticketId, handleNewComment }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const onFinish = (formData) => {
    setLoading(true);
    const data = {
      ...formData,
      ticketId,
    };
    commentPostApi(ticketId, data)
      .then((res) => {
        if (res?.data) {
          handleNewComment();
          form.resetFields();
        }
      })
      .catch((e) => {
        //setPortfolioValues(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Title level={5}>Add a comment</Title>
      <Form
        layout={"vertical"}
        form={form}
        //style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="text"
          type="string"
          rules={[
            { required: true, message: "${label} is required" },
            { min: 3, message: "At least 3 characters required" },
            { max: 400, message: "Max 400 characters" },
          ]}
        >
          <Input.TextArea rows={4} value="" />
        </Form.Item>
        <Form.Item label={null}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {isLoading && <Spin />}
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddCommentSection;
