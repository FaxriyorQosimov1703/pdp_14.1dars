import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import Post from './PAGES/Post/Post';
import Todos from './PAGES/Todos/Todos';
import Users from './PAGES/Users/Users';
import OnePost from './PAGES/Post/OnePost'

function App() {
    return (
        <div className="container mt-4">
            <Link to="/posts"><button className="btn btn-dark mx-2">Posts</button></Link>
            <Link to="/todos"><button className="btn btn-dark mx-2">Todos</button></Link>
            <Link to="/users"><button className="btn btn-dark mx-2">Users</button></Link>

            <Switch>
                <Route path="/posts/:id" component={OnePost} />
                <Route path="/posts" component={Post} />
                <Route path="/todos" component={Todos} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    )
}

export default App
