# Venyoo app for Neurlabs

Technology stack
----------------
High-level architecture is [Flux](https://facebook.github.io/flux/).
View engine is [ReactJS](https://facebook.github.io/react/).
[WebPack](http://webpack.github.io/) is used for dependency management and build.

Install
-------
First you have to install dependencies:
 - nodejs: https://nodejs.org/
 - npm: https://www.npmjs.com/

The next step is to install webpack package globally:
```bash
sudo npm install -g webpack
```
Clone GitHub repo:
```bash
git clone git@github.com:taydakov/neurlabs-venyoo-frontend
```
Go into the cloned directory and now you can install all the dependencies for the project
```bash
cd neurlabs-venyoo-frontend
npm install
```
The next step is a bit silly but required for proper function of the app:
```bash
mkdir ./build
cp -r ./src/javascripts/libs ./build/libs
cp ./src/tweet_content.html ./build/tweet_content.html
```
So the last step is to run compilation (in watch mode for development):
```bash
webpack --watch
```
The compiled code is at ./build directory

How To Create New Component
----------------
Steps to create new component:

1. Create new React component in /components folder
2. Write render function for the React component that renders the way you want it to see
3. Create new store in /stores folder
4. Write logic for the store and use mock data inside store without API requests
5. Integrate ReactJS and store together through VenyooApp
6. Create function for WebUtils that retrieves data
7. Create action handlers in the store that updates its state accordingly