import React, { useState } from "react";
import { Modal, Select, Grid } from "antd";
import { Descriptions } from "antd";
import CommentsList from "../comments/CommentsList";
import PriorityTag from "../../components/PriorityTag";
import AddCommentSection from "../comments/AddCommentSection";
import { commentGetByTicketIdApi } from "../../api/CommentService";
import { ticketPatchApi } from "../../api/TicketService";

function TicketDetailModal({
  isModalOpen,
  handleOk,
  handleCancel,
  ticketData,
  updateData
}) {
  const screens = Grid.useBreakpoint();
  console.log(ticketData);
  const isSmall = !screens.md; // true below 768px
  const [comments, setComments] = useState([])

  const handleChange = (value) => {
    if (ticketData && ticketData.id) {
      const payload = {
        status: value
      }
      ticketPatchApi(ticketData?.id, payload)
        .then((res) => {
          if (res?.data) {
            console.log(res.data)
            updateData()
          }
        })
        .catch((e) => {
          //setPortfolioValues(null);
        });
    }
  };

  React.useEffect(() => {
    if (ticketData && ticketData.id) {
      console.log(ticketData);
      commentGetByTicketIdApi(ticketData?.id)
        .then((res) => {
          if (res?.data) {
            setComments(res.data)
          }
        })
        .catch((e) => {
          //setPortfolioValues(null);
        });
    }
  }, [ticketData]);

  const handleNewComment = () => {
    if (ticketData && ticketData.id) {
      commentGetByTicketIdApi(ticketData?.id)
        .then((res) => {
          if (res?.data) {
            setComments(res.data);
          }
        })
        .catch((e) => {
          //setPortfolioValues(null);
        });
    }
  }

  const items = [
    {
      key: "1",
      label: "Title",
      children: ticketData?.title,
      span: 2,
    },
    {
      key: "2",
      label: "Created by",
      children: ticketData?.createdBy,
    },
    {
      key: "3",
      label: "Description",
      children: ticketData?.description,
      span: 2,
    },
    {
      key: "4",
      label: "Date added",
      children: ticketData?.createdAt,
    },
    {
      key: "5",
      label: "Priority",
      children: <PriorityTag priority={ticketData?.priority} />,
      span: 1,
    },
    {
      key: "6",
      label: "Status",
      children: (
        <Select
          value={ticketData?.status}
          style={{ width: 120 }}
          onChange={handleChange}
          size={"small"}
          options={[
            {
              value: 0,
              label: "open",
              disabled: 0 !== ticketData?.status + 1 && 0 !== ticketData?.status
            },
            {
              value: 1,
              label: "in progress",
              disabled: 1 !== ticketData?.status + 1 && 1 !== ticketData?.status
            },
            {
              value: 2,
              label: "resolved",
              disabled: 2 !== ticketData?.status + 1 && 2 !== ticketData?.status
            },
            {
              value: 3,
              label: "closed",
              disabled: 3 !== ticketData?.status + 1 && 3 !== ticketData?.status
            },
          ]}
        />
      ),
      span: 1,
    },
  ];
  return (
    <Modal
      title="Ticket details"
      className="modal-top"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={<></>}
      width={isSmall ? "100%" : "60%"}
      style={
        isSmall
          ? {
              body: { overflowY: "auto" },
              left: 0,
              top: 0,
              maxWidth: "100vw",
              margin: 0,
              padding: 0,
            }
          : { body: { overflowY: "auto" } }
      }
      //styles={}
    >
      <Descriptions size="small" layout="vertical" items={items} />
      <CommentsList items={comments} />
      <AddCommentSection ticketId={ticketData.id} handleNewComment={handleNewComment} />
    </Modal>
  );
}

export default TicketDetailModal;
