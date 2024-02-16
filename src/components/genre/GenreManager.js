export const getAllGenres = () => {
    return fetch('http://localhost:8000/genres', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('disc_token')}`
      }
    }).then(res => res.json())
  }

  export const updatGenre = (genre) => {
  return fetch(`http://localhost:8000/genres/${genre.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('disc_token')}`
      },
      body: JSON.stringify(genre)
  })
}
