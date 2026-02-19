import React from 'react';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Avatar, Button } from '@mui/material';
import { teal, amber } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import type { Order, OrderItem } from '../../../types/orderTypes';
import { formatDate } from '../../util/fomateDate';

interface OrderItemCardProps {
  item: OrderItem;
  order: Order;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, order }) => {
  const navigate = useNavigate();

  // Choose color based on order status
  const statusColor = order.orderStatus === "DELIVERED"
    ? "bg-green-100 text-green-700"
    : order.orderStatus === "CANCELLED"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div
      onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)}
      className="cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-200"
    >
      {/* Status Header */}
      <div className={`flex items-center gap-3 px-4 py-2 ${statusColor}`}>
        <Avatar sx={{ bgcolor: teal[500], width: 36, height: 36 }}>
          <ElectricBoltIcon />
        </Avatar>
        <div>
          <h2 className="font-bold text-sm">{order.orderStatus}</h2>
          <p className="text-xs text-gray-600">Arriving by {formatDate(order.deliverDate)}</p>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex gap-4 p-4 bg-teal-50">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={item.product.images[0]}
          alt={item.product.title}
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-teal-600 text-sm">
              {item.product.seller?.businessDetails.businessName}
            </h3>
            <p className="text-gray-700 text-sm">{item.product.title}</p>
            <p className="text-gray-600 text-xs">
              <strong>Size:</strong> FREE
            </p>
          </div>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 2, alignSelf: 'start' }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
