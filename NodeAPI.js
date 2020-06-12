//Made with <3 From Pure
var http = require("https"),aws4 = require("aws4"),express = require("express"),fs = require("fs"),colors = require("colors"),compression = require('compression');
var title = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ AWSSigning Api v-0.1|Status: Active ┃
┃                                     ┃
┃   Server Running at 127.0.0.1:8080  ┃
┃                                     ┃
┃        Made with <3 By Pure         ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
//This Starts the Express Server
var app = express();
app.use(compression())
app.listen(8080, () => {
  process.stdout.write(String.fromCharCode(27) +"]0;" +"AWSSigning API v-0.1 | Status: Active" +String.fromCharCode(7));
//Prints the Title
process.stdout.write("\u001b[2J\u001b[0;0H");
console.log(colors.cyan(title));
});
//API Root
app.get("/", (req, res, next) => {
    res.status(200).send("AWSSigning API is currently using this IP/Port.");
});

var TotalRequests = 0;
//AWS Signing with multiple arguments being passed
app.post("/AWSSign", (req, res, next) => {
    try {
      var awshost = req.headers['awshost'];
      var awspath = req.headers['awspath'];
      var awsreqion = req.headers['awsregion'];
      var awscredential = req.headers['awscredential'];
      var awskey = req.headers['awskey']; 
      var awssecretkey = req.headers['awssecretkey'];
      //This Function is what signs the headers. Its housed inside of this function so it has access to the Req, res function.
      async function GenerateHeaders(host,path,region,credential,accesskey,secretkey) {
        Host = await host
        Path = await path
        Region = await region
        Credential = await credential
        AccessKeyID = await accesskey
        SecretKeyID = await secretkey
        console.log(colors.yellow("Recieved Data: " + Host,Path,Region,Credential,AccessKeyID,SecretKeyID +'\n'+colors.magenta("Attempting to sign values...")))
        var opts =  {host: Host,path: Path,region: Region,credential: Credential,};
        var Complete = await aws4.sign(opts, {accessKeyId: AccessKeyID,secretAccessKey: SecretKeyID,});
        res.send(Complete)
        return;}
      GenerateHeaders(awshost,awspath,awsreqion,awscredential,awskey,awssecretkey);
      TotalRequests = TotalRequests + 1;
      console.log(colors.green("Successfully signed request from " + req.ip + " | Current Request Number:(" + TotalRequests + ')'))
    } catch (err) {
        res.statusCode = 400
        res.send("Error Signing AWS Request. Error Message:" + err);
        console.log("Error Signing AWS Request.");
        console.log(err)
    }
});