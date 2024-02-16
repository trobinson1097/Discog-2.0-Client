import React, { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from 'react-router-dom'
// import { getPlants, destroyPlant } from "../../managers/PlantManager"
import { deleteDiscog, getDiscUserById, getDiscogs, collectDiscog, getDiscogById, } from "../discog/DiscogManager"




export const UserDiscogs = () => {
    const navigate = useNavigate()
    const [currentDiscUser, setCurrentDiscUser] = useState()
    const {discogId} = useParams ()
    const loadDiscUsers = () => {
        fetch(`http://localhost:8000/discusers/usersDiscogs`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("disc_token")}`
                }
            }
        )
            .then(response => response.json()
                .then((discUserArray) => {
                    setCurrentDiscUser(discUserArray)
                }))
    }
    useEffect(
        () => {
            loadDiscUsers()
        },
        []
    )
    return (
        <>
            {/* <div className="plantListHeader">
                <h2 className="plantCopy">Admire and care <br></br>for your collection</h2>
                <button className="btn__plantAdd"
                    onClick={() => {
                        navigate(`/plantForm`)
                    }}>Add New Plant</button>
            </div> */}
            <article className="plants">
                {
                    currentDiscUser?.discogs.map(discog => {
                        return <section key={`discog--${discog.id}`} className="discog">
                            <div className="card-image">
                                <figure className="image">
                                    <img src={discog?.image} alt={discog.aritst} />
                                </figure>
                            </div>
                            <div className="discogtitle">
                                <div className="plant__name">{discog.title}</div>
                                {/* <button className="btn__plantDelete"
                                    onClick={() => {
                                        deleteDiscog(discog)
                                            .then(() => loadDiscUsers())
                                    }}
                                >DELETE</button> */}

                                
                                    <button className="btn-2" onClick={() => {
                                        deleteDiscog(discog.id)
                                            .then(() => loadDiscUsers())
                                    }}>Remove Discog</button>
            
                                
                            </div>
                        </section>
                    })
                }
            </article>
        </>
    )
}




