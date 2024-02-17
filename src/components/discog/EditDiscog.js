import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getDiscogGenres, getDiscogById, updateDiscog } from "./DiscogManager"


export const EditDiscog = () => {
    const navigate = useNavigate()
    const {discogId} = useParams()
    const [discogGenres, setDiscogGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]) 
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentDiscog, setCurrentDiscog] = useState({
        artist: "",
        title: "",
        condition: "",
        paid: 0,
        image: "",
        genres: 0
    })

    useEffect(() => {
        getDiscogGenres().then(data => setDiscogGenres(data))
        getDiscogById(discogId).then(data => {
          const genreId = data.genres.map(g => g.id)
          setSelectedGenres(genreId)
          setCurrentDiscog(data)})
    }, [])

    const changeDiscogState = (domEvent) => {
        const copy = { ...currentDiscog }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentDiscog(copy)
    }


  const updateGenres = (genreId) => {
    const discogGenresCopy = [...selectedGenres]
    const index = discogGenresCopy.indexOf(genreId)
    if (index < 0) {
      discogGenresCopy.push(genreId)
    } else {
      discogGenresCopy.splice(index, 1)
    }
    setSelectedGenres(discogGenresCopy)
  }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Discog</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Title: </label>
                    <input type="text" name="title" required className="form-control"
                        value={currentDiscog.title}
                        onChange={
                            (evt) =>
                            changeDiscogState(evt)
                        }
                        />
                        <label htmlFor="title">artist: </label>
                    <input type="text" name="artist" required autoFocus className="form-control"
                        value={currentDiscog.artist}
                        onChange={
                            (evt) =>
                            changeDiscogState(evt)
                        }
                        />
                        <label htmlFor="title">Condition: </label>
                    <textarea type="textarea" name="condition" required className="form-control"
                        value={currentDiscog.condition}
                        onChange={
                            (evt) =>
                            changeDiscogState(evt)
                        }
                        />
                        <label htmlFor="title">Paid: </label>
                    <input type="number" name="paid" required className="form-control"
                        value={currentDiscog.paid}
                        onChange={
                            (evt) =>
                            changeDiscogState(evt)
                        }/>
                        <label htmlFor="content" className="label">Genres:</label>
                      {
                        discogGenres.map(genre => (
                          <div className="field" key={`genre--${genre.id}`}>
                            <div className="control">
                              <label className="checkbox" htmlFor={genre.name}>
                                <input type="checkbox" name={genre.name}
                                  checked={selectedGenres.includes(genre.id)}
                                  onChange={() => {
                                    updateGenres(genre.id)
                                  }} />
                                {genre.name}
                              </label>
                            </div>
                          </div>
                        ))
                      }
                </div>
            </fieldset>

            <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    updateDiscog(discogId, currentDiscog)
                                    .then(() => navigate("/"))
                                }}
                                className="button is-link">
                                update
                            </button>
                        </div>
                    </div>
        </form>
    )
}