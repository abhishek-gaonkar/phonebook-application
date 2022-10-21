# Phonebook Application

A NodeJS Phonebook Application deployed on AWS with serverless for backend and ReactJS for frontend.

## Needed knowledge

- NodeJS > 14.x.x
- ReactJS
- AWS - Serverless
- MUI4

### Folder Structure

\*master <br />
|- account-service --> Account related APIs <br />
|- frontend --> React based frontend <br />
|- phonebook-service --> Phonebook related APIs <br />

### Information on the Project

- Deploys on AWS Account specified in ~/.aws folder's **credentials** file.
- Every API hosts on a different lambda function.
- The Services deploy on VPCs inside the AWS account. Hence make sure to edit with respective Security Group codes and Sub-Nets for availabilty.
- CORS configuration has been done for interacting with frontend but it can definitely be finetuned to a custom origin if necessary.
- To modify Account and Auth related lambda work on account-service folder.
- To modify Application related lambda work on phonebook-service folder.

### I don't need VPC-level deployment

Once go through the codebase and remove vpc-related items.

### How to start

1. Make sure your AWS credentials are set as serverless framework uses the ~/.aws/credentials file to deploy.
2. Visit [serverless](https://www.serverless.com/framework/docs/getting-started) if you are new to it. Setup serverless and aws as stated in your system.
3. Do `serverless deploy` inside both account-service and phonebook-service folders.
4. For in depth info on [account-service](./account-service/README.md) and [phonebook-service](./phonebook-service/README.md).
5. Modify Code if needed.
