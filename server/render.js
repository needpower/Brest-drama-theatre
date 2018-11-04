import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from 'App';
import configureStore from './configureStore';

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res);
  // No store means redirect was already served
  if (!store) {
    return;
  }
  const serializedState = JSON.stringify(store.getState());
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  console.log('REQUESTED PATH:', req.path);
  console.log('CHUNK NAMES', chunkNames);

  return res.send(`
    <!DOCTYPE html>
      <html lang="ru">

        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          ${styles}
          <!--
              manifest.json provides metadata used when your web app is added to the
              homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
            -->
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
          <!--
              Notice the use of %PUBLIC_URL% in the tags above.
              It will be replaced with the URL of the "public" folder during the build.
              Only files inside the "public" folder can be referenced from the HTML.

              Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
              work correctly both with client-side routing and a non-root public URL.
              Learn how to configure a non-root public URL by running "npm run build".
            -->
          <title>Welcome to brest drama theatre</title>
        </head>

        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <script>window.REDUX_STATE = ${serializedState}</script>
          <div id="root">${app}</div>
          <!--
              This HTML file is a template.
              If you open it directly in the browser, you will see an empty page.

              You can add webfonts, meta tags, or analytics to this file.
              The build step will place the bundled scripts into the <body> tag.

              To begin the development, run "npm start" or "yarn start".
              To create a production bundle, use "npm run build" or "yarn build".
            -->
          ${cssHash}
          ${js}
        </body>

      </html>
  `);
};