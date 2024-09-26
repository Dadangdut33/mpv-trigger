const express = require("express");
const { exec } = require("child_process");
const app = express();
// read port from argument or use default
const port = process.argv[2];
const PORT = port ? parseInt(port) : 5200;

// read allowed host list from .txt in the same directory
const fs = require("fs");
const path = require("path");
const dirname = process.cwd();
let allowedHosts = [];
const allowedHostsFile = path.resolve(dirname, "allowed_hosts.txt");
try {
    console.log("Reading allowed hosts at: ", allowedHostsFile);
    // first check if the file exists
    if (!fs.existsSync(allowedHostsFile)) {
        // create the file
        fs.writeFileSync(
            allowedHostsFile,
            "# Write your allowed hosts here, one per line\n# Example:\n# youtube.com\n# 192.168.x.x\n"
        );
    } else {
        allowedHosts = fs
            .readFileSync(allowedHostsFile, "utf8")
            .split("\n");
        // remove any commented line (starting with #)
        allowedHosts = allowedHosts.filter((line) => !line.startsWith("#"));
    }
} catch (error) {
    console.error(`Error reading allowed hosts: ${error}`);
}

// Function to open MPV with the provided URL
function openMpv(mediaUrl) {
    const command = `mpv "${mediaUrl}"`;
    exec(command, (error) => {
        if (error) {
        console.error(`Error opening MPV: ${error}`);
        }
    });
}

app.get("/play", (req, res) => {
  try {
    const mediaUrl = req.query.url;
    if (!mediaUrl) {
      return res.status(500).send(`
            <h1>Error opening MPV</h1>
            <p>Invalid or no media URL provided</p>
        `);
    }

    // Input validation: Check if the URL is valid
    // make sure it is in the list of allowed hosts
    const urlHost = new URL(mediaUrl).hostname;
    if (!allowedHosts.includes(urlHost)) {
      return res.status(403).send(`
            <h1>Error opening MPV</h1>
            <p>Host not allowed (${urlHost})</p>
            <p>Please add the host to the allowed hosts list in the app directory</p>
            <p>After that restart the server</p>
        `);
    }

    // open MPV with the provided URL
    openMpv(mediaUrl);
    res.send(`
        <h1>MPV launched with URL:</h1>
        <h3>${mediaUrl}</h3>
        <p>You may close this tab</p>
      `);
  } catch (error) {
    console.error(`Error opening MPV: ${error}`);
    res.status(500).send(`
        <h1>Error opening MPV</h1>
        <p>${error}</p>
      `);
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Directory: ${dirname}`);
    console.log("Allowed hosts:");
    console.log(allowedHosts);
});
