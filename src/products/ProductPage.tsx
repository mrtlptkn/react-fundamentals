import React from 'react';
import { getProducts } from './ProductClient';

export interface Product {
	ProductID: number;
	ProductName: string;
	SupplierID: number | null;
	CategoryID: number | null;
	QuantityPerUnit: string | null;
	UnitPrice: number | null;
	UnitsInStock: number | null;
	UnitsOnOrder: number | null;
	ReorderLevel: number | null;
	Discontinued: boolean;
}

const CATEGORY_COLORS: Record<number, string> = {
	1: 'bg-amber-100 text-amber-800',
	2: 'bg-green-100 text-green-800',
	3: 'bg-blue-100 text-blue-800',
	4: 'bg-purple-100 text-purple-800',
	5: 'bg-rose-100 text-rose-800',
	6: 'bg-orange-100 text-orange-800',
	7: 'bg-teal-100 text-teal-800',
	8: 'bg-indigo-100 text-indigo-800',
};

function getCategoryBadge(id: number | null) {
	if (id === null) return 'bg-gray-100 text-gray-600';
	return CATEGORY_COLORS[id] ?? 'bg-gray-100 text-gray-600';
}

function SkeletonCard() {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
			<div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />
			<div className="mb-2 h-3 w-1/2 rounded bg-gray-100" />
			<div className="mb-4 h-3 w-2/3 rounded bg-gray-100" />
			<div className="flex items-center justify-between">
				<div className="h-6 w-16 rounded-full bg-gray-200" />
				<div className="h-6 w-20 rounded bg-gray-200" />
			</div>
		</div>
	);
}

function StockBadge({ units }: { units: number | null }) {
	if (units === null) return null;
	if (units === 0)
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
				<span className="size-1.5 rounded-full bg-red-500" />
				Stok Yok
			</span>
		);
	if (units <= 10)
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
				<span className="size-1.5 rounded-full bg-amber-400" />
				Az Stok
			</span>
		);
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
			<span className="size-1.5 rounded-full bg-emerald-500" />
			Stokta
		</span>
	);
}

