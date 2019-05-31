import { connect } from 'react-redux'

export const loadMyMovieList = () =>{
  return function (dispatch) {
    fetch("/movies")
      .then(res => res.json())
      .then(results => dispatch(myMovieListLoaded(results)))
  }
}
export const myMovieListLoaded = (movies) => {
  return {
    type: "MY_MOVIE_LIST_LOADED",
    value: movies
  }
}

export const loadSearch = (searchTerm) => {
  console.log(searchTerm)
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=38177be7df1c718a9f7482f4244cac06`)
      .then(res => res.json())
      .then(results => dispatch(searchLoaded(results)))
  }
}

export const searchLoaded = (movies) => {
  console.log(movies)
  return {
    type: "SEARCH_RESULTS_LOADED",
    value: movies.results
  }
}

export const saveMyMovie = (movie) => {
  console.log(movie)
  return (dispatch) => {
    fetch('/movies', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then((res)=> {
      console.log(res)
      return res.json()})
    .then(() => dispatch(loadMyMovieList()))
  }
}

export const removeMyMovie = (id) => {
  return function (dispatch) {
  fetch(`/movies/${id}`, {
    method: "delete"
  })
    .then((res) => {
      return res.json();})
    .then((movies) => {
      dispatch(loadMyMovieList());
  });
}
}

