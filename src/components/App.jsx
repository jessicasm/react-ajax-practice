import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      serverResponse: 'Response Goes Here!'
    };
  }

  onNameInput(event) {
    this.setState({
      name: event.target.value
    })
  }

  onMessageInput(event) {
    this.setState({
      message: event.target.value
    })
  }

  onSend(event) {
    var input = {
      name: this.state.name,
      message: this.state.message
    };

    $.ajax({
      url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting',
      type: 'POST',
      data: JSON.stringify(input),
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          serverResponse: data
        })
      }
    })

  }

  render() {
    return (
      <div>
        <div>Server Response:</div>
        <div>{this.state.serverResponse}</div>
        <form>
          Name: <input type="text" onInput={this.onNameInput.bind(this)}></input>
          Message: <input type="text" onInput={this.onMessageInput.bind(this)}></input>
          <button type="button" onClick={this.onSend.bind(this)}>Send Message</button>
        </form>
      </div>
    )
  }
} 

export default App;