import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
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
                Crie sua conta
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                Junte-se ao nosso sistema de gerenciamento de conteúdo.
              </Typography>
              <Typography variant="body1" paragraph>
                Após o registro, você terá acesso a todas as funcionalidades do
                CMS para gerenciar seu conteúdo de forma eficiente.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;
