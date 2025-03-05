import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ContentList from "../components/content/ContentList";
import { contentService } from "../services/api";
import { Content } from "../types";

const ContentListPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      setIsLoading(true);
      try {
        const data = await contentService.getContents();
        setContents(data);
        setFilteredContents(data);
      } catch (error) {
        console.error("Erro ao carregar conteúdos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContents();
  }, []);

  useEffect(() => {
    // Filtrar conteúdos com base no termo de pesquisa e filtro de status
    let filtered = contents;

    if (searchTerm) {
      filtered = filtered.filter(
        (content) =>
          content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((content) => content.status === statusFilter);
    }

    setFilteredContents(filtered);
  }, [searchTerm, statusFilter, contents]);

  const handleDeleteClick = (id: string) => {
    setContentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (contentToDelete) {
      try {
        await contentService.deleteContent(contentToDelete);
        setContents(
          contents.filter((content) => content.id !== contentToDelete)
        );
      } catch (error) {
        console.error("Erro ao excluir conteúdo:", error);
      } finally {
        setDeleteDialogOpen(false);
        setContentToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setContentToDelete(null);
  };

  return (
    <Layout>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Conteúdos
        </Typography>
        <Button
          component={Link}
          to="/contents/new"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Novo Conteúdo
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Pesquisar conteúdos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Filtrar por Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Filtrar por Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="published">Publicados</MenuItem>
              <MenuItem value="draft">Rascunhos</MenuItem>
              <MenuItem value="archived">Arquivados</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <ContentList
        contents={filteredContents}
        isLoading={isLoading}
        onDelete={handleDeleteClick}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este conteúdo? Esta ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ContentListPage;
