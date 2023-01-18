import React from 'react'
import ReactDOM from 'react-dom/client'
import Root, { loader as rootLoader,action as rootAction
} from "./routes/root";
import "./index.css";
import Detail,{loader as detailLoader,action as detailAction,} from "./routes/Detail";
import Index from "./routes/index";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import { Box } from '@mui/material';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // 一覧取得
    // action: rootAction, // データを投稿するとき
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/:id",
            element: <Detail />,
            loader: detailLoader,
            action: detailAction
          },
          {
            path: "/:id/new",
            element: <Box>未実装</Box>,
          },
          {
            path: "/:id/edit",
            element: <Box>未対応です</Box>,
          },
          {
            path: ":id/destroy",
            element: <Box>未対応です</Box>,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
