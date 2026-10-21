import React from 'react';
import debounce from '../utils/debounce';
import TodoForm from './components/TodoForm';

// sunucudan gelecek tüm modeller dto interface olarak react da tanımlanır.
export interface Todo {
	id: number;
	title?: string; // optional data
	content: string;
	completed: boolean;
}

export default function TodoPageV2() {
	// obj,array ve func referans hatalarını engellemek için const kullanın.
	// value type değerlerde değişkenin değeri alt satırlada değişecek ise let kullanım.
	const initData: Todo[] = [
		{
			id: 1,
			title: 'Alışveriş',
			content: 'Market Alışverişi',
			completed: false,
		},
		{
			id: 2,
			title: 'Araç Bakım',
			content: 'Genel Bakım',
			completed: false,
		},
		{
			id: 3,
			title: 'Rapor Hazırla',
			content: '4.Çeyrek Raporu',
			completed: true,
		},
	];
	const [items, setItems] = React.useState<Todo[]>(initData);
	// searchText her bir state değişiminden yararlananrak sayfa yeniden render edileceği için items state bozmadan elimizde items state üzerinden filtrelenmiş bir anlık liste oluşturur ve displayItems her render sonrası çalıaşcağı için ve displayItems ekrana render alırken data source olarak kullandığı için tek list state sorunu çözdük.
	const [searchText, setSearchText] = React.useState('');
	const [mode, setMode] = React.useState<'add' | 'edit'>('add');

	// edit durumunda seçili item form componentine props olarak aktarmak için böyle yaptık.
	// const selectedId = React.useRef<number>(-1); // bundan tümü ile kurtulabiliriz ? 
	const [editItem, setEditItem] = React.useState<Todo | undefined>(undefined);

	console.log('searchText', searchText);

	const displayItems = searchText
		? items.filter((item) => {
				const regex = new RegExp(searchText, 'i');
				return regex.test(item.title || '') || regex.test(item.content);
			})
		: items;

	// useRef kullanımı reRender süreçlerimizi optimize eder. Form gibi yoğun veri değişimi işlemlerinde kullanırız.
	const titleRef = React.useRef<HTMLInputElement>(null);
	const contentRef = React.useRef<HTMLInputElement>(null);
	const completedRef = React.useRef<HTMLInputElement>(null);
	const selectedId = React.useRef<number>(-1); // non-selected

	// arrow function
	const handleAdd = (newItem: Todo) => {
		setItems([newItem, ...items]);
		formReset();
	};

	// <button onClick={() => handleEdit(item)}>Düzenle</button>
	const handleEdit = (item: Todo) => {
		setMode('edit');

		//titleRef.current içinde value değeri undefined değilse atanabilir olduğu için kontrol ettik.
		if (titleRef.current) {
			titleRef.current.value = item.title || '';
		}
		if (contentRef.current) {
			contentRef.current.value = item.content;
		}
		if (completedRef.current) {
			completedRef.current.checked = item.completed;
		}

		selectedId.current = item.id;

		setEditItem(item);
	};

	// <button onClick={() => handleDelete(item.id)}>Sil</button>
	const handleDelete = (id: number) => {
		if (!window.confirm('Are you sure you want to delete this item?')) return;

		const remaining = items.filter((x) => x.id !== id);
		setItems([...remaining]);
	};

	// <button onClick={() => handleUpdate(item)}>Güncelle</button>
	const handleUpdate = (updatedItem: Todo) => {
		if (selectedId.current !== -1) {
			const existingItem = items.find((x) => x.id === updatedItem.id);

			if (existingItem) {
				existingItem.title = updatedItem.title || '';
				existingItem.content = updatedItem.content || '';
				existingItem.completed = updatedItem.completed || false;

				const updatedItems = items.map((item: Todo) => {
					if (item.id === existingItem.id) {
						// güncellenecek nesneyi bul -> eğer güncellenecek ise onu döndür
						return existingItem;
					}
					return item; // güncellenmeyen nesne
				});

				console.log('updatedItem', updatedItems);

				// nesnenin domadaki sırası değişirse, virtual domdan diff tetikleniyor. kodda arayüz dışında bir sıralama yaparken dikkatli olalım.
				//const reserved = updatedItems.reverse();

				setItems([...updatedItems]);
			}

			formReset();
		}
	};

	// form sıfırlama
	const formReset = () => {
		setMode('add'); // ilk mod

		if (titleRef.current) {
			titleRef.current.value = '';
		}
		if (contentRef.current) {
			contentRef.current.value = '';
		}
		if (completedRef.current) {
			completedRef.current.checked = false;
		}

		selectedId.current = -1; // seçili id resetlendi
	};

	console.log('...rendering');

	const debouncedSearch = React.useMemo(
		() => debounce((value: string) => setSearchText(value), 300),
		[],
	);

	const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
		debouncedSearch(e.currentTarget.value);
	};

	return (
		<>
			{/* Todo Form */}
			<TodoForm
				editItem={editItem}
				mode={mode}
				onAdd={(item) => {
					console.log('Adding new item: Page Component', item);
					handleAdd(item);
				}}
				onUpdate={(item) => {
					console.log('Updating item: Page Component', item);
					handleUpdate(item);
				}}
			/>

			{/* Search Bar */}
			<div>
				<input onInput={onSearch} placeholder="Arama yapınız" />
			</div>

			{/* Todo listesi */}
			{displayItems.map((item: Todo) => {
				return (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							border: 1,
							borderStyle: 'solid',
							padding: 10,
							borderColor: 'gray',
						}}
						key={item.id}
					>
						<div>{item.title}</div>
						<div>
							{/* const [mode, setMode] = React.useState<'add' | 'edit'>('add'); */}

							{mode === 'edit' && <button onClick={formReset}>İptal Et</button>}

							{mode !== 'edit' && (
								<>
									<button onClick={() => handleEdit(item)}>Düzenle</button>
									<button onClick={() => handleDelete(item.id)}>Sil</button>
								</>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
}
