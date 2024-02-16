export const getDiscUsers = () => {
    return fetch("http://localhost:8000/discusers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("disc_token")}`
        }
    })
        .then(response => response.json())
}

export const getDiscUserById = id => {
    return fetch(`http://localhost:8000/discusers/${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('disc_token')}`
      }
    })
      .then(res => res.json())
  }
