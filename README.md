# mini-express
Mini Express WebServer running HTTP & HTTPS

## Pre-requisites:
- Ensure that `git`, `npm` and `node` are all installed
- If you are using on a remote Server then ensure that the Firewall is open for ports 80, 8080, 443 & 8443. To allow express to access these ports you will also need to add the following rules to the server iptables:
  - `sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080`
  - `sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443`
  - If you need to make these rules permanent after reboot then add/edit the /etc/rc.local file as per the `example - rc.local file` provided here
  - Check all is OK by running `sudo iptables -t nat -L`
- If you are using HTTPS then you need file access to the Server's SSL Certificate and Private Key. If required, these can be set-up using [certbot](https://certbot.eff.org/).

## Usage:
- From a terminal prompt, clone this repository using `git clone https://github.com/MKen212/mini-express.git`
- Enter `cd mini-express` to change to the repository directory
- Run `npm install` to load the required node modules
- Run `nano server.js` to edit the server file and modify the certPath = '' directory with the path to your HTTPS certificate & key files. If you only require an HTTP server you can comment out the HTTPS sections and the re-direct as required. Save & Exit
- Run `npm start` to start the Express Server. You should now be able to connect to your webserver via both HTTP and HTTPS. You can test using `curl http://<your_server_url>/.well-known/acme-challenge/9001` and should get a "This is a test" response if all OK
- If you want to keep this server running, install and use something like [pm2](https://pm2.keymetrics.io/)
