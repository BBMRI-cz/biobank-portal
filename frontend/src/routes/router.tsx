import { createBrowserRouter } from 'react-router'

import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { RootLayout } from './RootLayout'

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
