import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import OrderStepper from "./OrderStepper";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { cancelOrder, fetchOrderById, fetchOrderItemById } from "../../../Redux Toolkit/Customer/OrderSlice";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { auth, orders } = useAppSelector((store) => store);
  const { orderItemId, orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrderItemById({
      orderItemId: Number(orderItemId),
      jwt: localStorage.getItem("jwt") || ""
    }));
    dispatch(fetchOrderById({
      orderId: Number(orderId),
      jwt: localStorage.getItem("jwt") || ""
    }));
  }, [auth.jwt]);

  if (!orders.orders || !orders.orderItem) {
    return (
      <div className="h-[80vh] flex justify-center items-center text-gray-500 font-medium">
        No order found
      </div>
    );
  }

  const handleCancelOrder = () => dispatch(cancelOrder(orderId));

  return (
    <Box className="space-y-8">

      {/* Product Info Card */}
      <Box className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-4">
        <img className="w-32 h-32 object-cover rounded-xl" src={orders.orderItem?.product.images[0]} alt="" />
        <div className="text-center space-y-1">
          <h1 className="font-bold text-lg text-gray-800">
            {orders.orderItem?.product.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-600">{orders.orderItem?.product.title}</p>
          <p className="text-gray-500"><strong>Size:</strong> M</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/reviews/${orders.orderItem?.product.id}/create`)}
          className="mt-2"
        >
          Write Review
        </Button>
      </Box>

      {/* Order Status Stepper */}
      <Box className="bg-white rounded-3xl shadow-lg p-6">
        <OrderStepper orderStatus={orders.currentOrder?.orderStatus} />
      </Box>

      {/* Delivery Address */}
      <Box className="bg-white rounded-3xl shadow-lg p-6">
        <h1 className="font-bold text-gray-800 mb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-4 font-medium text-gray-700">
            <p>{orders.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{orders.currentOrder?.shippingAddress.mobile}</p>
          </div>
          <p className="text-gray-600">
            {orders.currentOrder?.shippingAddress.address}, {orders.currentOrder?.shippingAddress.city}, {orders.currentOrder?.shippingAddress.state} - {orders.currentOrder?.shippingAddress.pinCode}
          </p>
        </div>
      </Box>

      {/* Pricing & Payment */}
      <Box className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center text-gray-700">
          <div>
            <p className="font-semibold">Total Item Price</p>
            <p className="text-green-600 text-sm mt-1">
              You saved ₹{orders.orderItem?.mrpPrice - orders.orderItem?.sellingPrice}.00
            </p>
          </div>
          <p className="font-bold text-gray-800">₹{orders.orderItem?.sellingPrice}.00</p>
        </div>

        <div className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-lg w-max">
          <PaymentsIcon fontSize="small" />
          <p className="text-xs font-medium">Pay On Delivery</p>
        </div>

        <Divider />

        <p className="text-xs text-gray-500">
          <strong>Sold by:</strong> {orders.orderItem.product.seller?.businessDetails.businessName}
        </p>

        <Button
          disabled={orders.currentOrder?.orderStatus === "CANCELLED"}
          onClick={handleCancelOrder}
          variant="contained"
          color="error"
          fullWidth
          className="mt-2 py-3"
        >
          {orders.currentOrder?.orderStatus === "CANCELLED" ? "Order Canceled" : "Cancel Order"}
        </Button>
      </Box>

    </Box>
  );
};

export default OrderDetails;
