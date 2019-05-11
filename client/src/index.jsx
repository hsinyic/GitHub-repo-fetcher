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
    this.setRepos = this.setRepos.bind(this);
    this.cb = this.cb.bind(this);
    this.get = this.get.bind(this);
  }
  componentDidMount() {
    this.get(this.cb);
  }

  search(term, cb) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      data: { term: term },
      url: 'http://127.0.0.1:1128/repos',
      // index.html:1 Access to XMLHttpRequest at 'http://localhost:1128/repos' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      success: res => {
        this.componentDidMount();
        // res = JSON.parse(res)
        // if (Array.isArray(res)) {
        //   this.setRepos(res);
        // }
      }
    })
  }
  setRepos(r) {
    this.setState({ repos: r })
  }

  cb(res) {
    res = JSON.parse(res)
    if (Array.isArray(res)){
      this.setRepos(res);
    }
  }

  get(cb) {
    console.log(`getting top 25 from Mongo`);
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:1128/repos',
      // index.html:1 Access to XMLHttpRequest at 'http://localhost:1128/repos' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      success: cb
    })
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search} cb={this.cb} />
      <RepoList repos={this.state.repos} />
      {/* <Search onSearch={this.search.bind(this)}/> can use this as well*/}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));