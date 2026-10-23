import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import type { Todo } from '../TodoPageV2';

const todoSchema = z.object({
	title: z
		.string()
		.nonempty('Başlık zorunludur')
		.min(1, 'Başlık zorunludur')
		.max(10, 'Başlık en fazla 10 karakter olabilir'),
	content: z
		.string()
		.min(1, 'İçerik zorunludur')
		.max(200, 'İçerik en fazla 200 karakter olabilir'),
	completed: z.boolean(),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export type TodoFormProps = {
	mode: 'add' | 'edit';
	editItem?: Todo;
	onAdd?: (newItem: Todo) => void;
	onUpdate?: (updatedItem: Todo) => void;
};

export default function TodoRHFForm({
	mode,
	onAdd,
	onUpdate,
	editItem,
}: TodoFormProps) {
	const {
		watch, // form alanlarının değerlerini izlemek için kullanılır.
		control, // UI kütüphaneleri ile entegrasyon için kullanılır.
		handleSubmit, // form submit işlemi için kullanılır.
		reset, // formu sıfırlamak için kullanılır.
		formState: { errors }, // form doğrulama hatalarını içerir. validayon hataları
	} = useForm<TodoFormValues>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: '',
			content: '',
			completed: false,
		},
	});

	// Uyarı: eğer inputun değişimini yakalamanız gereken özel bir durum varsa tercih edin. componenti rendera zorlar. her bir karakter yazımında component yeniden render edilir.
	const title = watch('title'); // eğer form nesnesinde bir değişiklik varsa takip etmek için kullanılabilir.
	console.log('title', title);

	useEffect(() => {
		if (editItem) {
			reset(editItem);
		} else {
			reset({ title: '', content: '', completed: false });
		}
	}, [editItem, reset]);

	const onSubmit = (values: TodoFormValues) => {
		if (mode === 'add') {
			onAdd?.({ _id: uuidv4(), ...values });
		} else {
			onUpdate?.({ _id: editItem?._id || '-1', ...values });
		}
		reset({ title: '', content: '', completed: false });
	};

	console.log('rendering TodoRHFForm');

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={{ mb: 3 }}
		>
			<Typography variant="h5" gutterBottom>
				Todo Formu
			</Typography>

			<Stack spacing={2}>
				{/* eğer ui framework kullanarak form tasarımı yapıyorsak, ilgili componenti react hook formdan gelen controller component ile sarmallamalıyız. */}
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							// input içine yazılan değerlerin validation tetiklemesi için spread operatör ile değeri {...field} olarak göndermeliyiz.
							label="Başlık"
							variant="outlined"
							fullWidth
							error={!!errors.title}
							helperText={errors.title?.message}
						/>
					)}
				/>

				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="İçerik"
							variant="outlined"
							fullWidth
							multiline
							rows={3}
							error={!!errors.content}
							helperText={errors.content?.message}
						/>
					)}
				/>

				<Controller
					name="completed"
					control={control}
					render={({ field }) => (
						<Box>
							<FormControlLabel
								control={
									<Checkbox
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
									/>
								}
								label="Tamamlandı"
							/>
							{errors.completed && (
								<FormHelperText error>
									{errors.completed.message}
								</FormHelperText>
							)}
						</Box>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ alignSelf: 'flex-start' }}
				>
					{mode === 'add' ? 'Ekle' : 'Güncelle'}
				</Button>
			</Stack>
		</Box>
	);
}
