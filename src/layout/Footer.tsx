import { Box, Container, Divider, Typography, Link as MuiLink, Stack } from '@mui/material';

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				bgcolor: 'grey.900',
				color: 'grey.400',
				mt: 'auto',
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					justifyContent="space-between"
					alignItems={{ xs: 'center', sm: 'flex-start' }}
					spacing={3}
				>
					{/* Sol: Marka */}
					<Box>
						<Typography variant="h6" fontWeight={700} color="white" mb={0.5}>
							⚛ My App
						</Typography>
						<Typography variant="body2" maxWidth={260}>
							React, Redux ve MUI ile geliştirilmiş örnek uygulama.
						</Typography>
					</Box>

					{/* Orta: Sayfalar */}
					<Box>
						<Typography variant="subtitle2" color="white" mb={1} fontWeight={600}>
							Sayfalar
						</Typography>
						<Stack spacing={0.5}>
							{[
								{ label: 'Anasayfa', href: '/' },
								{ label: 'Todos V2', href: '/todos-v2' },
								{ label: 'Products V2', href: '/products-v2' },
								{ label: 'Memo Page', href: '/memo' },
							].map((link) => (
								<MuiLink
									key={link.href}
									href={link.href}
									underline="hover"
									color="grey.400"
									variant="body2"
									sx={{ '&:hover': { color: 'white' } }}
								>
									{link.label}
								</MuiLink>
							))}
						</Stack>
					</Box>

					{/* Sağ: Teknolojiler */}
					<Box>
						<Typography variant="subtitle2" color="white" mb={1} fontWeight={600}>
							Teknolojiler
						</Typography>
						<Stack spacing={0.5}>
							{['React 19', 'Redux Toolkit', 'React Router v7', 'Material UI'].map((tech) => (
								<Typography key={tech} variant="body2">
									{tech}
								</Typography>
							))}
						</Stack>
					</Box>
				</Stack>

				<Divider sx={{ my: 3, borderColor: 'grey.800' }} />

				<Typography variant="caption" display="block" textAlign="center">
					© {year} My App — Tüm hakları saklıdır.
				</Typography>
			</Container>
		</Box>
	);
}
