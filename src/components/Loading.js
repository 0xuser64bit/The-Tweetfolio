import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={100} width={100} />
);

export default Loading;
