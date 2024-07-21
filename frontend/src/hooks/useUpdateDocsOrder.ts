import Document from "@/types/documentType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDocsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Document[]) => {
      const res = await fetch("/api/docs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-docs"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
