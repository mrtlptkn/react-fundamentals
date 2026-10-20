export type TitleProps = {
	text: string;
	id: number;
};

// Props: componente dışarıdan gönderilen stateless değerler. Componentin ilk initialize değerleri

export default function Title({ text, id }: TitleProps) {
	return (
		<>
			{text}-{id}
		</>
	);
}
