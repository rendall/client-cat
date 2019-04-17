# Client-cat

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ad74931-4ea6-4086-ad90-3e1aa4d4e3ac/deploy-status)](https://app.netlify.com/sites/focused-hopper-524564/deploys)

Scroll through pictures of cats, and get more information by clicking on the picture. Close the placard by clicking the 'x' on its upper right. Filter breeds by country by clicking the checkboxes on the right. Search the names of breeds by using the search field along the bottom.

Live <https://focused-hopper-524564.netlify.com/>

## Installation

- Clone the repository & cd into its directory
- `npm install`
  - (or `yarn install`, although I have noticed that yarn seems to hang the auto-build sometimes, so this project uses npm)

## Development

All development is done in the `./ts` and `./scss` directories, which each mirror the project directory. Development is easiest with these commands in order:

- `tsc` (moves `.js` files into `./src`)
- `npm run watch` (builds the site when files change)
- `npm run start` (serves the app from localhost with hotloading)

Formatting is via [Prettier](https://prettier.io/)

## Production

Note that it is not necessary to build application locally. It builds automatically upon deploy.

However, building the production version of the application is with the command:

- `npm run build` (compiles, bundles and moves optimized code into `/public`)

`/public` is the directory from which the application is served.

To see this version locally before deployment, this command will serve it locally:

- `npm run serve:production`

## Deployment

The app will publish automatically whenever changes are pushed to the `master` branch. You can set up your own version by:

- Fork the github repository
- Sign into [Netlify](https://netlify.com)
- Create a free site and link it to your forked github repository
- You now have a Cat Breed App!
- If you want to point the API to a new URL, that constant is in `./ts/src/constants.ts`

## TODO

- Combine the `./ts` and `./scss` directories for easier development
- Remove `setState` and add hooks