import * as React from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import axios from 'axios';

export default function RegisterForm() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: username,
      email: email,
      password: password,
    };

    try {
        const response = await axios.post('http://localhost:3000/api/users', data);
  
        console.log('Usuario registrado:', response.data);
        

        // Borrar los datos del formulario
        setUsername('');
        setEmail('');
        setPassword('');


      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    console.log('Formulario enviado');
    
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center', marginBottom: 3 }}>
          Registro de Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre de Usuario"
              variant="outlined"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Registrarse
            </Button>

            <div>
              <p>¿Ya tienes una cuenta? <a href="/">Inicia Sesión</a></p>
            </div>
          </Stack>
        </form>
      </Paper>
   
    </Box>
  );
}
