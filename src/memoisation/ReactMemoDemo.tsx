import React from 'react';

export type ReactMemoDemoProps = {
	title: string;
	columns: string[];
	mode: { type: 'add' | 'edit' };
	onTitleChange: (newTitle: string) => void;
};

export default function ReactMemoDemo(props: ReactMemoDemoProps) {
	const [title, setTitle] = React.useState(props.title);

	console.log('ReactMemoDemo rendered');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
				<span
					style={{
						fontSize: 12,
						fontFamily: 'var(--mono)',
						color: '#22c55e',
						background: 'rgba(34,197,94,0.1)',
						border: '1px solid rgba(34,197,94,0.3)',
						borderRadius: 6,
						padding: '3px 10px',
					}}
				>
					Render → console.log takip et
				</span>
				<span
					style={{
						fontSize: 11,
						fontFamily: 'var(--mono)',
						color: 'var(--text)',
						background: 'var(--code-bg)',
						border: '1px solid var(--border)',
						borderRadius: 4,
						padding: '2px 8px',
						textTransform: 'uppercase',
						letterSpacing: '0.05em',
					}}
				>
					mode: {props.mode.type}
				</span>
			</div>

			<div>
				<label
					style={{
						display: 'block',
						fontSize: 12,
						fontFamily: 'var(--mono)',
						color: 'var(--text)',
						marginBottom: 6,
						letterSpacing: '0.05em',
						textTransform: 'uppercase',
					}}
				>
					Title
				</label>
				<input
					value={title}
					onChange={(e) => {
						setTitle(e.currentTarget.value);
						props.onTitleChange(e.currentTarget.value);
					}}
					style={{
						width: '100%',
						boxSizing: 'border-box',
						padding: '8px 12px',
						border: '1px solid var(--border)',
						borderRadius: 8,
						background: 'var(--bg)',
						color: 'var(--text-h)',
						fontSize: 14,
						fontFamily: 'var(--sans)',
						outline: 'none',
					}}
				/>
			</div>

			<div>
				<p
					style={{
						fontSize: 12,
						fontFamily: 'var(--mono)',
						color: 'var(--text)',
						marginBottom: 8,
						letterSpacing: '0.05em',
						textTransform: 'uppercase',
					}}
				>
					Columns
				</p>
				<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
					{props.columns.map((col) => (
						<span
							key={col}
							style={{
								fontSize: 12,
								fontFamily: 'var(--mono)',
								color: 'var(--text-h)',
								background: 'var(--code-bg)',
								border: '1px solid var(--border)',
								borderRadius: 6,
								padding: '4px 10px',
							}}
						>
							{col}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
