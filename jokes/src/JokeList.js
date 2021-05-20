import React, { Component } from "react";
import axios from "axios"
import uuid from "uuid/dist/v4"
import Joke from "./Joke"

import "./JokeList.css"

class JokeList extends Component {
    constructor(props){
        super(props)
        this.state = { jokes: [] };
    }

    static defaultProps = {
        numJokesToLoad: 10
    }

    async componentDidMount(){
        // Load jokes from api
        let jokes = [];
        while (jokes.length < this.props.numJokesToLoad) {
            let res = await axios.get("https://icanhazdadjoke.com/", {headers: { Accept: "application/json"}})
            let joke = res.data.joke
            jokes.push({id: uuid(), joke: joke, votes: 0})
        }
        this.setState({ jokes: jokes })
    }

    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span>Jokes</h1>
                    <img 
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="Laughing smiley face - Icon by Dryicons" /> 
                    <button className="JokeList-getmore" >Get More Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(joke => <Joke key={joke.id} joke={joke} />)}
                </div>
                
            </div>
        )
    }
}

export default JokeList;