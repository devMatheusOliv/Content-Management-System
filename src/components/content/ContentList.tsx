import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Content } from "../../types";
import { Link } from "react-router-dom";

interface ContentListProps {
  contents: Content[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  contents,
  isLoading,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "archived":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "draft":
        return "Rascunho";
      case "archived":
        return "Arquivado";
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (contents.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Nenhum conteúdo encontrado
        </Typography>
        <Button
          component={Link}
          to="/contents/new"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Criar Novo Conteúdo
        </Button>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Título</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Categorias</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id} hover>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {content.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  /{content.slug}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(content.status)}
                  color={getStatusColor(content.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>{content.author.username}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {content.categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>{formatDate(content.createdAt)}</TableCell>
              <TableCell align="right">
                <Tooltip title="Visualizar">
                  <IconButton
                    component={Link}
                    to={`/contents/view/${content.id}`}
                    size="small"
                    color="info"
                  >
                    <ViewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton
                    component={Link}
                    to={`/contents/edit/${content.id}`}
                    size="small"
                    color="primary"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(content.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentList;
