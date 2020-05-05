// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
  render() {
    const { film, displayDetailForFilm }  = this.props
    return (
      <TouchableOpacity 
      onPress={() => displayDetailForFilm(film.id)}
      style={styles.main_container}>
          <Image
          style={styles.image_film}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_film}>
            <View style={styles.title_text}>
                <Text style={styles.titre_film}>{film.title}
                </Text>
                <Text style={styles.vote_film}>{film.vote_average}
                </Text>
            </View>
            <Text style={styles.description_film}  numberOfLines={5}>{film.overview}
            </Text>
            <Text style={styles.sorti_film}> {film.release_date}
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image_film: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
    },
  content_film: {
    flex: 1,
    margin: 5
    },
  title_text: {
      flexDirection:'row',
      flex:1
    
  },
  description_film: {
    flex:2
},
sorti_film: {
    flex:1
},
vote_film: {
    flex:1
  
},
titre_film: {
    flex:2,
    flexWrap: 'wrap',
  
}
})

export default FilmItem