Venyoo app for Neurlabs

High-level architecture is Flux: https://facebook.github.io/flux/
View engine is ReactJS: https://facebook.github.io/react/

WebPack is used for dependency management and build.

Steps to create new component:
1. Create new React component in /components folder
2. Write render function for the React component that renders the way you want it to see
3. Create new store in /stores folder
4. Write logic for the store and use mock data inside store without API requests
5. Integrate ReactJS and store together through VenyooApp
6. Create function for WebUtils that retrieves data
7. Create action handlers in the store that updates its state accordingly