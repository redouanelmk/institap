import React from 'react'
import { FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { from } from 'rxjs/observable/from'


class Search extends React.Component {

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
        }
        this.searchedText= ""
    }

    _loadFilms(){
        if (this.searchedText.length > 0){
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data=> {
                    this.page=data.page
                    this.totalPages=data.total_pages
                    this.setState({
                        films: [ ...this.state.films, ...data.results ]
                    })
                })
            }
        }

 

    _searchedTextInputChange(text){
        this.searchedText= text
    }

    _searchFilms(){
        this.page = 0
        this.totalPages=0
        this.setState({
            films: []
        })
        this._loadFilms()
    }
    
    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        console.log("RENDER")
        return (
            <View style={styles.main_container}>
                <TextInput 
                    onChangeText = {(text) => this._searchedTextInputChange(text) }
                    style={styles.TextInput } 
                    placeholder='Titre du film'   
                    onSubmitEditing={()=> this._searchFilms()} />
                <Button style={styles.button } title='Rechercher'  onPress={() => this._searchFilms()}  />
                <FlatList 
                 onEndReachedThreshold ={0.5}
                 onEndReached= {() => {
                    if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                    this._loadFilms()
                 }
                 }}
                    data={this.state.films}
                    keyExtractor= {(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm= {this._displayDetailForFilm}/>}
                      />

            </View>

        )}
} 

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        justifyContent:"center",
        alignContent:"center"
        
    },
    TextInput: {
        width:200,
        borderWidth: 1, 
        borderColor: 'black',
    },
    button: {
        borderWidth: 2, 
        borderColor: 'black',
        overflow: 'hidden'
    }
})

export default Search