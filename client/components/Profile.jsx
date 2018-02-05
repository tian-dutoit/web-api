import React from 'react'
import request from 'superagent'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  render () {
    const id = this.props.match.params.id
    return (
      <div>
        {this.props.user.id === Number(id) &&
        <div>
          <p>{this.props.user.name}</p>
          <p>{this.props.user.email}</p>
        </div>
        }
      </div>
    )
  }
}
export default Profile
