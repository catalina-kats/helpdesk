import React from 'react';
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <>
      <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} fullscreen />
    </>
  );
};
export default Spinner;