import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
        Login
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Entre com suas credenciais para acessar o painel
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
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
            "Entrar"
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
