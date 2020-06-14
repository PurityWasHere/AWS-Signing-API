# AWS4 Signing API

<p align="center">
  <img width="143‬" height="83" src="https://i.imgur.com/zfU8jgB.png">
</p>

What is AWS4 Signing API?

AWS4 Signing API is an automated API for Signing AWS4 Requests.

Why use AWS4 Signing API?

AWS4 Signing API works with any program that can send a Get Request with custom headers. It can make your project more versatile and ease work on developers. Easily make you application comatible with the strict AWS4 Signature format!

How to use AWS4 Signing API?

To use AWS4 Signing API you will need to install Node.js.

Step-1) Install and Set Up Node.js

Step-2) Start your API. Open Command line to your project directory and type Node Nodeapi.js, This will start the AWS4 Signing API API / Console

Step-3) Configure your Application to use AWS4 Signing API. Configuration is simple and straight forward.

	To Configure your program to work with AWS Signing API set the URL to GET to as whatever the machine IP is. ex: http://127.0.0.1/
	If you are greeted with the Root screen then the service is working.

	To Send a Request to be signed send the Get to this URL. ex: http://127.0.0.1/AWSSign
	Now Set your headers for this Request.
	
	awshost: <HOST> The Host for the AWS Server
	awspath: <PATH> The Path for the request
	awsregion: <REGION> The Region for the server. Default us-east-1
	awscredential: <CREDENTIALS> The credentials for the request
	awskey:<KEY> The key for the request
	awssecretkey:<SECRET KEY> The secret key for the request
	awssession: <SESSION TOKEN> The session Token for the request. For some reqests can be used in place of a key 
	awshttpmethod:<HTTP METHOD> The HTTP Method for the request. Will default to POST if body is provided
	awsbody:<BODY CONTENT> The Body for the request
	awsheaders:<AWS HEADERS> The Request headers. Must be in JSON Format. EX: {"Content-Type":"application/json"}
	
	Each of those headers needs to be set for what your specific service requires. EX: 

	AwsHost: sqs.us-east-1.amazonaws.com
	AwsPath: /path/aws
	AwsRegion: us-west1
	AwsCredential: AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request

	Further Documentation can be found on Amazon's Documentation pages.

Step-4) Wait for response. In under a second (avg: 3-4ms) from your request the API should calculate , Sign , and return the Headers / Signature for your program. Parse through them and do what you want.
