import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";

const DrawerList = ({ toggleDrawer }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
      }}
      role="presentation"
    >
      {/* Logo Section */}
      <Box
        sx={{
          padding: "20px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 className="text-2xl font-semibold tracking-wide">
          Zosh Bazzar
        </h1>
      </Box>

      {/* Category List */}
      <List disablePadding>
        {mainCategory.map((item) => (
          <ListItem key={item.categoryId} disablePadding>
            <ListItemButton
              disableRipple
              onClick={() => setSelectedCategory(item.categoryId)}
              sx={{
                paddingY: 1.5,
                paddingX: 3,
                borderBottom: "1px solid #f1f5f9",
                backgroundColor:
                  selectedCategory === item.categoryId
                    ? "#f8fafc"
                    : "#ffffff",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight:
                    selectedCategory === item.categoryId ? 600 : 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Category Sheet */}
      {selectedCategory && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "260px",
            right: "0",
            height: "100%",
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #e5e7eb",
          }}
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
