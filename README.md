# Cloud Run Demo calling AutoML Tables for Datacomp 2019

You'll need to set the following environment variables according to your model and region:

* TAGID - i.e. gcr.io/project-name
* PROJECTID
* COMPUTEREGION - i.e. us-central1
* MODELID - i.e. taken from the trained AutoML tables model

## Build

gcloud builds submit --tag $TAGID

## Deploy

gcloud beta run deploy --image $TAGID:latest --project $PROJECTID --platform managed --set-env-vars PROJECTID=$PROJECTID,COMPUTEREGION=$COMPUTEREGION,MODELID=$MODELID

## Test 

curl --header "Content-Type: application/json"   --request POST   --data '{"age":25,"maritalstatus":"single","education":"secondary","job":"professional"}'   https://predict-wnifu4exra-uc.a.run.app/predict