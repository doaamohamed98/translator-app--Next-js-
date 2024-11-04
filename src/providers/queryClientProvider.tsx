"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query"; 
export const queryClient = new QueryClient(); 

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};




