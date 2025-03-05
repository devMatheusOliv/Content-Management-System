import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { register, state } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    setPasswordError("");
    await register(username, email, password);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        Criar Conta
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Preencha os dados abaixo para criar sua conta
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      {passwordError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {passwordError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome de usuário"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={state.isLoading}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={state.isLoading}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={state.isLoading}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={state.isLoading}
          error={!!passwordError}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.2 }}
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Registrar"
          )}
        </Button>
        <Box textAlign="center">
          <Typography variant="body2">
            Já tem uma conta?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Faça login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
