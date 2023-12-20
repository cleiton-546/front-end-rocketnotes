// por que criar o app.routes? R: Ele é o que da acesso as outras telas,SOMENTE após o usuário ter logado

import { Routes, Route, Navigate } from 'react-router-dom';

//importando as 4 interfaces
import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";

export function AppRoutes() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/profile' element={<Profile />} /> 
            <Route path='/details/:id' element={<Details />} />

            <Route path='*' element={<Navigate to="/"/>} />
        </Routes>
    )
}



