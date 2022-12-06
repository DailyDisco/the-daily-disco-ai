import addBackgroundToPNG from '../../../utils/add-background-to-png';

const API_HOST = process.env.REPLICATE_API_HOST || 'https://api.replicate.com';

export default async function handler(req, res) {
  // remove null and undefined values
  const input = Object.entries(req.body).reduce((a, [k, v]) => {
    if (v != null) {
      // eslint-disable-next-line no-param-reassign
      a[k] = v;
    }
    return a;
  }, {});

  // add background to png if needed
  if (input.mask) {
    input.mask = addBackgroundToPNG(input.mask);
  }

  // create request body
  const body = JSON.stringify({
    // Pinned to a specific version of Stable Diffusion
    version: '27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478',
    input,
  });

  // make request to the API
  const response = await fetch(`${API_HOST}/v1/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (response.status !== 201) {
    // handle error
    const error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  // return the prediction
  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}

// There are a few key changes made in the refactored code:

//     The code uses a more readable syntax for the reduce function, by using an if statement instead of a ternary operator.

//     The code uses a separate variable input to store the processed request body, which makes the code easier to read and understand.

//     The code uses more descriptive variable names and includes comments to explain the purpose of each part of the code.
