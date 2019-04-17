#/bin/bash

cd $(dirname $0)

mkdir lib/{apis,clients,lib,vendor}
mkdir -p lib/vendor/endpoint-cache/utils
mkdir -p lib/lib/services


set -e
mkdir temp-app || rm -rf temp-app && mkdir temp-app
cd temp-app

# creates package.json file
npm init -y

# installs full sdk
npm i aws-sdk

# Starts copying files
cp -va node_modules/aws-sdk/apis/s3* ../lib/apis/
cp -va node_modules/aws-sdk/clients/{s3.js,sts.js,cognitoidentity.js} ../lib/clients/
cp -va node_modules/aws-sdk/vendor/endpoint-cache/* ../lib/vendor/endpoint-cache/

# Copying libs
cp -va node_modules/aws-sdk/lib/{event-stream,protocol,json,query,model,xml,credentials,http,signers,realclock,publisher,shared-ini,s3} ../lib/lib/

cp -va node_modules/aws-sdk/lib/{util,node_loader,api_loader,core,sequential_executor,service,region_config,config,credentials}.js ../lib/lib/
cp -va node_modules/aws-sdk/lib/{http,event_listeners,discover_endpoint,request,state_machine,response,resource_waiter,param_validator}.js ../lib/lib/
cp -va node_modules/aws-sdk/lib/metadata_service.js ../lib/lib/

cp -va node_modules/aws-sdk/lib/region_config_data.json ../lib/lib/
cp -va node_modules/aws-sdk/lib/services/{cognitoidentity,s3,sts}.js ../lib/lib/services/

cd ../

rm -rf temp-app