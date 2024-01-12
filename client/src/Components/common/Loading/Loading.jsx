/* 
  Main loader for whole application
*/

import React from "react";

// Antd
import { Spin, Space } from "antd";

import "./style.scss";

function Loading() {
  return (
    <div className="loading-bg w-[100%] h-[100vh] flex justify-center items-center">
      <Space className="loader" size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}

export default Loading;
