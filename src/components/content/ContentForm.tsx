import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  FormHelperText,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Content, Category } from "../../types";
import { categoryService } from "../../services/api";

interface ContentFormProps {
  initialContent?: Partial<Content>;
  onSubmit: (content: Partial<Content>) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

const ContentForm: React.FC<ContentFormProps> = ({
  initialContent,
  onSubmit,
  isLoading,
  error,
}) => {
  const [title, setTitle] = useState(initialContent?.title || "");
  const [slug, setSlug] = useState(initialContent?.slug || "");
  const [body, setBody] = useState(initialContent?.body || "");
  const [excerpt, setExcerpt] = useState(initialContent?.excerpt || "");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    initialContent?.status || "draft"
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialContent?.categories?.map((cat) => cat.id) || []
  );
  const [tags, setTags] = useState<string[]>(initialContent?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Gerar slug automaticamente a partir do título
  useEffect(() => {
    if (!initialContent?.slug && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [title, initialContent?.slug]);

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contentData: Partial<Content> = {
      ...initialContent,
      title,
      slug,
      body,
      excerpt: excerpt || undefined,
      status,
      categories: selectedCategories.map((id) => {
        const category = categories.find((cat) => cat.id === id);
        return category as Category;
      }),
      tags,
    };

    await onSubmit(contentData);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialContent?.id ? "Editar Conteúdo" : "Novo Conteúdo"}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Slug"
              fullWidth
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled={isLoading}
              helperText="Identificador único para URL"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Conteúdo"
              fullWidth
              multiline
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Resumo"
              fullWidth
              multiline
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              disabled={isLoading}
              helperText="Um breve resumo do conteúdo (opcional)"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={isLoading}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={status}
                label="Status"
                onChange={(e) =>
                  setStatus(
                    e.target.value as "draft" | "published" | "archived"
                  )
                }
              >
                <MenuItem value="draft">Rascunho</MenuItem>
                <MenuItem value="published">Publicado</MenuItem>
                <MenuItem value="archived">Arquivado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={isLoading || isLoadingCategories}>
              <InputLabel id="categories-label">Categorias</InputLabel>
              <Select
                labelId="categories-label"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Categorias" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const category = categories.find(
                        (cat) => cat.id === value
                      );
                      return (
                        <Chip key={value} label={category?.name || value} />
                      );
                    })}
                  </Box>
                )}
              >
                {isLoadingCategories ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText>Selecione uma ou mais categorias</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
              <TextField
                label="Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                disabled={isLoading}
                sx={{ flexGrow: 1, mr: 1 }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={isLoading || !tagInput.trim()}
              >
                Adicionar
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  disabled={isLoading}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mr: 1 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Salvar"}
            </Button>
            <Button variant="outlined" disabled={isLoading}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ContentForm;
