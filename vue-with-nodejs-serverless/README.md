# Bold BI Embedded Sample in Vue.js with Node.js deployed in the AWS lambda environment

This sample demonstrates how to deploy the Bold BI Vue.js with node.js application in the AWS lambda environment and to embed the dashboard. In this sample, Vue.js acts as the front-end and Node.js acts as the back-end application, with AWS Lambda serving as the server-side language.

## Requirements/Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/)
* An account in [AWS Lambda](https://aws.amazon.com/lambda/)

### Supported browsers
  
* Google Chrome, Microsoft Edge, Mozilla Firefox.

## Configuration

* Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code?utm_source=github&utm_medium=backlinks) to enable it.

    ![Embed Settings](/images/embed-settings.png)

* To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file?utm_source=github&utm_medium=backlinks) for reference. Additionally, you can refer to the following image for visual guidance.

     ![Embed Settings Download](/images/embed-settings-download.png)
     ![EmbedConfig Properties](/images/embedconfig-properties.png)

* Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/vue-with-nodejs-sample/tree/master/Nodejs) within the application. Please ensure you have placed it in the application, as shown in the following image.

    ![EmbedConfig image](/images/embedconfig.png)

## Steps to deploy the nodejs application in AWS Lambda environment

* Open the "server.yml" file and provide the "service" name to be deployed in AWS Lambda and the "region" as highlighted below.

 ![Serverless.yml](/images/serverlesss.png)

* Now, open the terminal and execute the command "npm install -g serverless" to install the Serverless framework.

* Configure your AWS credentials using the command "serverless config credentials --provider aws --key <PUBLIC_KEY> --secret <SECRET_KEY>", replacing <PUBLIC_KEY> and <SECRET_KEY> with your Access and Secret keys respectively. You can learn how to obtain these keys by creating an IAM user [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

* Execute the command "npm install" to install the necessary NPM packages.

* Proceed by running the command "npm init -y" to initialize and manage the npm processes.

 ![Terminal image](/images/serverless-init.png)

* Now, execute the command "npm install --save express serverless-http" to install the necessary serverless packages.

 ![Terminal image](/images/serverless-save.png)

* Run the command "serverless deploy" to deploy the application. You can now browse the endpoints.

 ![Terminal image](/images/serverless-deploy.png)

## Steps to run the Vue.js application

* Copy the backend application URL (for example: "<https://l9kuk9k0k.execute-api.eu-east-1.amazonaws.com/dev>") and paste it as the value for "ApiHost" in the App.vue file.

 ![App.Vue](/images/serverless-app.png)

* Now, execute the command "npm install" to install the npm packages. After installation, run the command "npm run serve" to start the application.

 ![Dashboard](/images/serverless-dashboard.png)

## Enabling CORS in AWS lambda

* Follow [documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors-console.html) to enable CORS in AWS lambda.

> **NOTE:** Lambda functions can access AWS resources and external resources over the internet, but not resources running on your local machine. We recommend utilizing the Bold BI hosted site for embedding through AWS Lambda.
