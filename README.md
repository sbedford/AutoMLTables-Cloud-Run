# Cloud Run Demo calling AutoML Tables for Datacomp 2019

## Build

gcloud builds submit --tag gcr.io/sbedford-datacomp2019/predict

## Deploy

gcloud beta run deploy --image gcr.io/sbedford-datacomp2019/predict:latest --project sbedford-datacomp2019 --platform managed --set-env-vars PROJECTID=sbedford-datacomp2019,COMPUTEREGION=us-central1,MODELID=TBL6785121439377784832

## Test 

curl --header "Content-Type: application/json"   --request POST   --data '{"age":25,"maritalstatus":"single","education":"secondary","job":"professional"}'   https://predict-wnifu4exra-uc.a.run.app/predict