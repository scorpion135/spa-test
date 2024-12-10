import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

import { addProduct, updateProduct } from "../redux/slices/products";
import { RootState } from "../redux/store";

// Определяем схему валидации с помощью Zod
const productSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  image: z.string().url("Введите корректный URL изображения"),
});

type ProductFormInputs = z.infer<typeof productSchema>;

const ProductCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.products.products);

  const isEditing = Boolean(id);

  // Если находим товар по ID - записываем поля в форму
  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id.toString() === id);
      if (product) {
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("image", product.images[0]);
      }
    }
  }, [id, products]);

  const onSubmit = (data: ProductFormInputs) => {
    // Создание нового товара
    const fields = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      images: [data.image],
      liked: false,
      price: 0,
      creationAt: "",
      updatedAt: "",
      category: { id: 0, name: "", image: "", creationAt: "", updatedAt: "" },
    };

    // Редактирование товара
    if (id) {
      dispatch(
        updateProduct({
          title: data.title,
          description: data.description,
          images: [data.image],
          id: Number(id),
        })
      );
      navigate("/");
      return;
    }

    dispatch(addProduct(fields));

    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#242424" }}>
          {isEditing ? "Редактировать товар" : "Создать товар"}
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", paddingBottom: "10px" }}
        >
          <TextField
            {...register("title")}
            label="Название"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          />
          <TextField
            {...register("description")}
            label="Описание"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <TextField
            {...register("image")}
            sx={{ marginBottom: "50px" }}
            label="URL изображения"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.image}
            helperText={errors.image ? errors.image.message : ""}
          />

          <div style={{ display: "flex", gap: "20px", justifyContent: "end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#242424",
                color: "#fff",
                padding: "12px 24px",
                "&:hover": { backgroundColor: "#711ac0" },
              }}
            >
              {isEditing ? "Сохранить" : "Добавить"}
            </Button>
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#242424",
                  color: "#fff",
                  padding: "12px 24px",
                  "&:hover": { backgroundColor: "#711ac0" },
                }}
              >
                Назад
              </Button>
            </Link>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default ProductCreateForm;
