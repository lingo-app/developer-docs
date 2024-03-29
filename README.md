# developer.lingoapp.com

This repo powers the development site for [Lingo Developer Docs](http://developer.lingoapp.com)

## Contribute!

We've made this repository public so you can contribute to it. If you find a typo, or an error, or want to improve the content, feel free to send us a pull request. Also, if there's anything you'd like to see covered or documented, file an issue and we'll do it for you.

We use [Jekyll](http://jekyllrb.com) as our content backend, so make sure to read their docs if you need help understanding how the system works.

## Setup

To build the site you will need:

- [Node](https://nodejs.org/en/)
- Ruby
- [Bundler](http://bundler.io)

On older versions of macOS (<10.15) you may need to install a newer version of Ruby, more details on that in this [jekyll guide](https://jekyllrb.com/docs/installation/macos/#set-up-ruby).

After that is setup run:

```
gem install --user-install bundler jekyll
```

Finally, to build and view, run:

```
yarn start
```

## Deploying

The docs are automatically deployed by GitHub actions when merging into Master. To deploy manually run `npm deploy`
