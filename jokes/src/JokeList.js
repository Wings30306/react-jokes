import React, { Component } from "react";
import axios from "axios"
import uuid from "uuid/dist/v4"
import Joke from "./Joke"

import "./JokeList.css"

class JokeList extends Component {
    constructor(props){
        super(props)
        this.state = { 
            jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
            loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke))
        this.handleVote = this.handleVote.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    static defaultProps = {
        numJokesToLoad: 10
    }

    async componentDidMount(){
        // Load jokes from api
        if(this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes(){
        try {
            this.setState({loading: true})
            let jokes = [];
            while (jokes.length < this.props.numJokesToLoad) {
                let res = await axios.get("https://icanhazdadjoke.com/", {headers: { Accept: "application/json"}})
                let joke = res.data.joke
                if(!this.seenJokes.has(joke)){
                    jokes.push({id: uuid(), joke: joke, votes: 0})
                } else {
                    console.log("Has duplicate: ", joke)
                }
                
            }
            this.setState(st => ({
                    jokes: [...st.jokes, ...jokes],
                    loading: false
                }),
                
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
            } catch (e) {
                alert(e);
                this.setState({ loading: false })
            }
        
    }

    handleVote(id, delta){
        this.setState(
            st => ({
                jokes: st.jokes.map(j => 
                    j.id === id ? {...j, votes: j.votes + delta } : j )}
        ),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }

    handleClick(){
        this.getJokes()
    }

    render() {
        if (this.state.loading){
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span>Jokes</h1>
                    <img 
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="Laughing smiley face - Icon by Dryicons" /> 
                    <button className="JokeList-getmore" onClick={this.handleClick}>Get More Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(joke => (
                    <Joke 
                        key={joke.id} 
                        joke={joke} 
                        upvote={() => this.handleVote(joke.id, 1)} 
                        downvote={() => this.handleVote(joke.id, -1)} 
                        />
                    ))}
                </div>
                
            </div>
        )
    }
}

export default JokeList;