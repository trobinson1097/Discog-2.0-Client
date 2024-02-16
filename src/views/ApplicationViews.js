import React from "react"
import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { DiscogDetails } from "../components/discog/DiscogDetails"
import { DiscogForm } from "../components/discog/DiscogForm"
import { DiscogList } from "../components/discog/DiscogList"
import { EditDiscog } from "../components/discog/EditDiscog"
import { UserDiscogs } from "../components/user/UserDiscogs"
import { DiscUserList } from "../components/user/UserList"
import { Authorized } from "./Authorized"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                    <Route exact path="/" element={<DiscogList />} />
                    <Route path="/discusers" element={<DiscUserList/>} />
                    <Route path="/userdiscogs" element={<UserDiscogs/>} />
                    <Route path="/discogs/new" element={<DiscogForm/>} />
                    <Route path="/discogs/:discogId" element={<DiscogDetails />} />
                    <Route path="/discogs/update/:discogId" element={<EditDiscog />} />
                    {/* <Route exact path="/events" element={<EventList />} />
                    <Route exact path="/discogs/new" element={<DiscogForm />} />
                    <Route exact path="/events/new" element={<EventForm />} />
                    <Route exact path="/events/update/:eventId" element={<UpdateEvent />} />
                    <Route exact path="/games/update/:gameId" element={<UpdateGame />} /> */}
            </Route>
        </Routes>
    </>
    
}
