// Copyright 2017 The Rustw Project Developers.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

import * as React from 'react';

import { CodeBrowser } from './codeBrowser';

const PageTemplate = ({children}) =>
  <div id="div_app">
      <div id="div_main">
          {children}
      </div>
  </div>

export const Home = () =>
  <PageTemplate>
    <section className="home">
      [Home]
    </section>
  </PageTemplate>

export const Search = () =>
  <PageTemplate>
    <section className="search">
      [Search]
    </section>
  </PageTemplate>

export const Source = ({match}) =>
  <PageTemplate>
    <section className="source">
      <CodeBrowser path={match.params[0]} />
    </section>
  </PageTemplate>
