import React from 'react';

export default function UseEffectSample() {
	const [count, setCount] = React.useState(0);

	console.log('...rendering:');

	// kesinlikle [] dependency array olamadan kullanmalıyız, aksi halde her render'da çalışır. ve maliyet oluşturur.
	// React.useEffect(() => {
	// 	console.log('Component mounted or updated');

	// 	return () => {
	// 		console.log('Component will unmount');
	// 	};
	// });

	React.useEffect(() => {
		console.log('Component mounted');

		return () => {
			console.log('Component will unmount');
		};
	}, []);

	React.useEffect(() => {
		// console.log('Count changed:', count);

		console.log('Component updated');

		if (count === 5) {
			console.log('Count reached 5!');
		}
	}, [count]); // count değişiminini yakalar.

	return (
		<div>
			Sayac: {count}
			<button onClick={() => setCount(count + 1)}>Arttır</button>
		</div>
	);
}
