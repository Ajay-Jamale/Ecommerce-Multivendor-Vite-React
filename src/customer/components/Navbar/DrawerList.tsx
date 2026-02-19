import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import "./Navbar.css";

const DrawerList = ({ toggleDrawer }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMobileCategory, setShowMobileCategory] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    if (isMobile) {
      setShowMobileCategory(true);
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleBackToMain = () => {
    setShowMobileCategory(false);
    setSelectedCategory("");
  };

  const handleClose = () => {
    setShowMobileCategory(false);
    setSelectedCategory("");
    toggleDrawer(false)();
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100vw" : isTablet ? 360 : 320,
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: isMobile ? "none" : "2px solid #000000",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      role="presentation"
    >
      {/* Header */}
      <Box
        sx={{
          padding: isMobile ? "16px" : "20px 16px",
          borderBottom: "2px solid #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {showMobileCategory ? (
          // Mobile Category Header
          <>
            <IconButton
              onClick={handleBackToMain}
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
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <span className="text-sm font-bold uppercase tracking-wider">
              {
                mainCategory.find((c) => c.categoryId === selectedCategory)
                  ?.name
              }
            </span>
            <IconButton
              onClick={handleClose}
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
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        ) : (
          // Main Menu Header
          <>
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                toggleDrawer(false)();
                window.location.href = "/";
              }}
            >
              <Box
                sx={{
                  width: isMobile ? 36 : 40,
                  height: isMobile ? 36 : 40,
                  border: "2px solid #000000",
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
                <StorefrontIcon
                  sx={{ color: "#000000", fontSize: isMobile ? 20 : 22 }}
                />
              </Box>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-wide">
                  SHOPZY
                </span>
                <span className="text-[8px] font-bold text-gray-600 tracking-[0.2em] uppercase">
                  {isMobile ? "MENU" : "MAIN MENU"}
                </span>
              </div>
            </div>

            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                border: "2px solid #000000",
                borderRadius: 0,
                width: isMobile ? 32 : 36,
                height: isMobile ? 32 : 36,
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: isMobile ? 16 : 18 }} />
            </IconButton>
          </>
        )}
      </Box>

      {/* Main Content */}
      {!showMobileCategory ? (
        // Main Categories List
        <>
          <List disablePadding sx={{ flex: 1, overflowY: "auto" }}>
            {mainCategory.map((item) => (
              <ListItem key={item.categoryId} disablePadding>
                <ListItemButton
                  disableRipple
                  onClick={() => handleCategoryClick(item.categoryId)}
                  sx={{
                    paddingY: isMobile ? 1.8 : 2,
                    paddingX: isMobile ? 2.5 : 3,
                    borderBottom: "2px solid #000000",
                    backgroundColor:
                      selectedCategory === item.categoryId && !isMobile
                        ? "#000000"
                        : "#ffffff",
                    "&:hover": {
                      backgroundColor:
                        selectedCategory === item.categoryId && !isMobile
                          ? "#000000"
                          : "#f5f5f5",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: isMobile ? 13 : 14,
                      fontWeight:
                        selectedCategory === item.categoryId && !isMobile
                          ? 700
                          : 500,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      className: "category",
                      sx: {
                        color:
                          selectedCategory === item.categoryId && !isMobile
                            ? "#ffffff"
                            : "#000000",
                      },
                    }}
                  />
                  {selectedCategory === item.categoryId && !isMobile && (
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        backgroundColor: "#ffffff",
                        ml: 1,
                      }}
                    />
                  )}
                  {isMobile && (
                    <span className="text-xs font-bold ml-2">→</span>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Quick Links for Mobile */}
          {isMobile && (
            <Box
              sx={{
                borderTop: "2px solid #000000",
                backgroundColor: "#fafafa",
              }}
            >
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      paddingY: 1.5,
                      paddingX: 2.5,
                      borderBottom: "1px solid #e0e0e0",
                    }}
                    onClick={() => {
                      toggleDrawer(false)();
                      navigate("/");
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 18, mr: 2 }} />
                    <ListItemText
                      primary="Home"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      paddingY: 1.5,
                      paddingX: 2.5,
                      borderBottom: "1px solid #e0e0e0",
                    }}
                    onClick={() => {
                      toggleDrawer(false)();
                      navigate("/about");
                    }}
                  >
                    <InfoIcon sx={{ fontSize: 18, mr: 2 }} />
                    <ListItemText
                      primary="About Us"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      paddingY: 1.5,
                      paddingX: 2.5,
                    }}
                    onClick={() => {
                      toggleDrawer(false)();
                      navigate("/contact");
                    }}
                  >
                    <ContactSupportIcon sx={{ fontSize: 18, mr: 2 }} />
                    <ListItemText
                      primary="Contact"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}

          {/* Footer */}
          <Box
            sx={{
              padding: isMobile ? "12px 16px" : "16px 20px",
              borderTop: "2px solid #000000",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`${isMobile ? "text-xs" : "text-xs"} font-bold uppercase tracking-wider`}
              >
                Shop by Category
              </span>
              <span
                className={`${isMobile ? "text-[9px]" : "text-[10px]"} text-gray-600`}
              >
                {mainCategory.length} Categories Available
              </span>
            </div>
          </Box>
        </>
      ) : (
        // Mobile Category Sheet
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#ffffff",
          }}
        >
          <CategorySheet
            toggleDrawer={toggleDrawer}
            selectedCategory={selectedCategory}
            isMobileDrawer={true}
            onClose={() => setShowMobileCategory(false)}
          />
        </Box>
      )}

      {/* Category Sheet for Tablet/Desktop */}
      {!isMobile && selectedCategory && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: isTablet ? "360px" : "320px",
            right: "0",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderLeft: "2px solid #000000",
            boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
            display: { xs: "none", sm: "block" },
          }}
          className="blur-bg"
        >
          <CategorySheet
            toggleDrawer={toggleDrawer}
            selectedCategory={selectedCategory}
          />
        </Box>
      )}
    </Box>
  );
};

export default DrawerList;
