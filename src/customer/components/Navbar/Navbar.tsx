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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FavoriteBorder } from "@mui/icons-material";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, cart, sellers } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(searchProduct(searchQuery));
    navigate(`/search-products?query=${searchQuery}`);
  };

  const becomeSellerClick = () => {
    sellers.profile?.id
      ? navigate("/seller")
      : navigate("/become-seller");
  };

  const getInitial = () => {
    if (!user.user?.fullName) return "";
    return user.user.fullName.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        zIndex: 10,
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
      className="sticky top-0"
    >
      <div className="flex items-center justify-between px-4 md:px-10 lg:px-16 h-[70px]">

        {/* Left */}
        <div className="flex items-center gap-6">
          {!isLarge && (
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-lg md:text-xl font-bold tracking-wide"
          >
            SHOPZY
          </h1>

          {isLarge && (
            <ul className="flex items-center text-sm font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="px-4 h-[70px] flex items-center border-b-2 border-transparent hover:border-black cursor-pointer transition-all"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            px: 2,
            height: 40,
            width: isLarge ? 400 : "50%",
            backgroundColor: "#f9fafb",
          }}
        >
          <SearchIcon sx={{ fontSize: 20, mr: 1, color: "#6b7280" }} />
          <InputBase
            placeholder="Search products"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            sx={{ fontSize: 14 }}
          />
        </Box>

        {/* Right */}
        <div className="flex items-center gap-4">

          {!user.user ? (
            <Button
              variant="contained"
              size="small"
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
              sx={{ borderRadius: 0 }}
            >
              Login
            </Button>
          ) : (
            <IconButton onClick={() => navigate("/account/orders")}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 0,
                  bgcolor: theme.palette.primary.main,
                  fontWeight: 700,
                }}
              >
                {getInitial()}
              </Avatar>
            </IconButton>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorder />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              badgeContent={cart.cart?.cartItems?.length || 0}
              color="primary"
            >
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 0 }}
            >
              Sell With Us
            </Button>
          )}
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Category Sheet */}
      {showSheet && selectedCategory && isLarge && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className="absolute top-[70px] left-16 right-16 bg-white border shadow-sm"
        >
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={setShowSheet}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
