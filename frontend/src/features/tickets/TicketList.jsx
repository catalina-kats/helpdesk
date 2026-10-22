import React from "react";
import { Table, Pagination } from "antd";
import TicketDetailModal from "./TicketDetailModal";
import StatusTag from "../../components/StatusTag";
import PriorityTag from "../../components/PriorityTag";
import { ticketGetApi } from "../../api/TicketService";
import Filters from "./Filters";
import Spinner from "../../components/Spinner";
import { stringToDate } from "../../utils/functions";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    //ender: (text) => {text},
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (_, { priority }) => <PriorityTag priority={priority} />,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => <StatusTag status={status} />,
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { createdAt }) => stringToDate(createdAt),
  },
];

const TicketList = ({counter}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ticketData, setTicketData] = React.useState({});
  const [tickets, setTickets] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(1);
  const [formValues, setFormValues] = React.useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClickRow = (record) => {
    setTicketData(record);
    showModal();
  };

  React.useEffect(() => {
    const query = {
      ...formValues,
      pageSize,
      page,
    };
    ticketGetApi(query)
      .then((res) => {
        console.log(res.data)
        if (res && res.data && res.data.items) {
          setTickets(res?.data.items);
          setTotalItems(res.data.totalCount)
        }
      })
      .catch((e) => {
      });
  }, [pageSize, page, formValues, counter]);

  const onChange = (values) => {
    const query = {
      ...values,
      pageSize,
      page,
    };
    ticketGetApi(query)
      .then((res) => {
        if (res && res.data && res.data.items) {
          setTickets(res?.data.items);
          setTotalItems(res.data.totalCount)
          setFormValues(values)
        }
      })
      .catch((e) => {
        //setPortfolioValues(null);
      });
  }

  const onChangePage = (pg, pgSz) => {
    setPage(pg)
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Filters onFilter={onChange} />

      <Table
        onRow={(record) => ({
          onClick: () => onClickRow(record),
          style: { cursor: "pointer" },
        })}
        columns={columns}
        dataSource={tickets}
        size={"small"}
        onChange={onChange}
        pagination={false}
      />
      {tickets && tickets.length > 0 && (
        <Pagination style={{justifyContent: 'center', paddingTop: 10}} defaultCurrent={1} total={totalItems} onChange={onChangePage} />
      )}
      
      <TicketDetailModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        ticketData={ticketData}
        updateData={onChange}
      />
    </>
  );
};
export default TicketList;
