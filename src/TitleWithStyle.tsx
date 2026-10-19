import type { TitleProps } from './Title';
import Title from './Title';

// eski TitleProps değerine style özelliği ekledik.
// React.CSSProperties; component stil vermek için kullanılan bir tiple
// Bu kullanımı nesnelerin kompoziyonu intersect ismini veriyoruz.
export type TitleWithStyleProps = {
	sx: React.CSSProperties;
} & TitleProps;

export default function TitleWithStyle(props: TitleWithStyleProps) {

    // props.text = 'Ali';


	return (
		<>
			<div style={props.sx}>
				<Title id={props.id} text={props.text} />
			</div>
		</>
	);
}
