import Counter from './Counter';
import Sample from './Sample';
import Title from './Title';
import TitleWithStyle from './TitleWithStyle';
import UserForm from './UserForm';

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
