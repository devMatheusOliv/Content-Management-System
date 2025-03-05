import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { state } = useAuth();

  // Redirecionar para o dashboard se já estiver autenticado
  if (state.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
                color="primary"
              >
                CMS Admin
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                Sistema de gerenciamento de conteúdo completo para seu site ou
                blog.
              </Typography>
              <Typography variant="body1" paragraph>
                Gerencie facilmente seus artigos, páginas, categorias e usuários
                com uma interface moderna e intuitiva.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
