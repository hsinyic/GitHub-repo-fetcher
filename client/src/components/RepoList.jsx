import React from 'react';

const RepoList = (props) => {
  var list = props.repos.map((item, idx) => {
    var avatar = 'https://github.com/' + item.owner_login + '.png?size=50'
    return (
      <div className='repoList' key={idx.toString()}>
          <section>
          <img className="fit-picture"
            src={avatar}
            alt="Grapefruit slice atop a pile of other slices" 
          />
          <ul>
            <div id="username">user - {item.owner_login}</div>
            <div id="name">repo name - {item.name}</div>
            <div id="description"> description - {item.description}</div>
            <div id="stars"> hearts - {item.stargazers_count}</div>
            <div id="forks">forks - {item.forks}</div>
            <a href={item.html_url} id='item_link'>repo name - {item.name}</a>
          </ul>

          </section>

      </div>
    )
  })
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    <div>
        {list}
      </div>
    </div>
  )
}

export default RepoList;