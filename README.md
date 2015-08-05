# sendsh.it
The [sendsh.it](https://sendsh.it/) client-side javascript will read and encrypt a file in your browser using the [Triplesec](http://keybase.github.io/triplesec/) library with a random key generated by its PRNG.

The encrypted file is then uploaded to the backend node.js application which stores it in mongo's [GridFS](http://docs.mongodb.org/manual/core/gridfs/) and returns a unique ID. This is combined with your generated key to produce a unique url you can share with someone else. Once they visit the url the site will download the file and decrypt it in their browser.

Files are deleted after being downloaded or once they are over 24 hours old.

## Install
 * `git clone git@github.com:threesquared/sendsh.it.git`
 * `npm install`
 * `gulp`
 * `node server.js`

## Configure
Set your mongodb and express parameters in the top of server.js.

The server is also configured to read the env parameters from an [Openshift](https://www.openshift.com/) environment. There is also an openshift deploy hook to run gulp.

## Disclaimer
I am not an expert in cryptography. If you have something important to keep secret please think about using a peer reviewed and audited service. This is just an experiment with in browser encryption and node.js.