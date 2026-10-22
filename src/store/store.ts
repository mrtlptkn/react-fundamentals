import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/ProductApi';
import cartSlice from './slice/CartSlice';

// reactdaki karşılığı createContext ->
// configureStore uygulama genelindeki tüm state merkezi olarak yönetir.
// createContext ise her bir işlem için ayrı state yönetimi sağlar.

// REDUX DA provider da tek olur, tüm uygulama genelinde state yönetimi sağlar.

const store = configureStore({
	reducer: {
		cartState: cartSlice, // cartState okumak sorumlu olan bileşen cartSlice'dır.
		// buraya slice reducerlar eklenir, product state yönetimini sağladık.
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: (
		getDefaultMiddleware, // api state yönetimi için gerekli middleware ekleniyor. bunu redux devtools üzerinden izleyebiliriz.
	) =>
		getDefaultMiddleware()
			// .prepend(listenerMiddleware.middleware) // listenerMiddleware tanımlı değil, yorum satırı yaptım
			.concat(productApi.middleware),
});

//Component üzerinden reducer altında tanımlı herhangi bir state erişmek için getState kullanılır.
export type RootState = ReturnType<typeof store.getState>;

// herhangi bir component üzerinden dispatch (state güncellemek için) kullanılır. Actionlar redux da dispatch ile çağırılır.
export type AppDispatch = typeof store.dispatch;

export default store;
