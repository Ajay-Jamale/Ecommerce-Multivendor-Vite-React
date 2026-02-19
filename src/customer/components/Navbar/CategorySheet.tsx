import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

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

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
      }}
      className="lg:h-[480px] overflow-y-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {categoryTwo[selectedCategory]?.map((item: any) => (
          <div
            key={item.categoryId}
            className="p-6 border-r border-b border-gray-200"
          >
            {/* Level Two Title */}
            <p className="font-semibold text-sm mb-4 tracking-wide uppercase">
              {item.name}
            </p>

            {/* Level Three List */}
            <ul className="space-y-2">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId
              )?.map((child: any) => (
                <li
                  key={child.categoryId}
                  onClick={() => handleCategoryClick(child.categoryId)}
                  className="text-sm text-gray-700 cursor-pointer hover:underline hover:text-black transition-all"
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </Box>
  );
};

export default CategorySheet;
