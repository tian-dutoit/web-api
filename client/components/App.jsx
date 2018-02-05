import React from 'react'
import request from 'superagent'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import Profile from './Profile'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      users: [],
      name: '',
      email: ''
    }
    this.showUsers = this.showUsers.bind(this)
    this.handleAddUser = this.handleAddUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleAddUser (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    request
      .post('/api/v1/users')
      // .set('Content-Type', 'application/json')
      .send({user: {name: this.state.name, email: this.state.email}})
      .then(() => {
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

          <form>
            <div>
              User Name: <input name='name' onChange={this.handleAddUser} />
              User Email: <input name='email' onChange={this.handleAddUser} />
            </div>
            <button type='button' onClick={this.handleSubmit}>Submit</button>
          </form>

        </div>
      </Router>

    )
  }
}

export default App
