export const getDiscogs = () => {
    return fetch("http://localhost:8000/discogs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("disc_token")}`
        }
    })
        .then(response => response.json())
}

export const getDiscogById = id => {
    return fetch(`http://localhost:8000/discogs/${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('disc_token')}`
      }
    })
      .then(res => res.json())
  }

export const createDiscog = (discog) => {
    return fetch("http://localhost:8000/discogs", { 
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("disc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(discog)
    })
        .then(response => response.json())
}

export const updateDiscog = (id, discog) => {
  return fetch(`http://localhost:8000/discogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Token ${localStorage.getItem('disc_token')}`
    },
    body: JSON.stringify(discog)
  })
}

export const getDiscogGenres = () => {
    return fetch("http://localhost:8000/genres", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("disc_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteDiscog = (discogId) => {
    return fetch(`http://localhost:8000/discogs/${discogId}/removed`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('disc_token')}`
      }
    })
  }

  export const collectDiscog = (discogId) => {
    return fetch(`http://localhost:8000/discogs/${discogId}/saved`, {
      method: "POST",
      headers: {
        'Authorization': `Token ${localStorage.getItem('disc_token')}`
      },
      body: JSON.stringify(discogId)
    })
  }


