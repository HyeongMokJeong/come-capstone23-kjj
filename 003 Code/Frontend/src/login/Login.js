import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../image/capstone_background.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import { useCookies } from 'react-cookie';
import Copyright from '../components/general/Copyright';
import { ManagerBaseApi } from '../auth/authConfig';

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const [cookies, setCookie] = useCookies(['accesstoken']);

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = { username, password };
    try {
      const res1 = await axios.post(`/api/user/login/keycloak?token=${keycloak.token}`);
      const apitoken = res1.headers.authorization;
      const [, keycloaktoken] = apitoken.split('Bearer ');
      setCookie('keycloaktoken', keycloaktoken);

      const res2 = await axios({
        method: 'POST',
        url: `${ManagerBaseApi}/login/id`,
        data: body,
      });

      const apitoken2 = res2.headers.authorization;
      const [, accesstoken] = apitoken2.split('Bearer ');
      setCookie('accesstoken', accesstoken);

      if (res2.status === 200) navigate('/home');
    } catch (err) {
      if (err.response.status === 401) alert('ID or PW를 확인하세요.');
      else if (err.response.status === 403) alert('keycloak 인증이 실패했습니다.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              식재료 절약단
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="ID"
                label="ID"
                name="ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="ID"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                로그인
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}