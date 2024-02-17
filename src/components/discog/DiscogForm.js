import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllGenres } from "../genre/GenreManager"
import { createDiscog } from "./DiscogManager"

// ---- Airbnb Code Sample ----


// This component is responsible for rendering the form for users to create a new Discography 
export const DiscogForm = () => {
  const [genres, setGenres] = useState([])
  const [discog, setDiscog] = useState({})
  const [genresForDiscog, setGenresForDiscog] = useState([])
  let navigate = useNavigate()


  useEffect(() => {
    getAllGenres().then(genresData => setGenres(genresData))
  }, [])


  const updateGenres = (genreId) => {
    let genresCopy = [...genresForDiscog]
    const index = genresCopy.indexOf(genreId)
    if (index < 0) {
      genresCopy.push(genreId)
    } else {
      genresCopy.splice(index, 1)
    }
    setGenresForDiscog(genresCopy)
  }


  const handleSubmit = (evt) => {
    evt.preventDefault()
    const discogsData = {
      ...discog,
      genres: genresForDiscog
    }
    createDiscog(discogsData).then((discog) => {
      navigate(`/discogs/${discog.id}`)
    })
  }

// ---- Airbnb Code Sample ----



  const handleChange = (event) => {
    const newDiscog = { ...discog }
    newDiscog[event.target.name] = event.target.value
    setDiscog(newDiscog)
  }


  return (
    <section className="section">
      <article className="panel is-info">
        <h2 className="panel-heading">Create discog</h2>
        <div className="panel-block">
          <form style={{ width: "100%" }}>
            <div className="field">
              <label htmlFor="title" className="label">Title: </label>
              <div className="control">
                <input type="text" name="title" required className="input"
                  placeholder="Title"
                  value={discog.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="title" className="label">Artist: </label>
              <div className="control">
                <input type="text" name="artist" required className="input"
                  placeholder="Artist"
                  value={discog.artist}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="paid" className="label">Paid: </label>
              <div className="control">
                <input type="number" min="0" max="1000" name="paid" required className="input"
                  placeholder="Artist"
                  value={discog.paid}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="image" className="label">Image URL: </label>
              <div className="control">
                <div className="control">
                  <input type="text" name="image" required className="input"
                    placeholder="Image URL"
                    value={discog.image}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="condition" >Condition: </label>
              <div className="control">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="condition"
                    placeholder="mint, near mint ect...?"
                    value={discog.condition}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Genres: </label>
              {
                genres.map(genre => {
                  return (
                    <div className="field" key={`genre--${genre.id}`}>
                      <div className="control">
                        <label className="checkbox" htmlFor={genre.name}>
                          <input type="checkbox" name={genre.name}
                            checked={genresForDiscog.includes(genre.id)}
                            onChange={() => {
                              updateGenres(genre.id)
                            }} />
                          {genre.name}
                        </label>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={handleSubmit}
                  className="button is-link">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </article>
    </section>
  )
}
