import { Provider } from 'react-redux';
import store from './store/store';
import ProductPage from './products/ProductPage';
import CartSummaryPage from './products/CartSummaryPage';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoPageV2 from './todos/TodoPageV2';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ContextProvider } from './context/CartContext';
import TodoPage from './todos/TodoPage';
import ProductPageV2 from './productsv2/ProductPageV2';
import MemoPage from './memoisation/MemoPage';
import React from 'react';
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	Container,
} from '@mui/material';
import Layout from './layout/Layout';

// bu tekniğin ismine code-splitting tekniği diyoruz.
const CartSummaryPageV2Lazy = React.lazy(
	() => import('./productsv2/CartSummaryPageV2'),
);

const theme = createTheme({
	palette: {
		primary: {
			main: '#1565C0',
		},
		secondary: {
			main: '#E91E63',
		},
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
	},
});

// clientside render kontrolü
// RouteGurad client side bir kontrol olduğu için API Access token üzerinden bir middleware ile kontrol edemeyiz. Bu yüzden sadece client side state veya localStorage gibi yöntemlerle kontrol yapabiliriz. Yoksa ciddi güvenlik açıkları oluşur.
export function RouteGuard({ children }: { children: React.ReactNode }) {
	// burada ilgili path girmeden önce kontrol yapabiliriz.
	// örneğin kullanıcı login değilse redirect edebiliriz.
	const isLoggedIn = true; // örnek kontrol
	if (!isLoggedIn) {
		return <h1>Access Denied</h1>;
	}
	return <>{children}</>;
}

// ilgili path girmeden önce o sayfanın görüntülenip görüntülenmemesini yönetebiliriz. Bunun için Navigate Guard component kullanabiliriz.

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <h1>Anasayfa</h1>,
			},
			{
				path: 'todos-v2',
				element: (
					<RouteGuard>
						<TodoPageV2 />
					</RouteGuard>
				),
			},
			{
				path: 'todos-v1',
				element: <TodoPage />,
			},
			{
				path: 'products-v1',
				element: <ProductPage />,
			},
			{
				path: 'products-v2',
				element: <ProductPageV2 />,
			},
			{
				path: 'cart-summary',
				element: <CartSummaryPage />,
			},
			{
				path: 'cart-summary-v2',
				// const CartSummaryPageV2Lazy = React.lazy(() => import('./productsv2/CartSummaryPageV2'),
				// );
				element: (
					<React.Suspense fallback={<div>Loading...</div>}>
						<CartSummaryPageV2Lazy />
					</React.Suspense>
				),
			},
			{
				path: 'memo',
				element: <MemoPage />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>
			<ContextProvider>
				<RouterProvider router={routes} />
			</ContextProvider>
		</Provider>
	</ThemeProvider>,
);

// Alt + Shift + O unused code line remove
// Alt + Shift + F code satırı düzenleme
// CTRL + K + C -> Comment line
// CTRL + K + U -> Uncomment
// CTRL + J -> Terminal kısa yolu
// CTRL + B -> Explorer penceresi aç kapat
// CTRL + C -> terminali sonlandırma kısa yolu
