import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // each item = {id, title, price, quantity, etc.}
    totalQuantity: 0,
    totalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            state.totalQuantity += 1;
            state.totalAmount += item.price;
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(i => i.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(i => i.id !== id);
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(i => i.id === id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalAmount -= existingItem.price;
            } else {
                // If quantity is 1, remove the item
                cartSlice.caseReducers.removeFromCart(state, { payload: id });
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
