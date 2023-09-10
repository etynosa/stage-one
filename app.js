const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  // Retrieve query parameters
  const slackName = req.query.slack_name || 'unknown';
  const track = req.query.track || 'unknown';

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with a +/-2 minute window
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  const utcTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  const githubFileUrl = 'https://github.com/etynosa/stage-one';
  const githubRepoUrl = 'https://github.com/etynosa/stage-one/blob/main/app.js';


  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };


  res.json(response);
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
