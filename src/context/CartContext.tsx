import { createContext, useState } from 'react';

export interface CartItem {
	productId: number;
	quantity: number;
	price: number;
}

// sepete ekleme, çıkarma ve temizleme işlemleri için context tipi
// total: toplam fiyatı tutar
// items: sepetteki ürünleri tutar
// addItem: sepete ürün ekler
// removeItem: sepetteki ürünü çıkarır
// clearCart: sepeti temizler

export interface CartContextType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (productId: number) => void;
	clearCart: () => void;
	total: number;
}

// context componentlerden ilgili state almamızı sağlar
// CartContext ile sepetteki ürünler ve toplam fiyat gibi bilgilere erişebiliriz
// ve addItem, removeItem, clearCart fonksiyonları ile sepeti yönetebiliriz

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
	undefined,
);

// Contextdeki verinin sağlayıcısı
// ContextProvider ile alt bileşenler CartContext'e erişebilir ve sepeti yönetebilir

export const ContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [total, setTotal] = useState<number>(0);
	const addItem = (item: CartItem) => {
		console.log(item);
	};
	const removeItem = (productId: number) => {
		console.log(productId);
	};
	const clearCart = () => {
		setItems([]);
		setTotal(0);
	};

	const values = { items, addItem, removeItem, clearCart, total };

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
