import React, { useEffect, useState } from "react"
import "./favorite.css"
import Axios from "axios"
import  { Popover } from "antd";
import { IMAGE_URL } from "../../Config";

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem("userId") }
    
    const [FavoriteMovies, setFavoriteMovies] = useState([])

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post("/api/favorite/getFavoriteMovie", variables)
        .then(response => {
            if(response.data.success) {
                setFavoriteMovies(response.data.favorites)
            } else {
                alert("Failed to get favorite movies")
            }
        })
    }

    const onClickRemove = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem("userId")
        }

        Axios.post("/api/favorite/removeFromFavorite", variable)
            .then(response => {
                if(response.data.success){
                    fetchFavoritedMovies();
                } else {
                    alert("Failed to remove from Favorite")
                }
            })
    }

    const renderTableBody = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ?
                <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost" />
                :
                "No Image"
                }
            </div>
        )

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
            <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from Favorites</button></td>
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