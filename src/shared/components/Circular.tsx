import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Circular() {
  return (
  <div
  style={{
    display: "flex",
    justifyContent: "center", // 横方向の中央揃え
    alignItems: "center",     // 縦方向の中央揃え
    height: "100vh",          // 画面全体の高さを確保
  }}>
  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  </div>
  );
}
