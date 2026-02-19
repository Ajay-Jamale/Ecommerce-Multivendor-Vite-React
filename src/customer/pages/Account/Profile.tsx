import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import UserDetails from "./UserDetails";
import SavedCards from "./SavedCards";
import OrderDetails from "./OrderDetails";
import Addresses from "./Adresses";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  { name: "Orders", path: "/account/orders", icon: <ShoppingBagIcon /> },
  { name: "Profile", path: "/account/profile", icon: <PersonIcon /> },
  { name: "Saved Cards", path: "/account/saved-card", icon: <CreditCardIcon /> },
  { name: "Addresses", path: "/account/addresses", icon: <LocationOnIcon /> },
  { name: "Logout", path: "/", icon: <LogoutIcon /> },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, orders } = useAppSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") handleLogout();
    else navigate(item.path);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  useEffect(() => {
    if (user.profileUpdated || orders.orderCanceled || user.error) {
      setOpenSnackbar(true);
    }
  }, [user.profileUpdated, orders.orderCanceled, user.error]);

  const getUserInitials = () => {
    if (!user.user?.fullName) return "U";
    return user.user.fullName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 md:px-16 py-10">

    {/* Profile Header */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white rounded-3xl shadow-xl p-8 mb-10">

      <div className="flex flex-col md:flex-row md:items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-white text-indigo-700
                        flex items-center justify-center text-2xl font-extrabold shadow-md">
          {getUserInitials()}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-wide">
            {user.user?.fullName || "User"}
          </h2>
          <p className="text-sm text-indigo-100 mt-1">
            {user.user?.email}
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-6 text-sm">
            <div>
              <p className="text-xl font-bold">
                {orders.orders?.length || 0}
              </p>
              <p className="text-indigo-200">Orders</p>
            </div>
            <div>
              <p className="text-xl font-bold">2</p>
              <p className="text-indigo-200">Cards</p>
            </div>
            <div>
              <p className="text-xl font-bold">1</p>
              <p className="text-indigo-200">Addresses</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Navigation */}
    <div className="flex flex-wrap gap-4 mb-10">

      {menu.map((item) => (
        <div
          key={item.name}
          onClick={() => handleClick(item)}
          className={`
            flex items-center gap-2 px-6 py-3
            rounded-xl cursor-pointer
            font-medium text-sm transition-all duration-200 shadow-sm
            ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }
          `}
        >
          {item.icon}
          {item.name}
        </div>
      ))}

    </div>

    {/* Content Area */}
    <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[450px]">

      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:orderId/:orderItemId" element={<OrderDetails />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/saved-card" element={<SavedCards />} />
        <Route path="/addresses" element={<Addresses />} />
      </Routes>

    </div>

    {/* Snackbar */}
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={user.error ? "error" : "success"}
        variant="filled"
      >
        {user.error
          ? user.error
          : orders.orderCanceled
          ? "Order cancelled successfully"
          : "Profile updated successfully"}
      </Alert>
    </Snackbar>

  </div>
);

};

export default Profile;
