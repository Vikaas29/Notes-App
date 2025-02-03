import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import HomePage from './components/HomePage.jsx'

const appRouter=createBrowserRouter([
  {
    path:"/",
  element: <App/>,
  children :[
    {
      path:"/",
      element:<HomePage></HomePage>,
    },
    {
      path:"/login",
      element:<Login></Login>,
    },
    {
      path:"/register",
      element:<RegisterPage></RegisterPage>,
    },
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>,
)
