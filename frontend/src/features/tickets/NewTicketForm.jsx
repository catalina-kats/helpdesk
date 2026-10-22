import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { ticketPostApi } from "../../api/TicketService";
import Spinner from "../../components/Spinner";

const NewTicketForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    ticketPostApi(values)
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
          onSuccess();
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      //style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      {isLoading && <Spinner />}
      <Form.Item
        label="Title"
        name="title"
        type="string"
        rules={[
          { required: true, message: "${label} is required" },
          { min: 3, message: "At least 3 characters required" },
          { max: 50, message: "Max 50 characters" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        type="string"
        rules={[
          { required: true, message: "${label} is required" },
          { min: 3, message: "At least 3 characters required" },
          { max: 300, message: "Max 300 characters" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select
          defaultValue={0}
          style={{ width: 120 }}
          size={"small"}
          options={[
            {
              value: 0,
              label: "Low",
            },
            {
              value: 1,
              label: "Medium",
            },
            {
              value: 2,
              label: "High",
            },
            {
              value: 3,
              label: "Critical",
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit ticket
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewTicketForm;
