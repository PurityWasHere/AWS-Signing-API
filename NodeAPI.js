//Made with <3 From Pure
var http = require("https"),aws4 = require("aws4"),express = require("express"),fs = require("fs"),colors = require("colors"),compression = require('compression');
//All of the required dependancies are listed ^

var title = `Aws4 Signing API | Server Started at 127.0.0.1:8080\n`;
//This Starts the Express Server
var app = express();
app.use(compression());
app.listen(8080, () => {
  process.stdout.write(String.fromCharCode(27) +"]0;" +"AWSSigning API v-0.5 | Status: Active" +String.fromCharCode(7));
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
app.get("/AWSSign", (req, res, next) => {
    try {
      //This Parses all of the headers that are used to control the API
      var awshost = req.headers['awshost'], awspath = req.headers['awspath'],awsreqion = req.headers['awsregion'],awscredential = req.headers['awscredential'],awskey = req.headers['awskey'],awssecretkey = req.headers['awssecretkey'],awssession = req.headers['awssession'],awshttpmethod = req.headers['awshttpmethod'],awsbody = req.headers['awsbody'],awsheaders = req.headers['awsheaders'];
      //This Function is what signs the headers. Its housed inside of this function so it has access to the Req, res function.
      async function GenerateHeaders(host,path,region,credential,accesskey,secretkey,sessiontoken,httpmethod,bodycontent,customheaders) {
        //Creates all Vars used in signing. Parsed from request
        var Host = await host,Path = await path,Region = await region,Credential = await credential,AccessKeyID = await accesskey,SecretKeyID = await secretkey,SessionToken = await sessiontoken,HttpMethod = await httpmethod,BodyData = await bodycontent,CustomHeaders = await customheaders;
        //Returns if the Headers are changed or default
        if(CustomHeaders.length > 0){
          var CustomHeader = "Using Custom Headers";
          try{
            var headers = await JSON.parse(CustomHeaders);
            }
            catch{console.error(colors.red("Error Parsing Headers. Did you supply it in proper Json? "))}
        }
        else{CustomHeader = "Using Default Headers";}
        //Session tokens are very long and would fill entire CMD Box. This simplifies it.
        if (SessionToken.length > 0){
          var SessionCheck = "Session Token Retrieved";
        }
        else{
          SessionCheck = "No Token Sent";
      }

        //Returns if the Body is changed or default
        if(BodyData.length > 0){
        var opts = {host: Host,path: Path,region: Region,credential: Credential, method: HttpMethod,body:BodyData ,headers:headers};
        var usebody = "Using Body Data"
        }
        else{
        opts =  {host: Host,path: Path,region: Region,credential: Credential, method: HttpMethod,headers:headers};
        usebody = "Not Using Body Data"};

        //Logs data retrieved for Debug and evaluation
        console.log(colors.yellow("Recieved Data: "+ HttpMethod+' | '+ Host+' | '+Path+' | '+Region+' | '+Credential+' | '+AccessKeyID+' | '+SecretKeyID+' |'+'\n' +CustomHeader+' | '+usebody+' | '+SessionCheck+'\n'+colors.magenta("Attempting to sign values...")))
        //Value Post Signing

        var Complete = await aws4.sign(opts, {accessKeyId: AccessKeyID,secretAccessKey: SecretKeyID,sessionToken:SessionToken});

        //Logs that the process ran correctly
        console.log(colors.green("Successfully signed request from " + req.ip + " | Current Request Number:(" + TotalRequests + ')'))
        //Sends the client the signed data
        res.status(200);
        res.send(await Complete);
        return;}

      //The function that does the magic. (All arguments follow same pattern. ex: aws<functionality>)
      GenerateHeaders(awshost,awspath,awsreqion,awscredential,awskey,awssecretkey,awssession,awshttpmethod,awsbody,awsheaders);
      TotalRequests = TotalRequests + 1;
    } 
      //Catches any fatal errors and returns Error Code.
      catch (err) { // Some simple error handling
        res.sendStatus(500);
        res.send("Error Signing AWS Request. Error Message:" + err);
        console.log("Error Signing AWS Request.");
        console.log(err);}
});
