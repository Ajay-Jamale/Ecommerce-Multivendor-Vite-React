import { Divider } from "@mui/material";
import React from "react";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/cartCalculator";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const PricingCard = ({ showBuyButton, SubmitButton }: any) => {
  const { cart } = useAppSelector((store) => store);

  const cartItems = cart.cart?.cartItems || [];
  const mrpTotal = sumCartItemMrpPrice(cartItems);
  const sellingTotal = sumCartItemSellingPrice(cartItems);
  const discount = mrpTotal - sellingTotal;
  const shipping = 0;
  const platformFee = 0;
  const orderTotal = cart.cart?.totalSellingPrice ?? sellingTotal;

  const rows = [
    {
      label: "Price",
      value: `₹${mrpTotal.toLocaleString()}`,
      valueClass: "text-gray-800",
    },
    {
      label: "Discount",
      value: `-₹${discount.toLocaleString()}`,
      valueClass: "text-[#007600] font-semibold",
    },
    {
      label: "Shipping",
      value: shipping === 0 ? "FREE" : `₹${shipping}`,
      valueClass: "text-[#007600] font-semibold",
    },
    {
      label: "Platform Fee",
      value: platformFee === 0 ? "FREE" : `₹${platformFee}`,
      valueClass: "text-[#007600] font-semibold",
    },
  ];

  return (
    <div>
      <div className="px-5 pt-4 pb-2 space-y-2.5">
        <h2 className="text-base font-bold text-gray-900 pb-1">Order Summary</h2>
        {rows.map(({ label, value, valueClass }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{label}</span>
            <span className={valueClass}>{value}</span>
          </div>
        ))}
      </div>

      <Divider />

      <div className="px-5 py-3 flex justify-between items-center">
        <span className="text-base font-bold text-gray-900">Order Total</span>
        <span className="text-lg font-bold text-gray-900">
          ₹{orderTotal.toLocaleString()}
        </span>
      </div>

      {discount > 0 && (
        <div className="px-5 pb-3">
          <p className="text-xs text-[#007600] font-semibold bg-green-50 border border-green-200 rounded px-3 py-1.5">
            🎉 You save ₹{discount.toLocaleString()} on this order!
          </p>
        </div>
      )}
    </div>
  );
};

export default PricingCard;