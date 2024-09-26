# Mpv Trigger

A simple webserver intended to open url in mpv. I created this to help me open videos in my local pc when watching anime using [Seanime](https://seanime.rahim.app/). The code here assumes that you already have `mpv` set in your `PATH`.

# Build

To build you will need to:

1. Have nodejs installed
2. Run `npm install` to install the dependencies (or use any other package manager that you prefer)
3. Build the project with `npm run build`

# Development

To run the project in development mode, you can run `npm run dev`. This will start the server and watch for changes in the files.

# Usage

> [!NOTE]  
> You need to have MPV installed and set in your PATH.

Build the project and run the builded file or download the release and run it. To configure the allowed hostname, you will see in the directory of the executable a file called `allowed_hosts.txt`. Edit the file to add the hostname that you want to allow. 

By default, the server runs at port 5200, you can change this by adding a second argument to the executable. For example, to run the server on port 8080, you can run `executable.exe 8080`.

To open the desired url in mpv, you can use the following url:

```http
http://localhost:port/play?url=media_url
```

# Disclaimer

This is just a very basic, simple, and not aimed to be the safest or the most efficient. While the script (executing mpv) can only be triggred from a configured allowed hostname, safety is not guaranteed since no vulnerability tests were made. So please use this at your own risk.