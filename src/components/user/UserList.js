import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getDiscUsers } from "./UserManager.js"
import "./Users.css"

export const DiscUserList = (props) => {
    const navigate = useNavigate()
    const [ discUsers, setDiscUsers ] = useState([])

    const loadDiscUsers = () => {
        getDiscUsers().then(data => setDiscUsers(data))
    }

    // const handleDelete = (discogId) => {
    //     deleteDiscog(discogId).then(loadDiscUsers)
    //   }

      useEffect(() => {
        loadDiscUsers()
      }, [])

    return (
        <article className="discUsers">
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/discUsers/new" })
                }}
            >Register New Discog</button> */}
            {
                discUsers.map(discuser => {
                    return <section key={`discuser--${discuser.id}`} className="discuser">
                        <div className="user">
                        <div className="discuser">{discuser?.user?.username}</div>
                        <div className="discuser">{discuser?.user?.first_name} {discuser?.user?.last_name}</div>
                        <div className="discuser">{discuser?.bio}</div>
                        </div>
                        {/* <div className="disc__condition">{discuser.condition}</div>
                        <div className="disc__paid"> You Paid: ${discuser.paid}</div>
                        <div className="disc__genres"> genres:{discuser.genres?.name}</div> */}
                        {/* <button className="button is-danger" onClick={() => { handleDelete(discuser.id) }}>delete</button> */}
                        {/* <button className="btn btn-2 btn-sep icon-create"
                        
                onClick={() => {
                    navigate({ pathname: `/discUsers/update/${discuser.id}` })
                }}
            >Update Discog</button> */}
                    </section>
                })
            }
        </article>
    )
}