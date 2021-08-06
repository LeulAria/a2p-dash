import React from "react";
import {useParams} from "react-router";

const OrderDetail = () => {
  const {id} = useParams<{id: string}>();

  return <div>Order Detail</div>;
};

export default OrderDetail;
