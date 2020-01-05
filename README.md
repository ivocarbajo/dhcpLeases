# dhcpLeases
a quick and dirty way to display spc-dhcp-server ip leases in a web view

## Installation
There are two things you need to run, the **API** will grab your dhcpd.leases file and present it as JSON over HTTP. 
When the API is working, you'll need to run the **SPA**, the Single Page Application will call the API and it will present the data
in a more human readable way.

Here are some simple steps to install dhcpLeases:

**First run the API**:
1. Clone the repository `git clone https://github.com/codingneko/dhcpLeases.git`
2. cd into api and run `npm i` to install the needed dependencies
3. configure your API with the `config.json` file. if it didn't clone, create it and make an object inside it with the following properties:
```JSON
{
  "port": "8080",
  "dhcpLeasesFile": "/var/lib/dhcp/dhcpd.leases"
}
```
3. run `npm start`, this will start the process as a daemon using forever, to stop it, run `npm stop`, to start it in development mode
(no daemon), run `npm run dev`

**Once that's done, you can run the SPA**
1. if you haven't already, install Angular on your system. `npm install -g @angular/cli`
2. cd into /spa
3. run `npm i` to install dependencies
4. run `ng serve` to run a development server

Optional:
To deploy to a server, build the SPA with `ng build --watch` (just make sure the api service is aiming at the right IP address).
once finished, if there were no errors, you'll find a compiled version of the SPA on the dist directory (`/spa/dist`). 
Simply copy these files to your standard Apache server and you should be all set.
