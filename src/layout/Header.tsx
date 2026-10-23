import { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MemoryIcon from '@mui/icons-material/Memory';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router';

const navItems = [
	{ label: 'Anasayfa', to: '/', icon: <HomeIcon /> },
	{ label: 'Todos V2', to: '/todos-v2', icon: <ChecklistIcon /> },
	{ label: 'Todos V1', to: '/todos-v1', icon: <ChecklistIcon /> },
	{ label: 'Products V1', to: '/products-v1', icon: <ShoppingCartIcon /> },
	{ label: 'Products V2', to: '/products-v2', icon: <ShoppingCartIcon /> },
	{ label: 'Cart Summary', to: '/cart-summary', icon: <ShoppingCartIcon /> },
	{ label: 'Cart (Redux)', to: '/cart-summary-v2', icon: <ShoppingCartIcon /> },
	{ label: 'Memo Page', to: '/memo', icon: <MemoryIcon /> },
];

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const location = useLocation();

	const isActive = (to: string) =>
		to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

	return (
		<>
			<AppBar position="sticky" elevation={2} sx={{ bgcolor: 'primary.main' }}>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					{/* Logo / Başlık */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<IconButton
							color="inherit"
							edge="start"
							onClick={() => setDrawerOpen(true)}
							sx={{ display: { md: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							fontWeight={700}
							component={Link}
							to="/"
							sx={{
								textDecoration: 'none',
								color: 'inherit',
								letterSpacing: 1,
							}}
						>
							⚛ My App
						</Typography>
					</Box>

					{/* Desktop Nav */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
						{navItems.map((item) => (
							<Button
								key={item.to}
								component={Link}
								to={item.to}
								color="inherit"
								size="small"
								sx={{
									fontWeight: isActive(item.to) ? 700 : 400,
									borderBottom: isActive(item.to)
										? '2px solid white'
										: '2px solid transparent',
									borderRadius: 0,
									px: 1.5,
									textTransform: 'none',
									fontSize: '0.85rem',
								}}
							>
								{item.label}
							</Button>
						))}
					</Box>

					{/* Sağ alan — ilerleyen aşamada profil/bildirim buraya */}
					<Box
						sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
					>
						<IconButton color="inherit" component={Link} to="/cart-summary-v2">
							<Badge badgeContent={0} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				PaperProps={{ sx: { width: 260 } }}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						px: 2,
						py: 1.5,
					}}
				>
					<Typography variant="h6" fontWeight={700}>
						⚛ My App
					</Typography>
					<IconButton onClick={() => setDrawerOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider />
				<List>
					{navItems.map((item) => (
						<ListItem key={item.to} disablePadding>
							<ListItemButton
								component={Link}
								to={item.to}
								selected={isActive(item.to)}
								onClick={() => setDrawerOpen(false)}
								sx={{
									'&.Mui-selected': {
										bgcolor: 'primary.light',
										color: 'primary.contrastText',
										'& .MuiListItemIcon-root': {
											color: 'primary.contrastText',
										},
									},
								}}
							>
								<ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{ fontSize: '0.9rem' }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
}
