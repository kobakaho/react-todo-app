import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                タスク管理アプリ
                </Link>
            </Typography>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color="inherit" onClick={() => navigate("/signup")}>新規登録</Button>
                <Button variant="outlined" color="inherit"  onClick={() => navigate("/signin")}>ログイン</Button>
            </Stack>
            </Toolbar>
        </AppBar>
        </Box>
        </header>
    );
}
