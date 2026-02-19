import {
  Avatar,
  Box,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProfileFildCard from "../../../seller/pages/Account/ProfileFildCard";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { teal } from "@mui/material/colors";

const UserDetails = () => {
  const { user } = useAppSelector((store) => store);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%] space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-teal-700 uppercase tracking-wide">
            Personal Details
          </h1>
          <Button
            size="small"
            sx={{
              borderRadius: "2.5rem",
              bgcolor: teal[500],
              "&:hover": { bgcolor: teal[600] },
            }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </div>

        {/* Profile Avatar */}
        <div className="flex justify-center">
          <Avatar
            sx={{
              width: "8rem",
              height: "8rem",
              bgcolor: teal[300],
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {user.user?.fullName
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </Avatar>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <Box className="p-5 bg-teal-50 rounded-xl shadow-sm">
            <ProfileFildCard keys="Name" value={user.user?.fullName} />
          </Box>
          <Box className="p-5 bg-teal-50 rounded-xl shadow-sm">
            <ProfileFildCard keys="Email" value={user.user?.email} />
          </Box>
          <Box className="p-5 bg-teal-50 rounded-xl shadow-sm">
            <ProfileFildCard keys="Mobile" value={user.user?.mobile} />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
