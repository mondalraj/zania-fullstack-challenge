import { useQuery } from "@tanstack/react-query";

export const useGetAllDocs = () => {
  return useQuery({
    queryKey: ["all-docs"],
    queryFn: async () => {
      const res = await fetch("/api/docs");
      const data = await res.json();
      return data;
    },
  });
};
