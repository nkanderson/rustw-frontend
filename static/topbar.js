// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import React from 'react';
import { connect } from 'react-redux';

import { Menu, MenuHost } from './menus';
import * as actions from './actions';

class TopBar extends React.Component {
    render() {
        return <div id="div_header_group">
              <div id="div_header">
                <BrowseLink onClick={this.props.clickBrowseLink} />
                <SearchBox getSearch={this.props.getSearch} />
              </div>
            </div>;
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        clickBrowseLink: () => dispatch(actions.getSource(CONFIG.source_directory)),
        getSearch: (needle) => dispatch(actions.getSearch(needle)),
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    let props = Object.assign({}, stateProps, dispatchProps);
    return props;
};

export const TopBarController = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(TopBar);

function renderLink(text, id, onClick) {
    let className = "header_link",
        onClickFn = onClick;

    return <span id={id} className={className} onClick={onClickFn}>{text}</span>;    
}

function BrowseLink(props) {
    return renderLink("browse source", "link_browse", props.onClick);
}

function SearchBox(props) {
    const enterKeyCode = 13;
    const onKeyPress = (e) => {
        if (e.which === enterKeyCode) {
            props.getSearch(e.currentTarget.value);
        }
    };

    return <input id="search_box" placeholder="identifier search" autoComplete="off" onKeyPress={onKeyPress}></input>;
}
