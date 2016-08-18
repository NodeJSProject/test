# Super MEAN Stack
>  MongoDB + Express + Angular + Node + gulp

*Note: 

## Live App Demo

Please don't abuse--although I realize I have no control over this :).

http://super-mean-stack.herokuapp.com/

![Alt text](http://i288.photobucket.com/albums/ll175/michaelcheng429/Screen%20Shot%202016-02-02%20at%2011.10.48%20PM_zpsznagbxtb.png)

## Setup

#### Option 1: Main Repository
1. `git clone git@github.com:michaelcheng429/super-mean-stack.git`
2. `cd super-mean-stack`
3. `npm install`

#### Option 2: Yeoman Generator
1. `npm install -g yo`
2. `npm i -g generator-super-mean-stack`

## Usage

### Development
1. Make sure MongoDB is running (`mongod` from MongoDB bin directory)
2. `npm test` (file webpack uncompress) or `npm start` (file webpack compress) 

### Production/Deployment (e.g., to Heroku)

Make sure Heroku Toolbelt is installed (https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

1. `npm run build`
2. `git init`
3. `heroku create {name-of-app}`
4. `git push heroku master`
5. `heroku addons:create mongolab:sandbox`

#### Troubleshooting
1. Use Node version 5.5.0, which is the version used to create this app. You can use `n` (https://github.com/tj/n) or `nvm` (https://github.com/creationix/nvm) to change Node versions easily.

## YouTube Tutorial Video

https://youtu.be/6Sbau-oE37w

## Todos
1. Add testing
2. ~~Add deployment instructions~~
3. Add comments to code

## Contributing
Contributions/improvements are welcome!

1. Fork the repo
2. Make a pull request from you local repo