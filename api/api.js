import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

const apiPort = process.env.APIPORT;

const app = express();
const server = new http.Server(app);

app.use(bodyParser.json());

app.use((req, res) => {
  res.end(`URL: ${req.url}`);
});

if (apiPort) {
  app.listen(apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==>     API is running on port %s', apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
