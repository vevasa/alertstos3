# Pull Alerts from Threat Stack API into a S3 bucket on sceduled basis

## Architecture

Cloudwatch event schedule -> trigger lambda job -> pull alerts using Threat Stack API -> s3 bucket

## Steps

### Step 1 - Customize lambda code


Copy the config over and fill in the values.
```
cp config.json.example config.json
```

Open the *config.json* with your favorite editor and go over to the Threat Stack dashboard and retreive your API Key from the `Application Keys` page in the settings. Fill in your organization and finally fill in your s3 bucket you'll be using.  You do not need organization name, if you belong to one organiation.

Zip it up and deploy the code as you would for any other lambda function using the command below as a reference:

```
aws lambda create-function --function-name alerts-s3 --runtime nodejs4.3 --role "some_role" --handler webhook.work --zip-file fileb://./alerts-s3.zip
```

After that point your API gateway at the lambda function and you should be all set. 

###S3 Layout

This function simply takes the current date and puts it into the following format: `YYYY-MM-DD` and appends this to your s3 bucket in `config.json`. Then the alerts themselves are stored in s3 with the following format `<alert_id>.json`.

# Step 2 - Configure cloud watch event to run the lamda job

## Create a cloudwatch event scheduler

![schedule events] (https://www.evernote.com/l/ACM9aXI7xqROV7zA8d87z7j8QgxrF6101AwB/image.png)

## Select the target as the lambda function you just created

![select lambda job] (https://www.evernote.com/l/ACPm178779xEbZj1ABX8UaO6WUtuGqab13oB/image.png)


