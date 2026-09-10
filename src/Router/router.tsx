import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import App from "../App";
import LoginComponent from "../Components/Login/loginComponent";
import RoomReservationPage from "../Pages/RoomReservationPage";
import CalendarPage from "../Pages/CalendarPage";
import AdminPanelPage from "../Pages/AdminPanelPage";

const routes: RouteObject[] = [
    {

        path: '',
        errorElement: <h2>Seems something went wrong :/</h2>,
        children: [
            {index: true, element: <App />},
            {path: 'login', element: <LoginComponent/>},
            {path: '', element: <MainPage/>,
                children: [
                    {path: '/list_rezerwacja', element: <RoomReservationPage/>},
                    {path: '/kalendarz', element: <CalendarPage/>},
                    {path: '/panel_admina', element: <AdminPanelPage/>}
                ]
            },
        ]

    }
]

export const router = createBrowserRouter(routes)