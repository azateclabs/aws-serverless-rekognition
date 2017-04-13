<h1>Serverless Facial Recognition based on AWS Rekognition</h1>

This project has in its scope the willing to test Rekognition, an AWS service for facial recognition. 
Help developers understand how easy could be implementing a facial recognition leveraging on AWS Rekognition.

<h2>Let's start from foundations</h2>

First things first, you need to have all the necessary permissions to perform operations on your AWS environment.
This project is base on Lambda, since it's a Serverless solution, so you should start creating an IAM Role and User to properly configure Lambda and access to Lambda functions.

Let's create the Role for Lambda and the policy you should create to use Rekognition:

<code>
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "rekognition:*"
            ],
            "Resource": "*"
        }
    ]
}
</code>

<h3>ATTENTION: that's not the policy you should use in a Production environment, in which you should embrace Least Privilege model to restrict access to unused functions</h3>

Create a Lambda function with the Source Code you'll find on lambda folder of this repository, create an S3 bucket with the code you find on the root folder of the repo.
Here's then the IAM Policy you have to attach to the IAM User you create to allow your application invoke Lambda function:

<code>
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:lambda:<AWSRegion>:<yourAccountId>:function:<functionName>"
        }
    ]
}
</code>

<h3>Change all the variables into this Policy and then configure your Access Key and Secret Access Key into app.js to implement the user you create above</h3>

<h2>Be aware that this project is for test only, publish on internet Javascript Source Code with confidential information into it it's not recommendable. If you want to use it into your Production environment consider using AWS API Gateway to create an API to call the Lambda function without having to pass any credential</h2>