import React from 'react';
import type { Todo } from '../TodoPage';

// component dışardan bir sorumluluk alıcak ise bunlar için props tanımlanır.

export type TodoFormProps = {
	mode: 'add' | 'edit';
	editItem?: Todo;
	onAdd?: (newItem: Todo) => void; // component bir değişiklik var haberdar et. Event Driven yaklaşımı
	onUpdate?: (updatedItem: Todo) => void;
};

export default function TodoForm({
	mode,
	onAdd,
	onUpdate,
	editItem,
}: TodoFormProps) {
	console.log('...rendering:', editItem);

	const titleRef = React.useRef<HTMLInputElement>(null);

	const contentRef = React.useRef<HTMLInputElement>(null);

	const completedRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (editItem) {
			if (titleRef.current) {
				titleRef.current.value = editItem.title || '';
			}
			if (contentRef.current) {
				contentRef.current.value = editItem.content || '';
			}
			if (completedRef.current) {
				completedRef.current.checked = editItem.completed || false;
			}
		}
	}, [editItem]);

	// sorumluluk sadece form değişimini yakalamak
	const handleAdd = () => {
		const newItem = {
			id: Date.now(), // npm uuid kullanabiliriz
			title: titleRef.current?.value || '',
			content: contentRef.current?.value || '',
			completed: completedRef.current?.checked || false,
		};
		console.log('Adding new item:', newItem);
		onAdd?.(newItem);
	};

	// sorumluluk sadece form değişimini yakalamak
	const handleUpdate = () => {
		const updatedItem = {
			id: Date.now(), // npm uuid kullanabiliriz
			title: titleRef.current?.value || '',
			content: contentRef.current?.value || '',
			completed: completedRef.current?.checked || false,
		};
		console.log('Updating item:', updatedItem);
		onUpdate?.(updatedItem);
	};

	return (
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
	);
}
