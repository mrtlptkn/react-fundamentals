import { createRoot } from 'react-dom/client';
import './index.css';
// import TodoPageV2 from './todos/TodoPageV2';
import TodoPageV2 from './todos/TodoPageV2';
import {
	createBrowserRouter,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router';
// import * as ReactRouter from 'react-router';
import TodoPage from './todos/TodoPage';
import ProductPage from './products/ProductPage';

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
			}
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={routes} />,
);

// Alt + Shift + O unused code line remove
// Alt + Shift + F code satırı düzenleme
// CTRL + K + C -> Comment line
// CTRL + K + U -> Uncomment
// CTRL + J -> Terminal kısa yolu
// CTRL + B -> Explorer penceresi aç kapat
// CTRL + C -> terminali sonlandırma kısa yolu
