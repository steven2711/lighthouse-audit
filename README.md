# Lighthouse Audit API

This project provides an API for running Google Lighthouse audits on web pages.

## Description

The Lighthouse Audit API allows clients to submit a URL and receive a Lighthouse report in HTML format. Lighthouse is an open-source tool by Google for improving the quality of web pages by auditing for performance, accessibility, best practices, and SEO. 

## Features

- Runs Lighthouse audits on provided URLs
- Checks if the submitted domain exists before attempting to run audit
- Returns the Lighthouse report as an HTML string in the response 
- Runs audits for the Performance, Accessibility, Best Practices, and SEO categories
- Supports CORS for allowed origins
- Validates the provided URL and returns appropriate error responses

## Installation 

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/lighthouse-audit-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm run dev     # Run in dev mode with nodemon
   node server.js  # Run normally
   ```

## Usage

### Submit an Audit Request

Send a POST request to `/test` with a JSON body containing the URL to audit:

```json
{
    "url": "example.com"
}
```

The API will respond with the HTML of the generated Lighthouse report.

### Check Server Health 

Send a GET request to `/` to verify the server is running. It should respond with:

```json
{
    "msg": "it works"
}
```

## Configuration

The following parameters can be configured in the `server.js` file:

- `PORT` - The port the server runs on (default: 5000)
- `cors` - The allowed origins for CORS 

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## Testing

Currently, no automated tests are set up for this project. This would be a great opportunity for contribution!

## License

[MIT](https://opensource.org/licenses/MIT)

## Acknowledgements

This project makes use of the following open source packages:
- [Express](https://expressjs.com/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Puppeteer](https://pptr.dev/)
- [cors](https://github.com/expressjs/cors#readme)
