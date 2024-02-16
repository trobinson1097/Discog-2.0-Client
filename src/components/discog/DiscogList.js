import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { deleteDiscog, getDiscogs } from "./DiscogManager.js"
import "./Discogs.css"

export const DiscogList = (props) => {
    const navigate = useNavigate()
    const [ discogs, setDiscogs ] = useState([])

    const loadDiscogs = () => {
        getDiscogs().then(data => setDiscogs(data))
    }

    const handleDelete = (discogId) => {
        deleteDiscog(discogId).then(loadDiscogs)
      }

      useEffect(() => {
        loadDiscogs()
      }, [])

    return (
        <article className="discogs">
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/discogs/new" })
                }}
            >Register New Discog</button> */}
            {
                discogs.map(discog => {
                    return <section key={`discog--${discog.id}`} className="discog">
                        <a href={`/discogs/${discog.id}`}><img className="disc__image" src={discog.image} /></a>
                        <div className="disc__title">{discog.title} by {discog.artist}</div>
                        
                        {/* <div className="disc__condition">{discog.condition}</div>
                        <div className="disc__paid"> You Paid: ${discog.paid}</div>
                        <div className="disc__genres"> genres:{discog.genres?.name}</div> */}
                        {/* <button className="btn-2 is-danger" onClick={() => { handleDelete(discog.id) }}>delete</button> */}
                        {/* <button className="btn btn-2 btn-sep icon-create"
                        
                onClick={() => {
                    navigate({ pathname: `/discogs/update/${discog.id}` })
                }}
            >Update Discog</button> */}
                    </section>
                })
            }
        </article>
    )
}