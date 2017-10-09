// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import * as React from 'react';
import qs from 'query-string';

import { CodeBrowser } from './codeBrowser';
import { SearchResults } from "./searchResults";

const PageTemplate = ({children}) =>
  <div id="div_app">
      <div id="div_main">
          {children}
      </div>
  </div>

export const Home = () =>
  <PageTemplate>
    <section className="home">
      <CodeBrowser path="/browse/src" />
    </section>
  </PageTemplate>

export const Search = ({ location }) => {
  const query = qs.parse(location.search).needle;
  return <PageTemplate>
    <section className="search" id="div_search_results">
      <SearchResults query={query} />
    </section>
  </PageTemplate>
}

export const Source = ({match}) =>
  <PageTemplate>
    <section className="source">
      <CodeBrowser path={match.params[0]} />
    </section>
  </PageTemplate>
