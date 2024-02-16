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







// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { getDiscogById, updateDiscog, getDiscogGenres } from "./DiscogManager"

// export const EditDiscog = () => {
//   const [discog, setDiscog] = useState({})
//   const [genres, setGenres] = useState([])
//   const [genresForDiscog, setGenresForDiscog] = useState([])
//   const { discogId } = useParams()
//   let navigate = useNavigate()

//   const [currentDiscog, setCurrentDiscog] = useState({
//     artist: 1,
//     title: 0,
//     title: "",
//     maker: "",
//     gameTypeId: 0
// })


//   useEffect(() => {
//     getDiscogById(discogId).then(data => {
//       data.category=data.category.id
//       setDiscog(data)
//       const genreId = data.discog_genres.map(g => g.id)
//       setGenresForDiscog(genreId)
//     })
//     getDiscogGenres().then(data => setGenres(data))
//   }, [discogId])

//   const updateGenres = (genreId) => {
//     const genresCopy = [...genresForDiscog]
//     const index = genresCopy.indexOf(genreId)
//     if (index < 0) {
//       genresCopy.push(genreId)
//     } else {
//       genresCopy.splice(index, 1)
//     }
//     setGenresForDiscog(genresCopy)
//   }

//   const handleSubmit = (evt) => {
//     evt.preventDefault()
//     discog.genres=genresForDiscog
//     updateDiscog(discogId, discog).then((discog) => {
//       navigate(`/discogs/${discogId}`)
//     })
//   }

//   const handleChange = (event) => {
//     const discogCopy = { ...discog }
//     discogCopy[event.target.name] = event.target.value
//     setDiscog(discogCopy)
//   }


//   return (
//     <section className="section">
//       <article className="panel is-info">
//         <h2 className="panel-heading">Update discog</h2>
//         <div className="panel-block">
//           <form style={{ width: "100%" }}>
//             <div className="field">
//               <label htmlFor="title" className="label">Title: </label>
//               <div className="control">
//                 <input type="text" name="title" required autoFocus className="input"
//                   placeholder="Title"
//                   value={discog.title}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label htmlFor="image_url" className="label">Image URL: </label>
//               <div className="control">
//                 <div className="control">
//                   <input type="text" name="image_url" required autoFocus className="input"
//                     placeholder="Image URL"
//                     value={discog.image_url}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="field">
//               <label htmlFor="content" className="label">Condition: </label>
//               <div className="control">
//                 <div className="control">
//                   <textarea
//                     className="textarea"
//                     name="condition"
//                     value={discog.condition}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             <div className="field">
//               <label htmlFor="content" className="label">Tags:</label>
//               {
//                 genres.map(genre => (
//                   <div className="field" key={`genre--${genre.id}`}>
//                     <div className="control">
//                       <label className="checkbox" htmlFor={genre.name}>
//                         <input type="checkbox" name={genre.name}
//                           checked={genresForDiscog.includes(genre.id)}
//                           onChange={() => {
//                             updateGenres(genre.id)
//                           }} />
//                         {genre.name}
//                       </label>
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>
//             <div className="field">
//               <div className="control">
//                 <button type="submit"
//                   onClick={handleSubmit}
//                   className="button is-success">
//                   Save
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </article>
//     </section>
//   )
// }
