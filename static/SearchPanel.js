// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import React from 'react';
import { connect } from 'react-redux';

import { FindResults, SearchResults } from "./search";
import { Menu, MenuHost } from './menus';
import * as actions from './actions';

class SearchPanel extends React.Component {
    render() {
        return <SearchBox getSearch={this.props.getSearch} />
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSearch: (needle) => dispatch(actions.getSearch(needle)),
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    let props = Object.assign({}, stateProps, dispatchProps);
    return props;
};

export const SearchPanelController = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SearchPanel);



function SearchBox(props) {
    const enterKeyCode = 13;
    const onKeyPress = (e) => {
        if (e.which === enterKeyCode) {
            props.getSearch(e.currentTarget.value);
        }
    };

    return (<div>
        <input id="search_box" placeholder="identifier search" autoComplete="off" onKeyPress={onKeyPress}></input>
    </div>)
}
