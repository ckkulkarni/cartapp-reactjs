import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialItems: CartItem[] = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 1 },
  { id: 3, quantity: 1 },
  { id: 4, quantity: 1 },
  { id: 5, quantity: 1 },
];

const calculateTotalQuantity = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const initialState: CartState = {
  items: initialItems,
  totalQuantity: calculateTotalQuantity(initialItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity++;
      }
    },
    addNewItem: (state) => {
      const uniqueIndex = state.items.reduce((maxIndex, item) => Math.max(maxIndex, item.id), 0) + 1;
      state.items.push({ id: uniqueIndex, quantity: 1 });
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
        state.totalQuantity--;
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
        state.totalQuantity--;
      }
    },
    resetCounter: state => {
      state.items.forEach(item => {
        state.totalQuantity -= item.quantity;
        item.quantity = 0;
      });
    },
    removeAllItems: state => {
      state.totalQuantity = 0;
      state.items = [];
    },
    deleteItem: (state, action) => {
      const deletedItem = state.items.find(item => item.id === action.payload);
      if (deletedItem) {
        state.totalQuantity -= deletedItem.quantity; 
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  resetCounter,
  removeAllItems,
  deleteItem,
  addNewItem,
} = cartSlice.actions;

export default cartSlice.reducer;
