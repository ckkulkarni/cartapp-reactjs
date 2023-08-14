import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  resetCounter,
  removeAllItems,
  deleteItem,
  addNewItem,
} from "./redux/reducer/cartSlice";
import { useNavigate } from "react-router";
import { TextField, Box, Button, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const BaseComponent: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const totalQuantity = useSelector((state: any) => state.cart.totalQuantity);
  const handleAddItem = (itemId: number) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteItem(itemId));
  };

  const handleResetCounter = () => {
    dispatch(resetCounter());
  };

  const handleRemoveAllItems = () => {
    dispatch(removeAllItems());
  };
  const handleAddNewItem = () => {
    dispatch(addNewItem());
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#DDF2F5",
        p: 5,
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <ShoppingCartOutlinedIcon />
        <Typography
          sx={{
            backgroundColor: "#17A2B8",
            width: "50px",
            textAlign: "center",
            px: 1,
            borderRadius: 3,
            color: "white",
          }}
        >
          {totalQuantity}
        </Typography>{" "}
        Items
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 1 }}>
        <IconButton
          onClick={handleResetCounter}
          sx={{ backgroundColor: "#28A745", color: "white" }}
          aria-label="reset-button"
        >
          <RefreshIcon />
        </IconButton>
        <IconButton
          onClick={handleRemoveAllItems}
          sx={{ backgroundColor: "#4EA5FB", color: "white" }}
          aria-label="remove-all-button"
        >
          <RecyclingIcon />
        </IconButton>
        <IconButton
          aria-label="add-to-cart"
          onClick={handleAddNewItem}
          sx={{ backgroundColor: "#FFC107", color: "white" }}
        >
          <AddShoppingCartOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {cartItems.map((item: any) => (
          <Box
            key={item.id}
            sx={{ display: "flex" }}
            data-testid="items-container"
          >
            <Box
              sx={{
                mt: 1,
                mr: 2,
                backgroundColor: item.quantity === 0 ? "#FFC107" : "#007BFF",
                width: "50px",
                textAlign: "center",
                color: "white",
                borderRadius: 2,
              }}
            >
              {item.quantity === 0 ? "Zero" : item.quantity}
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <IconButton
                onClick={() => handleAddItem(item.id)}
                sx={{ backgroundColor: "#6C757D", color: "white" }}
                aria-label="increase-item-quantity"
              >
                <AddOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => handleRemoveItem(item.id)}
                sx={{ backgroundColor: "#17A2B8", color: "white" }}
                aria-label="decrease-item-quantity"
              >
                {" "}
                <RemoveOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteItem(item.id)}
                sx={{ backgroundColor: "#DC3545", color: "white" }}
                aria-label="remove-cart-button"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BaseComponent;
