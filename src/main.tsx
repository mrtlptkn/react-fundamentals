import { createRoot } from 'react-dom/client';
import './index.css';
import Sample from './Sample';
import Title from './Title';
import TitleWithStyle from './TitleWithStyle';
import Counter from './Counter';
import UserForm from './UserForm';

// import App from './App.tsx';

// root içerisinde birden fazla component göstermek için wrapper component tanımı yaparız.

export function Wrapper() {
	return (
		<>
			<Title id={1} text={'Başlık 1'} />
			<br></br>

			<UserForm />
			<br></br>
			<Sample />
			<br></br>
			<Title id={2} text={'Başlık 2'} />
			<br></br>
			<TitleWithStyle
				id={3}
				text={'Başlık 3'}
				sx={{ color: 'red', fontWeight: 'bold' }}
			/>
			<br></br>
			<Counter />
		</>
	);
}

createRoot(document.getElementById('root')!).render(<Wrapper />);
