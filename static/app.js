// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import thunk from 'redux-thunk';
import { rustwReducer, Page } from './reducers';
import * as actions from './actions';
import styles from './rustw.css';

import * as utils from './utils';
import { FindResults, SearchResults } from "./search";
import { DirView } from './dirView';
import { SourceViewController } from './srcView';
import { Summary } from './summary';
import { SidebarController } from './Sidebar';

// TODOs in build

class RustwApp extends React.Component {
    componentWillMount() {

        // history.replaceState(MAIN_PAGE_STATE, "");
        // window.onpopstate = onPopState;
    }

    componentDidMount() {
        $.ajax({
            dataType: "json",
            url: "/config",
            success: (data) => {
                CONFIG = data;
            },
            error: () => {
              CONFIG = {
                  "build_command": "cargo check",
                  "edit_command": "",
                  "unstable_features": false,
                  "port": 7878,
                  "demo_mode": false,
                  "demo_mode_root_path": "",
                  "context_lines": 2,
                  "build_on_load": false,
                  "source_directory": "src",
                  "save_analysis": true,
                  "vcs_link": ""
              };
            },
            async: false,
        });
        store.dispatch(actions.getSource(CONFIG.source_directory));
    }

    render() {
        let divMain;
        switch (this.props.page.type) {

            case Page.SOURCE:
                divMain = <SourceViewController path={this.props.page.path} lines={this.props.page.lines} highlight={this.props.page.highlight} scrollTo={this.props.page.lineStart} />;
                break;
            case Page.SOURCE_DIR:
                divMain = <DirView file={this.props.page.name} files={this.props.page.files} getSource={this.props.getSource} />;
                break;
            case Page.LOADING:
                divMain = <div id="div_loading">Loading...</div>;
                break;
            case Page.SUMMARY:
                divMain = <Summary breadCrumbs={this.props.page.breadCrumbs} parent={this.props.page.parent} signature={this.props.page.signature} doc_summary={this.props.page.doc_summary} doc_rest={this.props.page.doc_rest} children={this.props.page.children} />;
                break;
            case Page.INTERNAL_ERROR:
                divMain = "Server error?";
                break;
            case Page.START:
            default:
                divMain = null;
        }

        return <div id="div_app">
            <div id="div_main">
                <SidebarController page={this.props.page}/>
                {divMain}
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSource: (fileName, lineStart) => dispatch(actions.getSource(fileName, lineStart)),
    }
}

const AppController = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RustwApp));


let store = createStore(rustwReducer, applyMiddleware(thunk));

export function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Route path='/' component={AppController} />
            </Router>
        </Provider>,
        document.getElementById('container')
    );
}
