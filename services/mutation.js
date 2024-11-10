import api from "@/configs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegister = () => {
  const mutationFn = (user) => api.post("auth/register", user);
  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (user) => api.post("auth/login", user);
  return useMutation({ mutationFn });
};
const useAddProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (product) => api.post("products", product);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useDeleteSelectedItems = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.delete("products", data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (productId) => api.delete(`products/${productId}`);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useEditProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (editedProduct) =>
    api.put(`products/${editedProduct.id}`, editedProduct);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
export {
  useRegister,
  useLogin,
  useAddProduct,
  useDeleteSelectedItems,
  useDeleteProduct,
  useEditProduct,
};
