import React, { Component } from "react";
import axios from "axios"
import Joke from "./Joke"

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
            jokes.push(joke)
        }
        this.setState({ jokes: jokes })
    }

    render() {
        return (
            <div className="JokeList">
                <h1>Dad Jokes</h1>
                {this.state.jokes.map(joke => <Joke key={joke} joke={joke} />)}
            </div>
        )
    }
}

export default JokeList;