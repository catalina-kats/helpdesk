import { useState } from "react";
import "./App.css";
import { Button, Modal, Grid, Layout, Typography, Row, Col, theme } from "antd";
import TicketList from "./features/tickets/TicketList";
import NewTicketForm from "./features/tickets/NewTicketForm";
import { PlusOutlined } from "@ant-design/icons";
import CustomResult from "./components/Result";
import { ToastContainer } from 'react-toastify';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const screens = Grid.useBreakpoint();
  const isSmall = !screens.md; // true below 768px
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [counter, setCounter] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSuccess = () => {
    setIsModalOpen(false);
    setSuccess(false);
  };

  const onSuccess = () => {
    setSuccess(true);
    setTimeout(handleSuccess, 3000);
    setCounter((k) => k + 1);
  };

  const onError = () => setSuccess(false);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "white",
          padding: isSmall ? "0px 10px" :  "0px 24px",
        }}
      >
        <Title level={2}>HelpDesk</Title>
      </Header>
      <Content style={{ padding: "0 0" }}>
        <div
          style={{
            padding: isSmall ? "0px 10px" : "0px 24px",
            minHeight: 380,
            background: "white",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ textAlign: "left" }}>
                Tickets
              </Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                Add ticket
              </Button>
            </Col>
          </Row>

          <TicketList counter={counter} />

          <Modal
            title="Add ticket"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onCancel={handleCancel}
            width={isSmall ? "100%" : "40%"}
            style={
              isSmall
                ? {
                    body: { overflowY: "auto" },
                    left: 0,
                    maxWidth: "100vw",
                    margin: 0,
                    padding: 0,
                  }
                : { body: { overflowY: "auto" } }
            }
            footer={<></>}
          >
            {isSuccess ? (
              <CustomResult status="success" element=" ticket" />
            ) : (
              <NewTicketForm onSuccess={onSuccess} onError={onError} />
            )}
          </Modal>
        </div>
      </Content>
      <ToastContainer />
    </Layout>
  );
}

export default App;
