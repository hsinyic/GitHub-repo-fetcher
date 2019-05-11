import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  search (term) {
    console.log(this);
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      data: JSON.stringify(term),
      url: 'http://localhost:1128/repos',
      success: function(err, response){
        if (err){
          console.log(err);
        } else {
          console.log('post success')
          console.log(response);
        }
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
      {/* <Search onSearch={this.search.bind(this)}/> can use this as well*/} 
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));