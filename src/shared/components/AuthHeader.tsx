import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AuthHeader() {
  const navigate = useNavigate();

  return (
    <header>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          タスク管理アプリ
          </Link>
        </Typography>
        <Stack spacing={2} direction="row">
          <Button variant="outlined"  color="inherit" onClick={() => navigate("/tasks")}>タスク一覧</Button>
          <IconButton size="large" onClick={() => navigate("/mypage")}>
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
    </header>
  );
}
