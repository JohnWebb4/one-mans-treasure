import React from 'react';
import axios from 'axios';

class Comments extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      text: '',
      userId: this.props.userId,
      username: this.props.user,
      postDate: Date.now()
    }
  }

  changeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleCommentSubmit() {
    console.log('These are props handed down to Comments', this.props)
    console.log('These are in the state: ', this.state)
    // send message to server
    console.log('This is the text: ', this.state.text);
    axios.post('/api/comments', 
    {
      text: this.state.text,
      userId: this.state.userId,
      username: this.state.username,
      postDate: this.state.date,
      listingId: this.props.listingId

    }).then(response => {
      console.log('results: ', response)
      console.log('Comment sent from client to server!')
      this.props.fetchOneListing(this.props.listingId)
    }).catch(error => {
      console.error(error.response)
    })
  }

  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>

        <div className="comment">
          <a className="avatar">
            <img src="" />
          </a>
          <div className="content">
            <a className="author">Matt</a>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">
              How artistic!
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>

        <form className="ui reply form">
          <div className="field">
            <textarea 
              onChange={this.changeText.bind(this)}>
            </textarea>
          </div>
          <div 
            className="ui blue labeled submit icon button" 
            onClick={this.handleCommentSubmit.bind(this)}>
            <i className="icon edit"></i> 
            Add Reply
          </div>
        </form>
      </div>
    )
  }
}

export default Comments;