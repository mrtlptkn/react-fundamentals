import type { Todo } from '../TodoPageV2';

export type TodoListProps = {
	displayItems: Todo[];
	mode: 'add' | 'edit';
	onEdit: (item: Todo) => void;
	onDelete: (id: string) => void;
	onCancel: () => void;
};

export function TodoList({
	displayItems,
	mode,
	onEdit: handleEdit,
	onDelete: handleDelete,
	onCancel: handleCancel,
}: TodoListProps) {
	return (
		<>
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
							{mode === 'edit' && (
								<button onClick={handleCancel}>İptal Et</button>
							)}

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
