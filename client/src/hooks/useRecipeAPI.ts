import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../axiosInstance";
import { NotificationContext } from "../context/NotificationContext";
import { ProductType, ServerErrorMessage } from "../types";

const useRecipeAPI = () => {
  type ProductTypeFull = ProductType & {
    owner: string;
    recommendList: string[];
  };

  const [formData, setFormData] = useState<Partial<ProductType>>({
    title: "",
    ingredients: "",
    instructions: "",
    description: "",
    image: "",
  });
  const [recipes, setRecipes] = useState<ProductType[]>([]);
  const [recipesFav, setRecipesFav] = useState<ProductType[]>([]);
  const [recomCount, setRecomCount] = useState(0);
  const [recipe, setRecipe] = useState<ProductTypeFull | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchForRecipe = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/catalog/search/${searchTerm}`);
      setRecipes(res.data.products);
    } catch (err) {
      setRecipes([]);
      showNotification(err as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateRecipe = (formData: Partial<ProductType>): string | null => {
    if (
      !formData.title ||
      !formData.ingredients ||
      !formData.instructions ||
      !formData.image ||
      !formData.description
    ) {
      return "All fields are required";
    }
    return null;
  };

  const createRecipe = async () => {
    try {
      const hasEmptyFields = validateRecipe(formData);
      if (hasEmptyFields) {
        showNotification({ message: hasEmptyFields, status: 400 });
        return;
      }
      const res = await axiosInstance.post("/catalog/create", formData);
      showNotification(res);
      navigate("/recipes/" + res.data.product._id);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const updateRecipe = async (id: string) => {
    try {
      const hasEmptyFields = validateRecipe(formData);
      if (hasEmptyFields) {
        showNotification({ message: hasEmptyFields, status: 400 });
        return;
      }
      const res = await axiosInstance.put(`/catalog/${id}`, formData);
      showNotification(res);
      setFormData(res.data);
      navigate(`/recipes/${id}`);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/catalog/${id}`);
      showNotification(res);
      navigate(-1);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/catalog");
      setRecipes(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipe = async (id: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/catalog/${id}`);
      setRecipe(res.data);
      setFormData(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };
  const fetchMostPopularRecipes = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/catalog/most-popular");
      setRecipes(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addToRecommend = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/catalog/${id}/recommend`);
      showNotification(res);
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    }
  };

  const removeFromRecommend = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/catalog/${id}/unrecommend`);
      showNotification(res);
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    }
  };
  const fetchUserFavorites = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/catalog/favorites");
      setRecipesFav(res.data);
      return res;
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/catalog/user-recipes");
      setRecipes(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const userRecommendationsCount = async () => {
    try {
      const res = await axiosInstance.get("/catalog/user-recom-count");
      setRecomCount(res.data.count);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  return {
    loading,
    formData,
    recipes,
    recipesFav,
    recomCount,
    recipe,
    searchTerm,
    handleInput,
    handleSearchInput,
    searchForRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    fetchAllRecipes,
    fetchRecipe,
    fetchMostPopularRecipes,
    addToRecommend,
    removeFromRecommend,
    fetchUserFavorites,
    fetchUserRecipes,
    userRecommendationsCount,
  };
};

export default useRecipeAPI;
