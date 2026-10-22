import { Select, Form, Input, Grid } from "antd";

const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Filters = ({ onFilter }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const isSmall = !screens.md; // true below 768px

  const onChange = (oldValues, newValues) => {
    if (newValues.sortBy && newValues.sortBy.includes('-')) {
      const sortFilterParts = newValues.sortBy.split('-');
      const sortByVal = sortFilterParts[0];
      const desc = sortFilterParts[1] == 'desc';
      newValues.sortBy = sortByVal;
      newValues.desc = desc;
    }
    const query = {
      ...newValues,
    };
    onFilter(query);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      //onFinish={onFinish}
      onValuesChange={onChange}
      style={{ justifyContent: isSmall ? 'center' : 'right' }}
      layout="inline"
      size="small"
    >
      <Form.Item name="search">
        <Search
          placeholder="Search..."
          allowClear
          style={{ width: 250, marginBottom: 10 }}
          size="small"
        />
      </Form.Item>
      <Form.Item name="sortBy" label="Sort by">
        <Select
          defaultValue="createdAt-desc"
          style={{ width: isSmall ? 200 : 140, textAlign: 'left' }}
          options={[
            { value: "createdAt-desc", label: "Date added, desc" },
            { value: "createdAt-asc", label: "Date added, asc" },
            { value: "priority-desc", label: "Priority, desc" },
            { value: "priority-asc", label: "Priority, asc" },
            { value: "status-desc", label: "Status, desc" },
            { value: "status-asc", label: "Status, asc" },
          ]}
          size="small"
        />
      </Form.Item>
      <Form.Item name="priority" label="Priority">
        <Select
          defaultValue="-1"
          style={{ width: isSmall ? 200 : 120, textAlign: 'left' }}
          options={[
            { value: "-1", label: "All" },
            { value: "0", label: "Low" },
            { value: "1", label: "Medium" },
            { value: "2", label: "High" },
            { value: "3", label: "Critical" },
          ]}
          size="small"
        />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select
          defaultValue="-1"
          style={{ width: isSmall ? 200 : 120, textAlign: 'left' }}
          options={[
            { value: "-1", label: "All" },
            { value: "0", label: "Open" },
            { value: "1", label: "In progress" },
            { value: "2", label: "Solved" },
            { value: "3", label: "Closed" },
          ]}
          size="small"
        />
      </Form.Item>
    </Form>
  );
};
export default Filters;
