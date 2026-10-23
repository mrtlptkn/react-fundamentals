import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
	return (
		<Container maxWidth={false}>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
			>
				<Header />

				<Outlet />

				<Footer />
			</Box>
		</Container>
	);
}
