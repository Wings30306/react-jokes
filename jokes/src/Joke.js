import React, { Component } from "react";
import "./Joke.css"

class Joke extends Component {
    constructor(props){
        super(props)
        this.getColor = this.getColor.bind(this)
    }

    getColor(){
        if (this.props.votes >=15){
            return "#4caf50";
        } else if (this.props.joke.votes >=10){
            return "#8bc34a";
        } else if (this.props.joke.votes >=5){
            return "#cddc39";
        } else if (this.props.joke.votes >=0){
            return "#ffeb3b";
        } else if (this.props.joke.votes >=-5){
            return "#ffc107";
        } else if (this.props.joke.votes >=-10){
            return "#ff9800";
        } else {
            return "#f44336"
        }
    }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <button onClick={this.props.upvote}><i className="fas fa-arrow-up"></i></button>
                    <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.joke.votes}</span>
                    <button onClick={this.props.downvote}><i className="fas fa-arrow-down"></i></button>
                </div>
                <div className="Joke-text">{this.props.joke.joke}</div>
            </div>
        )
    }
}

export default Joke;