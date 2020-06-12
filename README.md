# AWS Signing API

<p align="center">
  <img width="143‬" height="83" src="https://i.imgur.com/zfU8jgB.png">
</p>

What is AWS Signing API?

AWS Signing API is an automated API for Signing AWS Requests.

Why use AWS Signing API?

AWS Signing API works with any program that can send a Get Request with custom headers. It can make your project more versatile and ease work on developers

How to use AWS Signing API?

To use AWS Signing API you will need to install Node.js.

Step-1) Install and Set Up Node.js

Step-2) Start your API. Open Command line to your project directory and type Node Nodeapi.js, This will start the AWS Signing API API / Console

Step-3) Configure your Application to use AWS Signing API. Configuration is simple and straight forward.

	To Configure your program to work with AWS Signing API set the URL to GET to as whatever the machine IP is. ex: http://127.0.0.1/
	If you are greeted with the Root screen then the service is working.

	To Send a Request to be signed send the Get to this URL. ex: http://127.0.0.1/AWSSignature
	Now Set your headers for this Request.
	
	AwsHost: <HOST>
	AwsPath: <PATH>
	AwsRegion: <REGION>
	AwsCredential: <CREDENTIALS>

	Each of those headers needs to be set for what your specific service requires. EX: 

	AwsHost: sqs.us-east-1.amazonaws.com
	AwsPath: /path/aws
	AwsRegion: us-west1
	AwsCredential: AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request

	Further Documentation can be found on Amazons Documentation pages.

Step-4) Wait for response. In under a seconds from your request the API should calculate , Sign , and return the Headers / Signature for your program. Parse through them and do what you want.
