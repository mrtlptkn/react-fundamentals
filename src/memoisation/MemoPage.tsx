import React from 'react';
import ReactMemoDemo from './ReactMemoDemo';

const MemoizedComponent = React.memo(ReactMemoDemo);

export default function MemoPage() {
	const [number, setNumber] = React.useState(0);

	const handleTitleChange = React.useCallback((newTitle: string) => {
		console.log(newTitle);
	}, []);

	const mymode = React.useMemo(() => ({ type: 'edit' as const }), []);

	const mycolumns = React.useMemo(
		() => ['Column 1', 'Column 2', 'Column 3'],
		[],
	);

	return (
		<div style={{ textAlign: 'left', padding: '40px 32px', maxWidth: 720 }}>
			<div style={{ marginBottom: 32 }}>
				<span
					style={{
						fontSize: 11,
						fontWeight: 600,
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						color: 'var(--accent)',
						fontFamily: 'var(--mono)',
					}}
				>
					React Performance
				</span>
				<h1 style={{ margin: '8px 0 12px', fontSize: 36, letterSpacing: -1 }}>
					Memoisation
				</h1>
				<p style={{ color: 'var(--text)', lineHeight: 1.6, maxWidth: 560 }}>
					<code>React.memo</code>, <code>useMemo</code> ve{' '}
					<code>useCallback</code> birlikte kullanıldığında gereksiz
					re-render'ları önler.
				</p>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 16,
					marginBottom: 32,
				}}
			>
				<ConceptCard
					hook="React.memo"
					desc="Child component'i memoize eder. Props değişmedikçe yeniden render olmaz."
					color="var(--accent)"
				/>
				<ConceptCard
					hook="useCallback"
					desc="Fonksiyon referansını sabitler. Her render'da yeni fonksiyon oluşmasını engeller."
					color="#22c55e"
				/>
				<ConceptCard
					hook="useMemo"
					desc="Obje ve dizi referanslarını sabitler. Shallow comparison'da kararlılık sağlar."
					color="#f59e0b"
				/>
				<ConceptCard
					hook="Referans Stabilitesi"
					desc="{} ve [] her render'da yeni referans oluşturur. memo bunu fark edemez."
					color="#3b82f6"
				/>
			</div>

			<div
				style={{
					background: 'var(--code-bg)',
					border: '1px solid var(--border)',
					borderRadius: 12,
					padding: '20px 24px',
					marginBottom: 32,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						gap: 12,
					}}
				>
					<div>
						<p
							style={{
								fontSize: 12,
								fontFamily: 'var(--mono)',
								color: 'var(--text)',
								marginBottom: 6,
								letterSpacing: '0.05em',
								textTransform: 'uppercase',
							}}
						>
							Parent state — child render tetiklemez
						</p>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<button
								onClick={() => setNumber((n) => n - 1)}
								style={btnStyle('var(--border)')}
							>
								−
							</button>
							<span
								style={{
									fontFamily: 'var(--mono)',
									fontSize: 28,
									fontWeight: 700,
									color: 'var(--text-h)',
									minWidth: 48,
									textAlign: 'center',
									fontVariantNumeric: 'tabular-nums',
								}}
							>
								{number}
							</span>
							<button
								onClick={() => setNumber((n) => n + 1)}
								style={btnStyle('var(--accent)')}
							>
								+
							</button>
						</div>
					</div>
					<div
						style={{
							fontSize: 12,
							fontFamily: 'var(--mono)',
							color: 'var(--text)',
							background: 'var(--accent-bg)',
							border: '1px solid var(--accent-border)',
							borderRadius: 8,
							padding: '8px 12px',
							lineHeight: 1.6,
						}}
					>
						<div>
							<span style={{ color: 'var(--accent)' }}>number</span> değişti →
							Parent yeniden render oldu
						</div>
						<div>
							Child{' '}
							<span style={{ color: '#22c55e' }}>props değişmedi</span> → render
							yok ✓
						</div>
					</div>
				</div>
			</div>

			<div
				style={{
					border: '1px solid var(--border)',
					borderRadius: 12,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						padding: '12px 20px',
						background: 'var(--code-bg)',
						borderBottom: '1px solid var(--border)',
						display: 'flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<span
						style={{
							fontSize: 11,
							fontFamily: 'var(--mono)',
							color: 'var(--accent)',
							background: 'var(--accent-bg)',
							border: '1px solid var(--accent-border)',
							borderRadius: 4,
							padding: '2px 8px',
						}}
					>
						React.memo
					</span>
					<span
						style={{
							fontSize: 13,
							color: 'var(--text)',
							fontFamily: 'var(--mono)',
						}}
					>
						MemoizedComponent
					</span>
				</div>
				<div style={{ padding: 24 }}>
					<MemoizedComponent
						title="My Title"
						columns={mycolumns}
						mode={mymode}
						onTitleChange={handleTitleChange}
					/>
				</div>
			</div>
		</div>
	);
}

function ConceptCard({
	hook,
	desc,
	color,
}: {
	hook: string;
	desc: string;
	color: string;
}) {
	return (
		<div
			style={{
				border: '1px solid var(--border)',
				borderRadius: 10,
				padding: '16px 18px',
				borderLeft: `3px solid ${color}`,
				background: 'var(--bg)',
			}}
		>
			<code
				style={{
					fontSize: 13,
					color,
					background: 'transparent',
					padding: 0,
					fontWeight: 600,
				}}
			>
				{hook}
			</code>
			<p
				style={{
					marginTop: 6,
					fontSize: 13,
					lineHeight: 1.55,
					color: 'var(--text)',
				}}
			>
				{desc}
			</p>
		</div>
	);
}

function btnStyle(bg: string): React.CSSProperties {
	return {
		width: 36,
		height: 36,
		borderRadius: 8,
		border: 'none',
		background: bg,
		color: bg === 'var(--accent)' ? '#fff' : 'var(--text-h)',
		fontSize: 20,
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 600,
		transition: 'opacity 0.15s',
	};
}
