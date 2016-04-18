# Map-My-Moments

> Map-My-Moments is a social media app that allows users to take and view photos from other users based on their current location. When a user takes a photo, a location is attached to that photo and enables other users who check-in to that location later on to access and like the photos. 

## Team

  - __Product Owner__: Tegan Duong
  - __Scrum Master__: Bucko Perley
  - __Development Team Members__: Vince Boucherie, Jonathan Mah

## Table of Contents

1. [Installation](#installation)
    1. [Meteor](#meteor)
    1. [Mobile Integration](#mobile-integration)
1. [Requirements](#requirements)
1. [Setup](#setup)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Configure Keys](#configure-keys)
1. [Usage](#Usage)
1. [Helpful Links](#helpful-links)
1. [Contributing](#contributing)

## Installation

### Meteor

Meteor supports OS X, Windows, and Linux, and is simple to install. The command line installer supports Mac OS X 10.7 (Lion) and above, and Linux on x86 and x86_64 architectures. The Windows installer supports Windows 7, Windows 8.1, Windows 10, Windows Server 2008, and Windows Server 2012.

On OS X or Linux?

Install the latest official Meteor release from your terminal:

```sh
curl https://install.meteor.com/ | sh
```

On Windows? [Go here for further instructions](https://www.meteor.com/install)

### Mobile Integration

In addition to running in the browser, our app also runs on the mobile iOS and Android platforms. To setup mobile integration, [go here.](http://guide.meteor.com/mobile.html#installing-prerequisites)


## Requirements

- Meteor 1.3
- Node 4.4.2
- React ^15.0.0


## Setup

### Installing Dependencies

Clone this repo to your local work station and from within the root directory:

```sh
meteor npm install
```

### Configure Keys

#### Google API Key
- Setup a [Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key#key) 
- Create a new file to store this key in: `imports/api/google-keys.js`
- Copy and paste this into your google-keys.js file:
```sh
export const GOOGLEAPI = 'YOUR-GOOGLE-API-KEY-HERE';
```

#### Amazon AWS S3 Access Key
- Setup a [AWS Access Key for S3](https://console.aws.amazon.com/iam/home#security_credential) 
- Create a new file to store this key in: `config.json`
- Copy and paste this into your config.json file:
```sh
{
  "AWSRegion": "us-west-1",
  "AWSAccessKeyId": "ACCESS_KEY_ID_HERE",
  "AWSSecretAccessKey": "ACCESS_SECRET_HERE"
}
```
- Modify the S3 bucket [mapmymoments] CORS configuration to:
```sh
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```


## Usage

Once the dependencies are installed and configuration keys are setup, you can start the application with:
```sh
meteor run --settings=config.json
```
Open your web browser and go to `http://localhost:3000` to see the app running.

### Configure Google Login

Now that the app is open on the browser, you should see a "Configure Google Login" button after clicking on the "Sign in" dropdown. Clicking on the "Configure Google Login" button will display a set of instructions that you should follow. After retrieving your Client ID and Client secret, copy and paste them in `server/settings.js`:

```sh
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "CLIENT_ID_HERE",
      loginStyle: "popup",
      secret: "CLIENT_SECRET_HERE"
    }
  }
);
```


## Helpful Links

- Integrate Meteor and React: [Create Todo App with React](https://www.meteor.com/tutorials/react/creating-an-app)
- [Meteor Docs: API reference](http://docs.meteor.com/#/full/meteorguide)
- [Meteor Guide: Tips and Best Practices](http://guide.meteor.com/)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
