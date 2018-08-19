import React, { Component } from 'react'
import Note from './Note'
import { FaPlus } from 'react-icons/fa'

class Board extends Component{

    constructor(props){
        super(props)

        this.state = {
          notes: []
        }

        this.eachNote = this.eachNote.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
        this.addNote = this.addNote.bind(this)
        this.getNextId = this.getNextId.bind(this)
    }

    componentWillMount() {
  		var self = this
  		if(this.props.count) {
  			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
  				.then(response => response.json())
  				.then(json => json[0]
  								.split('. ')
  								.forEach(sentence => self.addNote(sentence.substring(0, 25))))
  		}
  	}

    addNote(noteText){
        this.setState(
            prevState => ({
                notes: [
                    ...prevState.notes,
                    {
                        id: this.getNextId(),
                        note: noteText
                    }
                ]
            })
        )
    }

    updateNote(newText, i){
        console.log("Updating note at index", i , newText)
        this.setState( prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note : newText}
            )
        }))
    }

    removeNote(id){
        console.log("Removing note at", id)
        console.log(this.state.prevState)
        this.setState(
            prevState =>({
                notes: prevState.notes.filter(note => note.id !== id)
            })
        )
    }

    getNextId(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    eachNote(note){
        return (
            <Note key = {note.id} index = {note.id} onChange = {this.updateNote} onRemove = {this.removeNote}>
              {note.note}
            </Note>
        )
    }

    render(){
        return(
            <div className = "board">
                {this.state.notes.map(this.eachNote)}
                <button id = "add" onClick = {this.addNote.bind(null, "New Note")}>
                    <FaPlus/>
                </button>
            </div>
        )
    }

}

export default Board
