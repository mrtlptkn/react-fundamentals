import React from 'react';

export default function Counter() {
	const [count, setCount] = React.useState<number>(0);

    console.log('...rendering');

	return (
		<>
			Sayac: {count}
			<button onClick={() => setCount(count + 1)}>(+)</button>
			<button onClick={() => setCount(count - 1)}>(-)</button>
			<button onClick={() => setCount(0)}>Reset</button>
		</>
	);
}
