import { createSlice } from '@reduxjs/toolkit';

export interface CartItemV2 {
	productId: number;
	quantity: number;
	price: number;
}

export interface CartState {
	items: CartItemV2[];
	total: number;
}

// slice ile tek bir merkezden state güncellemesi, action yönetimi gibi kavramları kullandığımız bir servis.
const cartSlice = createSlice({
	name: 'cart',
	initialState: { items: [] as CartItemV2[], total: 0 } as CartState,
	reducers: {
		addToCart: (state, action) => {
			// action function // action.payload component üzerinden gönderilen güncel item bilgisi içerir.
			const item = action.payload as CartItemV2;
			const existingItem = state.items.find(
				(i) => i.productId === item.productId,
			);
			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				state.items.push(item);
			}
			state.total = state.items.reduce(
				(sum, i) => sum + i.price * i.quantity,
				0,
			);
		},
		removeFromCart: (state, action) => {
			const productId = action.payload as number;
			state.items = state.items.filter((i) => i.productId !== productId);
			state.total = state.items.reduce(
				(sum, i) => sum + i.price * i.quantity,
				0,
			);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
