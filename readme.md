# Games

## Development

1. Setup an OAuth app in Google.
   1. Add `http://localhost:9010` to the Authorized JavaScript Origins
2. Add `.env.local` under the `ui` directory with the following.
    ```dotenv
    REACT_APP_GOOGLE_OAUTH_CLIENT_ID=xxx
    REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=xxx
    ```
3. Run Mongo
    ```shell
    make mongo
    ```
4. Setup indexes on the Mongo database
   ``````
5. Setup environment variables for the server
   ```dotenv
    GOOGLE_OAUTH_CLIENT_ID=xxx
    GOOGLE_OAUTH_CLIENT_SECRET=xxx
    ```
6. Run the server
    ```shell
    go run server/cmd/main.go
    ```
7. Run the UI
    ```shell
    cd ui
    npm start
    ```
