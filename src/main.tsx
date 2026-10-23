import { Provider } from 'react-redux';
import store from './store/store';
import ProductPage from './products/ProductPage';
import CartSummaryPage from './products/CartSummaryPage';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoPageV2 from './todos/TodoPageV2';
import {
	createBrowserRouter,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router';
import { ContextProvider } from './context/CartContext';
import TodoPage from './todos/TodoPage';
import ProductPageV2 from './productsv2/ProductPageV2';
import CartSummaryPageV2 from './productsv2/CartSummaryPageV2';
import MemoPage from './memoisation/MemoPage';

// root içerisinde birden fazla component göstermek için wrapper component tanımı yaparız.
// routeda tanımlı iç sayfalarda stateleri kaybetmemek için Link component kullanalım. Ama external sayfalara gidecek isek a href kullanabiliriz. Zaten external sayfaları link component ile açamayız.
export default function Layout() {
	return (
		<div>
			<h1>Layout Component</h1>
			<nav>
				<Link to="/">Anasayfa</Link> <Link to="/todos-v2">Todos V2</Link>{' '}
				<Link to="/todos-v1">Todos V1</Link>{' '}
				<Link to="/products-v1">Products V1</Link>{' '}
				<Link to="/products-v2">Products V2 (RTK Query)</Link>{' '}
				<Link to="/cart-summary">Cart Summary</Link>{' '}
				<Link to="/cart-summary-v2">Cart Summary (Redux)</Link>{' '}
				<Link to="/memo">Memo Page</Link>{' '}
				<a
					href="https://www.google.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Google External Link
				</a>
			</nav>
			<main>
				<Outlet />
			</main>
			<footer>Alt Bilgi</footer>
		</div>
	);
}

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
				element: <CartSummaryPageV2 />,
			},
			{
				path: 'memo',
				element: <MemoPage />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ContextProvider>
			<RouterProvider router={routes} />
		</ContextProvider>
	</Provider>,
);

// Alt + Shift + O unused code line remove
// Alt + Shift + F code satırı düzenleme
// CTRL + K + C -> Comment line
// CTRL + K + U -> Uncomment
// CTRL + J -> Terminal kısa yolu
// CTRL + B -> Explorer penceresi aç kapat
// CTRL + C -> terminali sonlandırma kısa yolu
