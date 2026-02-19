import React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import { teal } from '@mui/material/colors';
import { Button } from '@mui/material';

const SavedCards = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:min-h-[60vh] gap-10 p-6 bg-teal-50 rounded-3xl shadow-lg">

      {/* Icon */}
      <div className="bg-teal-100 p-6 rounded-full shadow-md animate-bounce">
        <AddCardIcon sx={{ color: teal[600], fontSize: "120px" }} />
      </div>

      {/* Text Section */}
      <div className="text-center w-full lg:w-[70%] space-y-4">
        <h1 className="font-extrabold text-2xl text-teal-700 uppercase tracking-wide">
          Save Your Credit / Debit Cards
        </h1>
        <p className="text-gray-700 text-sm">
          Make payments faster and more secure. Your card information is protected with 128-bit encryption.
        </p>

        {/* Add Card Button */}
        <div className="mt-4">
          <Button
            variant="contained"
            sx={{
              backgroundColor: teal[600],
              "&:hover": { backgroundColor: teal[700] },
              px: 6,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Add New Card
          </Button>
        </div>
      </div>

    </div>
  );
};

export default SavedCards;
