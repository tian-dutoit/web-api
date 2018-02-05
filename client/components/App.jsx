import React from 'react'
import request from 'superagent'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import Profile from './Profile'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
    this.showUsers = this.showUsers.bind(this)
  }

  componentDidMount () {
    this.showUsers()
  }

  showUsers () {
    request
      .get('/api/v1/users')
      .then(res => {
        this.setState({
          users: res.body.users
        })
      })
  }

  render () {
    return (
      <Router>

        <div>
          <h1>Hello</h1>
          <ul>
            {this.state.users.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/${user.id}`} > <li>{user.name}</li> </Link>
                  <Route path='/:id' render = {(props) => {
                    return (
                      <Profile user={user} {...props}/>
                    )
                  }} />
                </div>)
            })}
          </ul>
        </div>
      </Router>

    )
  }
}

export default App
