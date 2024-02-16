import { useState, useEffect } from "react"

import { DiscogList } from "./DiscogList"
import { deleteDiscog } from "./DiscogManager"
import { PostsTable } from "./PostsTable"


export const MyDiscog = () => {
  const [discogs, setDiscogs] = useState([])

  const loadDiscogs = () => {
    getCurrentUsersPosts()
      .then((discogArray) => {
        setDiscogs(discogArray)
      })
  }

  useEffect(() => {
    loadDiscogs()
  }, [])

  const deleteClickEvent = (id) => {
    deleteDiscog(id).then(() => {
      loadDiscogs()
    })
  }

  return (
    <section className="section">
      <h1 className="title">My Posts</h1>
      <DiscogList discogs={discogs} deleteClickEvent={deleteClickEvent} />
    </section>
  )
}
