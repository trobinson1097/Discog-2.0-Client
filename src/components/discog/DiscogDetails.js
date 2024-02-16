import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from "react-router-dom"
import { FaUserCircle } from 'react-icons/fa'
import { getDiscogById, deleteDiscog, collectDiscog } from "./DiscogManager"
import { getAllGenres } from "../genre/GenreManager"

export const DiscogDetails = ({ userId }) => {
  const [discog, setDiscog] = useState({})
  const { discogId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getDiscogById(discogId).then(discogData => setDiscog(discogData))
  }, [discogId])

  return <section className="section">
    <div className="single_discog">
      <header className="card-header is-justify-content-center">
        <h2 className="title is-size-3 p-3 ">
          {discog.title}
        </h2>
      </header>
      <div className="card-image">
        <figure className="image">
          <img src={discog?.image} alt={discog.aritst} />
        </figure>
      </div>
      <div className="card-image">
          <h2>{discog.artist}</h2>
          <h4>Discog Info: {discog.condition}</h4>
          <h4> Paid: ${discog.paid}</h4>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <span className="icon is-large">
              {/* <FaUserCircle size={'3rem'} /> */}
            </span>
          </div>
          <div className="media-content">
            {/* <p className="title is-4">{discog.genres?.genres.name}</p> */}
            {/* <p className="subtitle is-6">@{discog.author?.author.username}</p> */}
          </div>
        </div>

        {/* <div className="content">
          {discog.content}
          <hr />
          <time >{discog.publication_date}</time>
        </div> */}
      </div>
      <footer className="card-footer">
      <button className="btn btn-2 btn-sep icon-create"
                        
                        onClick={() => {
                            navigate({ pathname: `/discogs/update/${discog.id}` })
                        }}
                    >Update Discog</button>
        {/* <Link to={`/posts/${discogId}/comments`} className="card-footer-item">View Comments</Link>
        <Link to={`/posts/${discogId}/add-comment`} className="card-footer-item">Add Comments</Link> */}
        {
          parseInt(userId) === discog.user?.id ? <Link to={`/discogs/${discogId}/edit`} className="card-footer-item">Edit</Link> : <></>
        }
        {
              discog.collected ?
                  <button className="btn-2" onClick={() => {
                      deleteDiscog(discog.id)
                          .then(() => getDiscogById(discogId).then(setDiscog))
                  }}>Remove Discog</button>
                  :
                  <button className="btn-2" onClick={() => {
                      collectDiscog(discog.id)
                          .then(() => getDiscogById(discogId).then(setDiscog))
                  }}>Bookmark</button>
          }
      </footer>
    </div>
  </section>
}

