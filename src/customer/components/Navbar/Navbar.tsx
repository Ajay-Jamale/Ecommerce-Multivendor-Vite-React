import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { FavoriteBorder } from "@mui/icons-material";
import { mainCategory } from "../../../data/category/mainCategory";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, cart, sellers } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(searchProduct(searchQuery));
    navigate(`/search-products?query=${searchQuery}`);
    setMobileSearchOpen(false);
  };

  const becomeSellerClick = () => {
    sellers.profile?.id ? navigate("/seller") : navigate("/become-seller");
  };

  const getInitial = () => {
    if (!user.user?.fullName) return "";
    return user.user.fullName.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        zIndex: 50,
        position: "sticky",
        top: 0,
        width: "100%",
      }}
      className="navbar"
    >
      {/* Top Amazon-style header */}
      <div className="navbar-top">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 px-3 sm:px-4 md:px-6 lg:px-8 h-[56px]">
          {/* Hamburger for mobile */}
          {isSmall && (
            <IconButton
              onClick={toggleDrawer(true)}
              size="small"
              sx={{ color: "#ffffff" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-1 sm:gap-2 pr-2"
          >
            <StorefrontIcon
              sx={{ color: "#FFD814", fontSize: { xs: 26, sm: 30 } }}
            />
            <div className="flex flex-col leading-tight">
              <span className="logo text-lg sm:text-xl text-white">
                Shopzy
              </span>
              <span className="text-[11px] text-gray-200 hidden sm:block">
                .inspired shopping
              </span>
            </div>
          </div>

          {/* Deliver to */}
          {!isSmall && (
            <button
              type="button"
              className="hidden md:flex flex-col items-start px-2 text-xs text-white hover:outline hover:outline-1 hover:outline-white rounded-sm"
            >
              <span className="text-[11px] text-gray-200">Deliver to</span>
              <span className="flex items-center gap-1 font-semibold">
                <RoomOutlinedIcon sx={{ fontSize: 16 }} />
                <span>{user.user?.fullName ? user.user.fullName.split(" ")[0] : "Update location"}</span>
              </span>
            </button>
          )}

          {/* Search – full width on desktop, icon-only on very small */}
          {!isSmall ? (
            <Box
              className="navbar-search"
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "stretch",
                ml: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#f3f3f3",
                  px: 1.5,
                  display: "flex",
                  alignItems: "center",
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  fontSize: 12,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                All
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                }}
              >
                <InputBase
                  placeholder="Search Shopzy"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  inputProps={{
                    className: "navbar-search-input",
                  }}
                  sx={{ fontSize: 14 }}
                />
              </Box>
              <Box
                onClick={handleSearch}
                sx={{
                  backgroundColor: "#febd69",
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  "&:hover": { backgroundColor: "#f3a847" },
                }}
              >
                <SearchIcon sx={{ color: "#111", fontSize: 22 }} />
              </Box>
            </Box>
          ) : (
            <IconButton
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              sx={{ color: "#ffffff", marginLeft: "auto" }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Account / Orders / Cart */}
          {!isSmall && (
            <div className="flex items-center gap-3 ml-3 text-white text-xs">
              <button
                type="button"
                onClick={() => (user.user ? navigate("/account/orders") : navigate("/login"))}
                className="text-left hover:outline hover:outline-1 hover:outline-white rounded-sm px-1"
              >
                <span className="block text-[11px]">
                  Hello, {user.user ? user.user.fullName.split(" ")[0] : "sign in"}
                </span>
                <span className="block font-semibold text-sm">
                  Account &amp; Lists
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/account/orders")}
                className="text-left hover:outline hover:outline-1 hover:outline-white rounded-sm px-1 hidden lg:block"
              >
                <span className="block text-[11px]">Returns</span>
                <span className="block font-semibold text-sm">&amp; Orders</span>
              </button>
            </div>
          )}

          {/* Wishlist and Cart – always visible */}
          <div className="flex items-center gap-2 ml-auto sm:ml-2">
            <IconButton
              onClick={() => navigate("/wishlist")}
              size="small"
              sx={{ color: "#ffffff" }}
            >
              <FavoriteBorder sx={{ fontSize: 20 }} />
            </IconButton>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative flex items-end gap-1 text-white hover:outline hover:outline-1 hover:outline-white rounded-sm px-1 pb-1"
            >
              <Badge
                badgeContent={cart.cart?.cartItems?.length || 0}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#f08804",
                    color: "#111",
                    fontWeight: 700,
                  },
                }}
              >
                <AddShoppingCartIcon sx={{ fontSize: 26 }} />
              </Badge>
              <span className="hidden sm:block font-semibold text-sm">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSmall && mobileSearchOpen && (
          <div className="px-3 pb-2 bg-[#131921]">
            <div className="flex items-stretch bg-white rounded-md overflow-hidden">
              <InputBase
                placeholder="Search Shopzy"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                sx={{ px: 1.5, py: 0.5, fontSize: 14 }}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="px-3 bg-[#febd69] flex items-center justify-center"
              >
                <SearchIcon sx={{ color: "#111" }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav row with categories */}
      <div className="navbar-bottom">
        <div className="flex items-center gap-3 px-3 sm:px-4 md:px-6 lg:px-8 h-[40px] text-sm overflow-x-auto">
          {/* All menu opens drawer */}
          <button
            type="button"
            onClick={toggleDrawer(true)}
            className="flex items-center gap-1 navbar-link"
          >
            <MenuIcon sx={{ fontSize: 18 }} />
            <span className="font-semibold">All</span>
          </button>

          {mainCategory.slice(0, 8).map((item) => (
            <button
              key={item.categoryId}
              type="button"
              onClick={() => navigate(`/products/${item.categoryId}`)}
              className="navbar-link hidden sm:inline-flex"
            >
              {item.name}
            </button>
          ))}

          <button
            type="button"
            onClick={becomeSellerClick}
            className="navbar-link ml-auto hidden md:inline-flex"
          >
            Sell on Shopzy
          </button>
        </div>
      </div>

      {/* Drawer for mobile / All menu */}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: 280, sm: 320 },
            backgroundColor: "#ffffff",
          },
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>
  );
};

export default Navbar;