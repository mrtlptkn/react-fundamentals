import React from 'react';
import debounce from '../utils/debounce';
import TodoForm from './components/TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';

// sunucudan gelecek tüm modeller dto interface olarak react da tanımlanır.
export interface Todo {
	_id: string;
	id?: number;
	title?: string; // optional data
	content?: string; // optional data
	completed: boolean;
}

export default function TodoPageV2() {
	// obj,array ve func referans hatalarını engellemek için const kullanın.
	// value type değerlerde değişkenin değeri alt satırlada değişecek ise let kullanım.
	// const initData: Todo[] = [
	// 	{
	// 		id: uuidv4(),
	// 		title: 'Alışveriş',
	// 		content: 'Market Alışverişi',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: uuidv4(),
	// 		title: 'Araç Bakım',
	// 		content: 'Genel Bakım',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: uuidv4(),
	// 		title: 'Rapor Hazırla',
	// 		content: '4.Çeyrek Raporu',
	// 		completed: true,
	// 	},
	// ];
	const [items, setItems] = React.useState<Todo[]>([]);
	// searchText her bir state değişiminden yararlananrak sayfa yeniden render edileceği için items state bozmadan elimizde items state üzerinden filtrelenmiş bir anlık liste oluşturur ve displayItems her render sonrası çalıaşcağı için ve displayItems ekrana render alırken data source olarak kullandığı için tek list state sorunu çözdük.
	const [searchText, setSearchText] = React.useState('');
	const [mode, setMode] = React.useState<'add' | 'edit'>('add');

	// edit durumunda seçili item form componentine props olarak aktarmak için böyle yaptık.
	// const selectedId = React.useRef<number>(-1); // bundan tümü ile kurtulabiliriz ?
	const [editItem, setEditItem] = React.useState<Todo | undefined>(undefined);

	console.log('searchText', searchText);

	React.useEffect(() => {
		console.log('items changed', items);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data: Todo[]) =>
				data.map((item) => ({
					_id: uuidv4(), // kendi _id yapımızı ürettik.
					id: item.id,
					title: item.title,
					content: item.content,
					completed: item.completed,
				})),
			)
			.then((data) => setItems(data))
			.catch((error) => console.error('Error fetching todos:', error));
	}, []);

	const displayItems = searchText
		? items.filter((item) => {
				const regex = new RegExp(searchText, 'i');
				return regex.test(item.title || '') || regex.test(item.content || '');
			})
		: items;

	// arrow function
	const handleAdd = (newItem: Todo) => {
		setItems([newItem, ...items]);
		formReset();
	};

	// <button onClick={() => handleEdit(item)}>Düzenle</button>
	const handleEdit = (item: Todo) => {
		setMode('edit');
		setEditItem(item);
	};

	// <button onClick={() => handleDelete(item.id)}>Sil</button>
	const handleDelete = (id: string) => {
		if (!window.confirm('Are you sure you want to delete this item?')) return;

		const remaining = items.filter((x) => x._id !== id);
		setItems([...remaining]);
	};

	// <button onClick={() => handleUpdate(item)}>Güncelle</button>
	const handleUpdate = (updatedItem: Todo) => {
		if (editItem) {
			// seçilen birşey varsa
			const existingItem = items.find((x) => x._id === updatedItem._id);

			if (existingItem) {
				existingItem.title = updatedItem.title || '';
				existingItem.content = updatedItem.content || '';
				existingItem.completed = updatedItem.completed || false;

				const updatedItems = items.map((item: Todo) => {
					if (item._id === existingItem._id) {
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
		setEditItem(undefined); // edit item resetlendi
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
			{/* TODO -> Search ayrı bir component ile yapılabilir yada TodoList içerisine entegre kullanabiliriz. */}
			<div>
				<input onInput={onSearch} placeholder="Arama yapınız" />
			</div>

			{/* Todo listesi */}
			<TodoList
				displayItems={displayItems}
				mode={mode}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onCancel={formReset}
			/>
		</>
	);
}
