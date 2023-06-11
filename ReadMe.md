# HomeWorks

The project requires Node.js, Docker, and MySQL on the local machine. For the mobile device, installation of Expo Go App is needed. Expo Go is available on Google Play and App Store. 

## Setting Up Files

Ensure that the following confidential files are included:
1. the `docker-compose.yml` file into the root directory
2. the `spheric-method.json` file of your google service account into `./Server/services` folder. 

Note that the `KEYFILEPATH` in `./Server/services/drive-service.js` must be set to the `spheric-method.json` file included in number 2.

## Installing Dependencies

Run `npm install` on `./Server`, `./ClientProvider`, and `./ClientSeeker`. Make sure that node modules are added on each folder after running the command.

## Run using Docker
In the `docker-compose.yml` file, make sure that the `REACT_NATIVE_PACKAGER_HOSTNAME` is set to the local IP Address of your machine. 

In the root directory, run the `docker-compose up` command.

## Open the App on Mobile Device

To open the HomeWorks App for Seekers on Expo Go, enter the URL `exp://ADDRESS:PORT` where `ADDRESS` is the local IP Address of your machine and `PORT` is set to 19000.

To open the HomeWorks App for Seekers on Expo Go, enter the URL `exp://ADDRESS:PORT` where `ADDRESS` is the local IP Address of your machine and `PORT` is set to 20000.
