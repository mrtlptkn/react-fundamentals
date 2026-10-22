import React, { useState } from 'react';
import { CartContext } from '../context/CartContext';

function ConfirmDialog({
	productId,
	onConfirm,
	onCancel,
}: {
	productId: number;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-fade-in">
				<div className="flex flex-col items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
						<svg
							className="w-6 h-6 text-red-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-800">Ürünü Kaldır</h3>
					<p className="text-sm text-gray-500 text-center">
						<span className="font-medium text-gray-700">#{productId}</span>{' '}
						numaralı ürünü sepetten kaldırmak istediğinize emin misiniz?
					</p>
				</div>
				<div className="flex gap-3 mt-6">
					<button
						onClick={onCancel}
						className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
					>
						Hayır
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
					>
						Evet, Kaldır
					</button>
				</div>
			</div>
		</div>
	);
}

export default function CartSummaryPage() {
	const { items, total, removeItem } = React.useContext(CartContext)!;
	const [confirmId, setConfirmId] = useState<number | null>(null);

	const handleRemoveClick = (productId: number) => {
		setConfirmId(productId);
	};

	const handleConfirm = () => {
		if (confirmId !== null) {
			removeItem(confirmId);
			setConfirmId(null);
		}
	};

	const handleCancel = () => {
		setConfirmId(null);
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
			{confirmId !== null && (
				<ConfirmDialog
					productId={confirmId}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}

			<div className="max-w-2xl mx-auto">
				<div className="flex items-center gap-3 mb-8">
					<div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Sepetim</h1>
						<p className="text-sm text-gray-500">{items.length} ürün</p>
					</div>
				</div>

				{items.length === 0 ? (
					<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
						<div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-8 h-8 text-slate-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								/>
							</svg>
						</div>
						<p className="text-gray-500 text-sm">Sepetiniz boş</p>
					</div>
				) : (
					<div className="space-y-3">
						{items.map((item) => (
							<div
								key={item.productId}
								className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 group hover:shadow-md transition-shadow"
							>
								<div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
									<span className="text-indigo-600 font-bold text-sm">
										#{item.productId}
									</span>
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-gray-800 truncate">
										Ürün #{item.productId}
									</p>
									<div className="flex items-center gap-3 mt-0.5">
										<span className="text-xs text-gray-500 bg-slate-100 px-2 py-0.5 rounded-full">
											Adet: {item.quantity}
										</span>
										<span className="text-xs text-indigo-600 font-medium">
											₺{(Number(item.price) * item.quantity).toFixed(2)}
										</span>
									</div>
								</div>
								<div className="text-right shrink-0">
									<p className="text-xs text-gray-400 mb-1">Birim fiyat</p>
									<p className="text-sm font-medium text-gray-700">
										₺{Number(item.price).toFixed(2)}
									</p>
								</div>
								<button
									onClick={() => handleRemoveClick(item.productId)}
									className="ml-2 w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
									title="Ürünü kaldır"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</div>
						))}

						<div className="bg-indigo-600 rounded-2xl p-5 mt-6 flex items-center justify-between">
							<div>
								<p className="text-indigo-200 text-sm">Toplam Tutar</p>
								<p className="text-white text-2xl font-bold">
									₺{Number(total).toFixed(2)}
								</p>
							</div>
							<button className="bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
								Ödemeye Geç
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
