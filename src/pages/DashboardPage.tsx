import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Article as ArticleIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import { contentService, categoryService } from "../services/api";
import { Content, Category } from "../types";
import { useAuth } from "../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { state: authState } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contentsData, categoriesData] = await Promise.all([
          contentService.getContents(),
          categoryService.getCategories(),
        ]);
        setContents(contentsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      title: "Total de Conteúdos",
      value: contents.length,
      icon: <ArticleIcon fontSize="large" color="primary" />,
      color: "#e3f2fd",
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: <CategoryIcon fontSize="large" color="secondary" />,
      color: "#f3e5f5",
    },
    {
      title: "Usuários",
      value: 1,
      icon: <PeopleIcon fontSize="large" color="success" />,
      color: "#e8f5e9",
    },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Bem-vindo, {authState.user?.username || "Usuário"}! Aqui está um
          resumo do seu CMS.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                backgroundColor: card.color,
                borderRadius: 2,
              }}
            >
              <Box sx={{ mr: 2 }}>{card.icon}</Box>
              <Box>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {card.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardHeader title="Conteúdos Recentes" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {contents.slice(0, 5).map((content) => (
                  <React.Fragment key={content.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="view">
                          <VisibilityIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ArticleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={content.title}
                        secondary={`${content.status} • ${new Date(
                          content.createdAt
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
                {contents.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Nenhum conteúdo encontrado"
                      secondary="Crie seu primeiro conteúdo"
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardHeader title="Categorias" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CategoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={category.name}
                        secondary={category.description || "Sem descrição"}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
                {categories.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Nenhuma categoria encontrada"
                      secondary="Crie sua primeira categoria"
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DashboardPage;
