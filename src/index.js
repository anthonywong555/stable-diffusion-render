'use strict';

/**
 * Imports
 */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import stability from 'stability-client';

/**
 * Clients
 */
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

const { generateAsync } = stability;

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.send("Hello World");
});

app.post('/test', (req, res) => {
  const {body} = req;
  console.log(`/test received the following payload: `, body);
  res.send(body);
});

app.post('/generate', async (req, res) => {
  try {
    console.log(`prompt: ${req.body.prompt}`);
    const results = await generateAsync({
        ...req.body,
        apiKey: process.env.DREAMSTUDIO_API_KEY,
        outDir: 'public'
    });

    const {images} = results;
    const status = results.res;

    // Generate Public Facing URLs.
    const shareableResults = images.map((anImage) => {
      const filePath = anImage.filePath.replace('/home/node/app/', '');
      const fullURL = `${process.env.PRODUCTION_BASE_URL}/${filePath}`;
      return {...anImage, filePath: fullURL}
    })

    res.status(201).send(shareableResults);; // I think this is the appropriate status code. Why not.
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/public', express.static('public'));
app.listen(PORT, () => console.log(`Listening on ${PORT}.\nNode Environment is on ${process.env.NODE_ENV} mode.`));