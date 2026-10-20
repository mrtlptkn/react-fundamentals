import React from 'react';
import debounce from '../utils/debounce';

// sunucudan gelecek tüm modeller dto interface olarak react da tanımlanır.
export interface Todo {
	id: number;
	title?: string; // optional data
	content: string;
	completed: boolean;
}

export default function TodoPage() {
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
	const handleAdd = () => {
		const newItem: Todo = {
			id: items.length + 1,
			title: titleRef.current?.value || '',
			content: contentRef.current?.value || '',
			completed: completedRef.current?.checked || false,
		};
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
	};

	// <button onClick={() => handleDelete(item.id)}>Sil</button>
	const handleDelete = (id: number) => {
		if (!window.confirm('Are you sure you want to delete this item?')) return;

		const remaining = items.filter((x) => x.id !== id);
		setItems([...remaining]);
	};

	// <button onClick={() => handleUpdate(item)}>Güncelle</button>
	const handleUpdate = () => {
		if (selectedId.current !== -1) {
			const updatedItem = items.find((x) => x.id === selectedId.current);

			if (updatedItem) {
				updatedItem.title = titleRef.current?.value || '';
				updatedItem.content = contentRef.current?.value || '';
				updatedItem.completed = contentRef.current?.checked || false;

				const updatedItems = items.map((item: Todo) => {
					if (item.id === updatedItem.id) {
						// güncellenecek nesneyi bul -> eğer güncellenecek ise onu döndür
						return updatedItem;
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
		[]
	);

	const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
		debouncedSearch(e.currentTarget.value);
	};

	return (
		<>
			{/* Todo Form */}
			<div
				style={{
					marginBottom: 20,
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
				}}
			>
				<h1>Todo Formu</h1>
				<div>
					Title:
					<input ref={titleRef} type="text" />
				</div>
				<div>
					Content:
					<input ref={contentRef} type="text" />
				</div>
				<div>
					Completed:
					<input ref={completedRef} type="checkbox" />
				</div>
				<div>
					{/* conditional rendering based on mode */}
					{mode === 'add' ? (
						<button onClick={handleAdd}>Ekle</button>
					) : (
						<button onClick={handleUpdate}>Güncelle</button>
					)}
				</div>
			</div>

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
