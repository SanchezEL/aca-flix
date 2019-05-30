import { connect } from 'react-redux'



export const myMovieListLoaded = (movies) => {
  return {
    type: "MY_MOVIE_LIST_LOADED",
    value: movies
  }
}

export const loadMyMovieList = () =>{
  return function (dispatch) {
    dispatch({
      type: "LOAD_MY_MOVIE_LIST"
    });
    fetch("/movies")
      .then(res => res.json())
      .then(results => dispatch(myMovieListLoaded(results)))
  }
  // return {
  //   type: "LOAD_MY_MOVIE_LIST",
  //   value: (dispatch) => {
  //     fetch("/movies")
  //       .then(res => res.json())
  //       .then(results => dispatch(myMovieListLoaded(results)))
  //   } 
  // }
}

export const loadSearch = (searchTerm) => {
  return function (dispatch) {
    dispatch({
      type: "LOAD_SEARCH"
    });
    fetch("https://api.themoviedb.org/3/movie/550?api_key=38177be7df1c718a9f7482f4244cac06")
      .then(res => res.json())
      .then(results => dispatch(searchLoaded(results)))
    // type: "LOAD_SEARCH",
    // movies: (dispatch) => {
    //   fetch("https://api.themoviedb.org/3/movie/550?api_key=38177be7df1c718a9f7482f4244cac06")
    //     .then(res => res.json())
    //     .then(results => dispatch(searchLoaded(results)))
    
  }
}

export const searchLoaded = (movies) => {
  return {
    type: "SEARCH_RESULTS_LOADED",
    value: movies.results
  }
}

export const saveMyMovie = (movie) => {
  return (dispatch) => {
    fetch('/movies', {
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(movie)
    })
    .then(() => dispatch(loadMyMovieList()))
  }
}

export const removeMyMovie = (movie) => {
  return (dispatch) => {
    fetch('/movies', {
      method: 'DELETe',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(movie)
    })
    .then(() => dispatch(loadMyMovieList()))
  }
}