function ProductCard({ product }: { product: Product }) {
	return (
		<div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
			<div className="mb-1 flex items-start justify-between gap-2">
				<h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-indigo-600 transition-colors">
					{product.ProductName}
				</h3>
				{product.Discontinued && (
					<span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
						Durduruldu
					</span>
				)}
			</div>

			{product.QuantityPerUnit && (
				<p className="mb-3 text-xs text-gray-400">{product.QuantityPerUnit}</p>
			)}

			<div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
				<div className="flex items-center gap-2">
					{product.CategoryID !== null && (
						<span
							className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryBadge(product.CategoryID)}`}
						>
							Kat. {product.CategoryID}
						</span>
					)}
					<StockBadge units={product.UnitsInStock} />
				</div>

				{product.UnitPrice !== null && (
					<span className="text-base font-bold text-gray-900">
						${Number(product.UnitPrice).toFixed(2)}
					</span>
				)}
			</div>

			<div className="mt-2 flex items-center justify-between">
				{product.UnitsInStock !== null && (
					<p className="text-[11px] text-gray-400">
						{product.UnitsInStock} adet stokta
					</p>
				)}
				{product.UnitsInStock !== null && product.UnitsInStock > 0 && (
					<button className="ml-auto flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95">
						<svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
						</svg>
						Sepete Ekle
					</button>
				)}
			</div>
		</div>
	);
}

export default function ProductPage() {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [search, setSearch] = React.useState('');
	const [showDiscontinued, setShowDiscontinued] = React.useState(true);
	const [sortBy, setSortBy] = React.useState<'name' | 'price' | 'stock'>('name');
	const [page, setPage] = React.useState(1);
	const PAGE_SIZE = 12;

	React.useEffect(() => {
		let cancelled = false;
		getProducts()
			.then((response) => {
				if (!cancelled) {
					setProducts(response.data.value as Product[]);
					setLoading(false);
				}
			})
			.catch(() => {
				if (!cancelled) {
					setError('Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
					setLoading(false);
				}
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const filtered = React.useMemo(() => {
		let list = products;

		if (!showDiscontinued) {
			list = list.filter((p) => !p.Discontinued);
		}

		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter((p) => p.ProductName.toLowerCase().includes(q));
		}

		list = [...list].sort((a, b) => {
			if (sortBy === 'price') return (b.UnitPrice ?? 0) - (a.UnitPrice ?? 0);
			if (sortBy === 'stock') return (b.UnitsInStock ?? 0) - (a.UnitsInStock ?? 0);
			return a.ProductName.localeCompare(b.ProductName);
		});

		return list;
	}, [products, search, showDiscontinued, sortBy]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const safePage = Math.min(page, totalPages);
	const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-8">
			{/* Header */}
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Ürün Kataloğu
					</h1>
					<p className="mt-1 text-sm text-gray-500">
						{loading
							? 'Yükleniyor…'
							: `${filtered.length} ürün gösteriliyor${products.length !== filtered.length ? ` / ${products.length} toplam` : ''}`}
					</p>
				</div>

				{/* Toolbar */}
				<div className="mb-6 flex flex-wrap items-center gap-3">
					{/* Search */}
					<div className="relative flex-1 min-w-52">
						<svg
							className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
						</svg>
						<input
							type="text"
							placeholder="Ürün ara…"
							value={search}
							onChange={(e) => { setSearch(e.target.value); setPage(1); }}
							className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
						/>
					</div>

					{/* Sort */}
					<select
						value={sortBy}
						onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setPage(1); }}
						className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition cursor-pointer"
					>
						<option value="name">Ada göre sırala</option>
						<option value="price">Fiyata göre (yüksek→düşük)</option>
						<option value="stock">Stoğa göre (çok→az)</option>
					</select>

					{/* Discontinued toggle */}
					<label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm select-none">
						<span
							className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${showDiscontinued ? 'bg-indigo-500' : 'bg-gray-200'}`}
						>
							<input
								type="checkbox"
								className="sr-only"
								checked={showDiscontinued}
								onChange={(e) => { setShowDiscontinued(e.target.checked); setPage(1); }}
							/>
							<span
								className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform ${showDiscontinued ? 'translate-x-4' : 'translate-x-0.5'}`}
							/>
						</span>
						Durdurulanları göster
					</label>
				</div>

				{/* Error state */}
				{error && (
					<div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						<svg className="size-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
						</svg>
						{error}
					</div>
				)}

				{/* Grid */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{loading
						? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
						: paginated.length > 0
							? paginated.map((product) => (
									<ProductCard key={product.ProductID} product={product} />
								))
							: (
								<div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
									<svg className="mb-3 size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-5m16 0H4m8-4v8" />
									</svg>
									<p className="text-sm font-medium">Ürün bulunamadı</p>
									<p className="mt-1 text-xs">Arama kriterlerinizi değiştirmeyi deneyin.</p>
								</div>
							)}
				</div>

				{/* Pagination */}
				{!loading && filtered.length > 0 && totalPages > 1 && (
					<div className="mt-8 flex items-center justify-center gap-1">
						<button
							onClick={() => setPage(1)}
							disabled={safePage === 1}
							className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							«
						</button>
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={safePage === 1}
							className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							‹
						</button>

						{Array.from({ length: totalPages }, (_, i) => i + 1)
							.filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
							.reduce<(number | '…')[]>((acc, p, idx, arr) => {
								if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('…');
								acc.push(p);
								return acc;
							}, [])
							.map((p, idx) =>
								p === '…' ? (
									<span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400">…</span>
								) : (
									<button
										key={p}
										onClick={() => setPage(p)}
										className={`min-w-8 rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-sm transition ${
											p === safePage
												? 'border-indigo-500 bg-indigo-600 text-white'
												: 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
										}`}
									>
										{p}
									</button>
								)
							)}

						<button
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							disabled={safePage === totalPages}
							className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							›
						</button>
						<button
							onClick={() => setPage(totalPages)}
							disabled={safePage === totalPages}
							className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							»
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
