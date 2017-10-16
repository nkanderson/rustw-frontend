// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import * as React from 'react';
import { Route } from 'react-router-dom';
import qs from 'query-string';

import { TopBar } from './topbar';
import { CodeBrowser } from './codeBrowser';
import { SearchResults } from "./searchResults";

export const PageTemplate = () => {
  return <div id="div_app">
    <TopBar />
    <div id="div_main">
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/browse(/\w+\.?\w+)*" component={Source} />
    </div>
  </div>
}

export const Home = () =>
  <section className="home">
    <CodeBrowser path="/browse/src" />
  </section>

export const Search = ({ location }) => {
  const query = qs.parse(location.search).needle;
  return <section className="search" id="div_search_results">
      <SearchResults query={query} />
    </section>
}

export const Source = ({match}) =>
  <section className="source">
    <CodeBrowser path={match.params[0]} />
  </section>
