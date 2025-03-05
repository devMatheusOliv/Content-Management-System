import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ContentForm from "../components/content/ContentForm";
import { contentService } from "../services/api";
import { Content } from "../types";

const ContentFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Partial<Content> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isEditMode = !!id;

  useEffect(() => {
    const fetchContent = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const data = await contentService.getContentById(id);
          setContent(data);
        } catch (error) {
          console.error("Erro ao carregar conteúdo:", error);
          setError(
            "Não foi possível carregar o conteúdo. Tente novamente mais tarde."
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchContent();
  }, [id, isEditMode]);

  const handleSubmit = async (contentData: Partial<Content>) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditMode) {
        await contentService.updateContent(id, contentData);
        setSuccess("Conteúdo atualizado com sucesso!");
      } else {
        await contentService.createContent(contentData);
        setSuccess("Conteúdo criado com sucesso!");
        // Redirecionar para a lista após criar
        setTimeout(() => {
          navigate("/contents");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      setError(
        "Não foi possível salvar o conteúdo. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/contents" color="inherit">
            Conteúdos
          </MuiLink>
          <Typography color="text.primary">
            {isEditMode ? "Editar Conteúdo" : "Novo Conteúdo"}
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            {isEditMode ? "Editar Conteúdo" : "Novo Conteúdo"}
          </Typography>
          <Button component={Link} to="/contents" variant="outlined">
            Voltar para Lista
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <ContentForm
        initialContent={content || {}}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </Layout>
  );
};

export default ContentFormPage;
