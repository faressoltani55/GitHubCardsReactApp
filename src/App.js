import './App.css';
import React from "react";
import axios from 'axios';

const title = "The GitHub Cards App";

class Card extends React.Component {s
  render() {
    const profile = this.props;
    return (
        <div class="github-profile">
          <img src= {profile.avatar_url} />
          <div className="info">
            <div className="name">{profile.name}</div>
            <div className="company">{profile.login}</div>
          </div>
        </div>
    );
  }
}

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
);

class Form extends React.Component {
    state = {username: ''};

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);
        this.props.onSubmit(resp.data)
        console.log(resp.data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="GitHub Username"
                       value={this.state.username}
                       onChange={event => this.setState({username: event.target.value})}
                       required/>
                <button>Add Card</button>
            </form>
        );
    }
}

class App extends React.Component {
  state = {
      profiles: []
  };

  addNewProfile = (profileData) => {
      this.setState(prevState => ({
          profiles: [...prevState.profiles, profileData]
      }))
  }

  render() {
    return (
        <div>
          <div className="header">{title}</div>
          <Form onSubmit={this.addNewProfile} />
          <CardList profiles = {this.state.profiles} />
        </div>
    );
  }
}

export default App;
