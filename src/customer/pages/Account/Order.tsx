  import React, { useEffect } from "react";
  import OrderItemCard from "./OrderItemCard";
  import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
  import { fetchUserOrderHistory } from "../../../Redux Toolkit/Customer/OrderSlice";

  const Order = () => {
    const dispatch = useAppDispatch();
    const { auth, orders } = useAppSelector((store) => store);

    useEffect(() => {
      dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
    }, [auth.jwt]);

    const orderList = orders?.orders || [];
return (
  <div className="w-full">

    {/* Header */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white rounded-3xl shadow-lg p-8 mb-10">
      <h1 className="text-2xl font-bold">
        Order History
      </h1>
      <p className="text-indigo-100 mt-2 text-sm">
        Total Orders: <span className="font-semibold">{orderList.length}</span>
      </p>
    </div>

    {/* Orders Section */}
    {orderList.length > 0 ? (
      <div className="space-y-8">
        {orderList.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl shadow-lg p-8 
                       hover:shadow-2xl transition-all duration-300"
          >
            {/* Order Info */}
            <div className="flex flex-col md:flex-row md:justify-between 
                            gap-6 mb-6 pb-6 border-b border-gray-200">

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Order ID
                </p>
                <p className="text-sm font-medium text-gray-800">
                  #{order.id}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Total Items
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {order.orderItems?.length}
                </p>
              </div>

            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {order.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-2xl p-5 
                             hover:bg-gray-100 transition"
                >
                  <OrderItemCard item={item} order={order} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ) : (
      /* Empty State */
      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                        bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 text-xl font-bold">
            🛍
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          No Orders Found
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          You have not placed any orders yet.
        </p>
      </div>
    )}

  </div>
);

  };

  export default Order;
