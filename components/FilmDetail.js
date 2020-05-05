// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import {connect } from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){
      const action = { type: "TOOGLE_FAVORITE", value: this.state.film}
      this.props.dispatch(action)

  }

  componentDidUpdate(){
      console.log(this.props.favoritesFilm);
      
  }

  _displayFilm() {
      const film = this.state.film
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
         <Image
          style={styles.image_film}
          source={{uri: getImageFromApi(film.backdrop_path)}}>
          </Image>
          <Text style = {styles.titleFilm}> {film.title}</Text>
          <Button title="Favoris" onPress={() => this._toggleFavorite()}></Button>
          <Text style = {styles.overviewFilm}> {film.overview}</Text>
          <Text style = {styles.dateFilm}>Sorti le {moment(film.release_date).format('DD/MM/YYYY')}</Text>
          
        </ScrollView>
      )
    }
  }

  render() {
      console.log(this.props);
      
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image_film: {
    flex: 1,
    height: 180,
    
  },
  titleFilm: {
      fontSize: 20,
      textAlign: "center",
      flex: 1
  },
  overviewFilm: {
      fontStyle: "italic",
      flex: 1,
      color: "grey",
      marginTop: 15,

      
  }

  
})
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default  connect(mapStateToProps)(FilmDetail)