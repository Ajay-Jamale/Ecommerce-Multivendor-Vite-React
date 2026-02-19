import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./Navbar.css";

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory, toggleDrawer, setShowSheet }: any) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = React.useState<{[key: string]: boolean}>({});

  const childCategory = (category: any[], parentCategoryId: string) => {
    return category?.filter(
      (child: any) => child.parentCategoryId === parentCategoryId
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    if (toggleDrawer) toggleDrawer(false)();
    if (setShowSheet) setShowSheet(false);
    navigate("/products/" + categoryId);
  };

  const toggleSection = (categoryId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Get category display name
  const getCategoryTitle = () => {
    const titles: {[key: string]: string} = {
      men: "MEN'S COLLECTION",
      women: "WOMEN'S COLLECTION",
      electronics: "ELECTRONICS",
      home_furniture: "FURNITURE & HOME"
    };
    return titles[selectedCategory] || selectedCategory.toUpperCase();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: { xs: "none", lg: "2px solid #000000" },
        borderTop: "none",
        height: { xs: "calc(100vh - 80px)", lg: "480px" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      className="category-sheet-container"
    >
      {/* Mobile Header */}
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "2px solid #000000",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          className="category"
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "1px",
          }}
        >
          {getCategoryTitle()}
        </Typography>
        {setShowSheet && (
          <IconButton
            onClick={() => setShowSheet(false)}
            sx={{
              border: "2px solid #000000",
              borderRadius: 0,
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            "&:hover": {
              background: "#555",
            },
          },
        }}
      >
        {/* Desktop Grid View (lg and up) */}
        <Box
          sx={{
            display: { xs: "none", lg: "grid" },
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          {categoryTwo[selectedCategory]?.map((item: any, index: number) => (
            <div
              key={item.categoryId}
              className="category-grid-item"
              style={{
                borderRight: index % 5 === 4 ? "none" : "2px solid #000000",
                borderBottom: "2px solid #000000",
                padding: "20px",
              }}
            >
              {/* Level Two Title */}
              <Typography
                className="category"
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  mb: 3,
                  pb: 1,
                  borderBottom: "2px solid #000000",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#000000",
                }}
              >
                {item.name}
              </Typography>

              {/* Level Three List */}
              <ul className="space-y-2">
                {childCategory(
                  categoryThree[selectedCategory],
                  item.categoryId
                )?.map((child: any) => (
                  <li
                    key={child.categoryId}
                    onClick={() => handleCategoryClick(child.categoryId)}
                    className="category-sheet-item"
                  >
                    {child.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Box>

        {/* Tablet View (md) */}
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "none" },
            p: 2,
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {categoryTwo[selectedCategory]?.map((item: any) => (
              <div
                key={item.categoryId}
                className="border-2 border-black p-4"
              >
                {/* Level Two Title */}
                <Typography
                  className="category"
                  sx={{
                    fontWeight: 700,
                    fontSize: "13px",
                    mb: 2,
                    pb: 1,
                    borderBottom: "2px solid #000000",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Typography>

                {/* Level Three List (first 5 items) */}
                <ul className="space-y-1">
                  {childCategory(
                    categoryThree[selectedCategory],
                    item.categoryId
                  )?.slice(0, 5).map((child: any) => (
                    <li
                      key={child.categoryId}
                      onClick={() => handleCategoryClick(child.categoryId)}
                      className="text-xs category-sheet-item"
                    >
                      {child.name}
                    </li>
                  ))}
                  {childCategory(categoryThree[selectedCategory], item.categoryId)?.length > 5 && (
                    <li
                      onClick={() => handleCategoryClick(item.categoryId)}
                      className="text-xs font-bold cursor-pointer hover:underline mt-2"
                    >
                      View All +
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </Box>

        {/* Mobile View (xs) */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            p: 2,
          }}
        >
          {categoryTwo[selectedCategory]?.map((item: any) => (
            <div
              key={item.categoryId}
              className="mb-4 border-2 border-black"
            >
              {/* Mobile Category Header */}
              <div
                onClick={() => toggleSection(item.categoryId)}
                className="flex items-center justify-between p-4 bg-white cursor-pointer"
              >
                <Typography
                  className="category"
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #000000",
                    borderRadius: 0,
                    padding: "4px",
                  }}
                >
                  {expandedSections[item.categoryId] ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </IconButton>
              </div>

              {/* Mobile Category Content */}
              <Collapse in={expandedSections[item.categoryId]}>
                <div className="p-4 border-t-2 border-black bg-gray-50">
                  <ul className="space-y-3">
                    {childCategory(
                      categoryThree[selectedCategory],
                      item.categoryId
                    )?.map((child: any) => (
                      <li
                        key={child.categoryId}
                        onClick={() => handleCategoryClick(child.categoryId)}
                        className="text-sm category-sheet-item pl-2"
                      >
                        {child.name}
                      </li>
                    ))}
                    <li
                      onClick={() => handleCategoryClick(item.categoryId)}
                      className="text-sm font-bold cursor-pointer hover:underline pt-2 border-t border-gray-300 mt-2"
                    >
                      Browse All {item.name}
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>
          ))}
        </Box>
      </Box>

      {/* Mobile Footer */}
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          p: 2,
          borderTop: "2px solid #000000",
          backgroundColor: "#fafafa",
          justifyContent: "space-between",
        }}
      >
        <Typography className="category" sx={{ fontSize: "12px" }}>
          {categoryTwo[selectedCategory]?.length || 0} Categories
        </Typography>
        <Typography
          onClick={() => handleCategoryClick(selectedCategory)}
          className="category"
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Browse All →
        </Typography>
      </Box>
    </Box>
  );
};

export default CategorySheet;