import React from 'react';

export default function UserForm() {
	const [form, setForm] = React.useState({
		name: 'Ali',
		surname: 'Tan',
	});

	// 1. object = { }, arr = [] , objArray = [{name},{name}]

	// useEffect(() => {
	// 	// form.name = 'Ali';
	// 	// form.surname = 'Tan';
	// 	// // setForm(form);

	// 	// setForm({
	// 	// 	...form,
	// 	// 	name: 'Ali',
	// 	// 	surname: 'Tan',
	// 	// });
	// }, []);

	// ...data, {name:'Yeni değer'} = new data(name='Yeni değer', surname=eski değer)
	// spread operatoru

	const [arr, setArr] = React.useState([1, 2, 3, 4, 5]);

	return (
		<>
			<button
				onClick={() => {
					// arr.push(32);
					// setArr(arr);
					// referans hatası
					setArr([32, ...arr]);
				}}
			>
				Diziye Ekle
			</button>
			<p>Dizi: {arr}</p>

			<p>
				{' '}
				Ad Soyad: {form.name} {form.surname}
			</p>
			<input
				type="text"
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>
			<br></br>
			<input
				type="text"
				value={form.surname}
				onChange={(e) => setForm({ ...form, surname: e.target.value })}
			/>
			<br></br>
			<input type="button" value="Kaydet" />
		</>
	);
}
