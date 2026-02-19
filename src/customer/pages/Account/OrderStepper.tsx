import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface Step {
  name: string;
  description: string;
  value: string;
}

interface OrderStepperProps {
  orderStatus: string;
}

const steps: Step[] = [
  { name: "Order Placed", description: "Order received", value: "PLACED" },
  { name: "Packed", description: "Packed in warehouse", value: "CONFIRMED" },
  { name: "Shipped", description: "On the way", value: "SHIPPED" },
  { name: "Arriving", description: "Expected delivery", value: "ARRIVING" },
  { name: "Delivered", description: "Order delivered", value: "DELIVERED" },
];

const canceledSteps: Step[] = [
  { name: "Order Placed", description: "Order received", value: "PLACED" },
  { name: "Order Canceled", description: "Order has been canceled", value: "CANCELLED" },
];

const OrderStepper: React.FC<OrderStepperProps> = ({ orderStatus }) => {
  const [statusSteps, setStatusSteps] = useState<Step[]>(steps);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusSteps(canceledSteps);
      setCurrentIndex(1);
    } else {
      setStatusSteps(steps);
      const index = steps.findIndex((s) => s.value === orderStatus);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [orderStatus]);

  return (
    <Box className="w-full px-4 md:px-10 my-10">
      {/* Steps container */}
      <Box className="relative flex items-center justify-between">
        {/* Horizontal progress line */}
        <Box className="absolute top-4 left-0 w-full h-1 bg-gray-300 rounded-full z-0">
          <Box
            className="h-1 rounded-full bg-teal-500"
            style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
          />
        </Box>

        {/* Step circles */}
        {statusSteps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isCanceled = orderStatus === "CANCELLED" && step.value === "CANCELLED";

          return (
            <Box key={index} className="relative flex flex-col items-center z-10">
              {/* Circle */}
              <Box
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white
                  ${isCanceled ? "bg-red-500" : isCurrent || isCompleted ? "bg-teal-500" : "bg-gray-300"}
                `}
              >
                {/* Tick appears on current and completed */}
                <CheckCircleIcon fontSize="small" />
              </Box>

              {/* Step name */}
              <p
                className={`text-xs mt-2 font-semibold text-center 
                  ${isCanceled ? "text-red-600" : isCurrent || isCompleted ? "text-teal-700" : "text-gray-500"}
                `}
              >
                {step.name}
              </p>

              {/* Step description */}
              <p className="text-[10px] text-gray-400 text-center">{step.description}</p>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OrderStepper;
