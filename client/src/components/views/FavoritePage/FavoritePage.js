import React, { useEffect, useState } from "react"
import "./favorite.css"
import Axios from "axios"

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem("userId") }
    
    const [FavoriteMovie, setFavoriteMovie] = useState([])

    useEffect(() => {
        Axios.post("/api/favorite/getFavoriteMovie", variables)
        .then(response => {
            if(response.data.success) {
                setFavoriteMovie(response.data.favorites)
            } else {
                alert("Failed to get favorite movies")
            }
        })
    }, [])

    const renderTableBody = FavoriteMovie.map((movie, index) => {
        return <tr>
            <td>{movie.movieTitle}</td>
            <td>{movie.movieRunTime} mins</td>
            <td><button>Remove from Favorites</button></td>
        </tr>
    })

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h3>My Favorite Movies</h3>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage