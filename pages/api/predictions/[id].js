const API_HOST = process.env.REPLICATE_API_HOST || 'https://api.replicate.com';

// log the API host for debugging purposes
console.debug({ API_HOST });

export default async function handler(req, res) {
  // make request to the API
  const response = await fetch(`${API_HOST}/v1/predictions/${req.query.id}`, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    // handle error
    const error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  // return the prediction
  const prediction = await response.json();
  res.end(JSON.stringify(prediction));
}

// There are a few key changes made in the refactored code:

//     The code uses the console.debug() method instead of console.log() to log the API host, since console.debug() is only shown in the output when running in debug mode.

//     The code uses more descriptive variable names and includes comments to explain the purpose of each part of the code.
