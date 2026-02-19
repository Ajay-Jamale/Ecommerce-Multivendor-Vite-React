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
  Popover,
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
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, cart, sellers } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Add scroll effect for blur background
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'category-popover' : undefined;

  return (
    <Box
      sx={{
        zIndex: 10,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.98)" : "#ffffff",
        borderBottom: "2px solid #000000",
        transition: "all 0.3s ease",
        position: "sticky",
        top: 0,
        width: "100%",
      }}
      className={`${isScrolled ? "blur-bg" : ""}`}
    >
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-10 xl:px-16 h-[60px] sm:h-[70px] md:h-[80px]">
        {/* Left - Logo and Menu */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {!isLarge && (
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: "#000000",
                border: "2px solid #000000",
                borderRadius: 0,
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
            </IconButton>
          )}

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-1 sm:gap-2 md:gap-3"
          >
            <Box
              sx={{
                width: { xs: 35, sm: 40, md: 45 },
                height: { xs: 35, sm: 40, md: 45 },
                border: { xs: "2px", sm: "3px" },
                borderColor: "#000000",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#000000",
                  "& svg": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <StorefrontIcon sx={{ 
                color: "#000000", 
                fontSize: { xs: 18, sm: 20, md: 24 } 
              }} />
            </Box>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight">
                SHOPZY
              </span>
              
            </div>
          </div>

          {/* Desktop Categories */}
          {isLarge && (
            <ul className="flex items-center ml-4 xl:ml-6">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="px-3 xl:px-5 h-[80px] flex items-center border-b-2 border-transparent hover:border-black hover:bg-black hover:text-white cursor-pointer transition-all duration-150 text-xs xl:text-sm uppercase tracking-wider category"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          {/* Tablet Categories Button */}
          {isMedium && (
            <Button
              onClick={handleCategoryClick}
              sx={{
                borderRadius: 0,
                border: "2px solid #000000",
                color: "#000000",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              Categories
            </Button>
          )}
        </div>

        {/* Search - Desktop */}
        {isLarge && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #000000",
              px: 2,
              height: 45,
              width: 400,
              backgroundColor: "#ffffff",
              "&:focus-within": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 20, mr: 1, color: "#000000" }} />
            <InputBase
              placeholder="SEARCH PRODUCTS"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                "& input::placeholder": {
                  color: "#666666",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  fontSize: "12px",
                },
              }}
            />
          </Box>
        )}

        {/* Search - Tablet */}
        {isMedium && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #000000",
              px: 1.5,
              height: 40,
              width: 250,
              backgroundColor: "#ffffff",
            }}
          >
            <SearchIcon sx={{ fontSize: 18, mr: 0.5, color: "#000000" }} />
            <InputBase
              placeholder="SEARCH"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              sx={{
                fontSize: 13,
                fontWeight: 500,
              }}
            />
          </Box>
        )}

        {/* Right Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Search Toggle */}
          {isSmall && (
            <IconButton
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              sx={{
                border: "2px solid #000000",
                borderRadius: 0,
                width: 36,
                height: 36,
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}

          {/* User Avatar/Login */}
          {!user.user ? (
            <Button
              variant="contained"
              size="small"
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: 0,
                textTransform: "uppercase",
                px: { xs: 1.5, sm: 2, md: 3 },
                height: { xs: 36, sm: 40 },
                backgroundColor: "#000000",
                color: "#ffffff",
                border: "2px solid #000000",
                fontWeight: 700,
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                letterSpacing: "0.5px",
                minWidth: { xs: "auto", sm: "auto" },
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              {isSmall ? "LOGIN" : "Login"}
            </Button>
          ) : (
            <IconButton
              onClick={() => navigate("/account/orders")}
              sx={{
                padding: 0,
                border: "2px solid #000000",
                borderRadius: 0,
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                "&:hover": {
                  backgroundColor: "#000000",
                },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                  borderRadius: 0,
                  bgcolor: "#000000",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {getInitial()}
              </Avatar>
            </IconButton>
          )}

          {/* Wishlist - Hide on very small screens */}
          <IconButton
            onClick={() => navigate("/wishlist")}
            sx={{
              border: "2px solid #000000",
              borderRadius: 0,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              color: "#000000",
              display: { xs: "none", sm: "flex" },
              "&:hover": {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
            }}
          >
            <FavoriteBorder sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>

          {/* Cart */}
          <IconButton
            onClick={() => navigate("/cart")}
            sx={{
              border: "2px solid #000000",
              borderRadius: 0,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              color: "#000000",
              "&:hover": {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
            }}
          >
            <Badge
              badgeContent={cart.cart?.cartItems?.length || 0}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  borderRadius: 0,
                  fontWeight: 700,
                  fontSize: { xs: 8, sm: 10 },
                  minWidth: { xs: 16, sm: 20 },
                  height: { xs: 16, sm: 20 },
                },
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
            </Badge>
          </IconButton>

          {/* Sell Button - Desktop only */}
          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 0,
                textTransform: "uppercase",
                px: 2.5,
                height: 40,
                border: "2px solid #000000",
                color: "#000000",
                backgroundColor: "#ffffff",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.5px",
                ml: 1,
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              SELL
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSmall && mobileSearchOpen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "2px solid #000000",
            borderBottom: "2px solid #000000",
            backgroundColor: "#ffffff",
            p: 1.5,
            animation: "slideDown 0.2s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #000000",
              px: 1.5,
              height: 40,
              width: "100%",
              backgroundColor: "#f5f5f5",
            }}
          >
            <SearchIcon sx={{ fontSize: 18, mr: 1, color: "#000000" }} />
            <InputBase
              placeholder="SEARCH PRODUCTS"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              sx={{
                fontSize: 13,
                fontWeight: 500,
                "& input::placeholder": {
                  fontSize: "11px",
                },
              }}
              autoFocus
            />
          </Box>
          <Button
            onClick={() => setMobileSearchOpen(false)}
            sx={{
              borderRadius: 0,
              border: "2px solid #000000",
              borderLeft: "none",
              height: 40,
              color: "#000000",
              fontWeight: 700,
              fontSize: "11px",
              textTransform: "uppercase",
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      )}

      {/* Tablet Category Popover */}
      {isMedium && (
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              border: "2px solid #000000",
              borderRadius: 0,
              mt: 1,
            }
          }}
        >
          <Box sx={{ width: 200 }}>
            {mainCategory.map((item) => (
              <div
                key={item.categoryId}
                onClick={() => {
                  setSelectedCategory(item.categoryId);
                  setShowSheet(true);
                  handleClose();
                }}
                className="p-3 border-b-2 border-black last:border-b-0 cursor-pointer hover:bg-black hover:text-white transition-all category"
              >
                {item.name}
              </div>
            ))}
          </Box>
        </Popover>
      )}

      {/* Drawer */}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: 280, sm: 320 },
            backgroundColor: "#ffffff",
            borderRight: "2px solid #000000",
          },
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Category Sheet */}
      {showSheet && selectedCategory && (isLarge || isMedium) && (
        <div
          onMouseEnter={() => isLarge && setShowSheet(true)}
          onMouseLeave={() => isLarge && setShowSheet(false)}
          className={`absolute ${
            isLarge 
              ? "top-[80px] left-16 right-16" 
              : "top-[70px] left-4 right-4"
          } bg-white border-2 border-t-0 border-black blur-bg`}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            maxHeight: isMedium ? "70vh" : "480px",
            overflow: "auto",
          }}
        >
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={setShowSheet}
            toggleDrawer={toggleDrawer}
          />
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default Navbar;