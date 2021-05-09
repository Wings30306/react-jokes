import React, { Component } from "react";
import Joke from "./Joke"

class JokeList extends Component {
    render() {
        return (
            <div>
                <h1>Dad Jokes</h1>
                <Joke />
            </div>
        )
    }
}

export default JokeList;