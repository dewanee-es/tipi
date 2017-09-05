# Sunstreet
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/zalando/sunstreet/master/LICENSE)
[![Build Status](https://travis-ci.org/zalando/sunstreet.svg?branch=master)](https://travis-ci.org/zalando/sunstreet)

<small>By Ismail Marmoush and [Contributers](https://github.com/zalando/sunstreet/graphs/contributors) are much welcome to join. </small>

Sunstreet is a minimalistic blog template, specially made for Github pages and can be statically/dynamically served anywhere else too. You can view the demo from [zalando.github.io/sunstreet](http://zalando.github.io/sunstreet).

![Screenshot Am I Responsive](https://raw.githubusercontent.com/zalando/sunstreet/master/screentshot.png)


### Usage Features
* **Markdown Template** --- You write your documents in markdown, add the new post path to the content.json file and that's it.
* **Runtime compilation** --- After you write your documents, you only need to push to the repository, so no html compilation which means you don't need to install nodejs/ruby in order to have a blog, unlike many other tools (e.g Octopus) which requires you to compile templates everytime you edit a post.
* **Responsive** --- Try [screenify](http://screenify.com) to see how it looks on different devices.
* **Single Page App**  --- Using [Routie](http://projects.jga.me/routie/) we have hash based navigation, that is compatible with github pages, and older browsers e.g http://hostname.com/#/my-first-post.
* **Minimalistic** -- The design was inspired by [Medium](http://medium.com), and [Slidebars](http://plugins.adchsm.me/slidebars/) demo website.
* **Dynamic TOC** --- A dynamic table of contents, Inspired by [stackeditor](http://stackeditor.io).
* **Code Hilighting** -- HighlightJS is included.
* **Github API** ---  Since contents compiled on the fly this made it possible to also load any document found on github, such as projects' README.md, examples are in demo version.
* **Disqus** --- Disqus comments plugin, wish SPA hash support.
* **Analytics** --- Google Analytics with SPA hash support.
* **CMS** check http://project/cms.html

### Development Features
1. **Architecture** ---  We try to follow 12Factor app guidlines.
1. **Build** --- We use Gulp to build, compile and optimize artifacts the project, using `gulp` command.
2. **Serve** --- Site can be simply served with  `gulp serve`
2. **Javascript** --- Simple and in one file `main.js` the code is is compatible with jshint.
3. **Html5**
4. **CSS** --- Built by [Less](http://lesscss.org) for maximum maintability, simplicity, and productivity.
5. **gulp deploy** --- Deploys the distribution to repo gh-pages branch (note I guess it only works when you have push rights)

### Users
You just download the [Demo source](https://github.com/zalando/sunstreet/tree/gh-pages)  (which is latest version) and edit the `index.html` and `content.json` to fit your needs.
> Note: The content folder is where you put all of your contents, other folders are for the Application itself.

### Developers/Hackers
1. `npm install jshint -g`  you'll need this if you're using EMACS jshint adhook.
2. You clone this repo.
3. cd to the project and `npm install`  and `bower install`
4. `npm install -g gulp`
5. build using `gulp`  , and run test server using  `gulp serve`.

## Contribution and Future features
Small Pull Requests are much welcome, just don't forget to comment them, as for bigger PRs they might take longer time since I might not have time reviewing them all.

As for future plan here's a humble brain storm:

* ~~Update dependencies.~~
* ~~Removing Personal data~~
* ~~Add Markdown test page~~
* ~~More reliance on `content.json` file instead of hardcoding any content, e.g disqus configurations~~ Done
* ~~Continuous integration if necessary.~~ Done
* ~~`content.json` validation~~ Done
* JS code modularity and pluggability.
* CSS templating
* ~~gh-pages deployment branch~~  Done using `gulp deploy!` super cool
* Travis to gh-pages branch
* More improvements on tests

## Licence
Copyright (c) 2015 Ismail Marmoush and other contributors. Licensed under the MIT. See [License](https://opensource.org/licenses/MIT)
