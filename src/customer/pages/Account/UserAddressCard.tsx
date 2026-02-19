import React from 'react';
import type { Address } from '../../../types/userTypes';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { teal } from '@mui/material/colors';

const UserAddressCard = ({ item }: { item: Address }) => {
  return (
    <div className="p-6 bg-teal-50 rounded-2xl shadow-md border border-teal-200 hover:shadow-lg transition-all cursor-pointer">

      {/* Name */}
      <h1 className="font-bold text-teal-700 text-lg">{item.name}</h1>

      {/* Address */}
      <p className="text-gray-700 mt-2 text-sm">
        {item.address}, {item.locality}, {item.city}, {item.state} - {item.pinCode}
      </p>

      {/* Mobile */}
      <p className="text-gray-700 mt-1 text-sm"><strong>Mobile:</strong> {item.mobile}</p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="contained"
          size="small"
          startIcon={<EditIcon />}
          sx={{ backgroundColor: teal[600], "&:hover": { backgroundColor: teal[700] }, textTransform: "none" }}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserAddressCard;
