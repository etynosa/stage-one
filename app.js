const express = require('express');
const app = express();

// Define a route that handles GET requests to /api
app.get('/api', (req, res) => {
  // Retrieve query parameters
  const slackName = req.query.slack_name || 'unknown';
  const track = req.query.track || 'unknown';

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with a +/-2 minute window
  const now = new Date();
  now.setMinutes(now.getMinutes() - 2);
  const utcTime = now.toISOString();

  // GitHub URL for the file being run and the full source code repository
  const githubFileUrl = 'https://github.com/username/repo/blob/main/file_name.ext';
  const githubRepoUrl = 'https://github.com/username/repo';

  // Prepare the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  // Send the JSON response
  res.json(response);
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
