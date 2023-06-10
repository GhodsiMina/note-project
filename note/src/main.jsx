import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'

// const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
    <BrowserRouter>

      <App />

    </BrowserRouter>
  // </QueryClientProvider>
)
