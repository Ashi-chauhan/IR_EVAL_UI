# IR_EVAL_UI

1. To Run the application amazon account and Amazon s3 bucket needs to be created. Steps are given in - https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html link.
Save the access key and secrete key

--------------------------
.env file update the configuration
//.env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_S3_BUCKET=bucket name
REACT_APP_REGION=eu-west-1
REACT_APP_ACCESS_KEY=access key 
REACT_APP_SECRET_ACCESS_KEY=secrete key

-----------------------------------
Libraries used 

• MaterialUI is open source react component library. It ships faster and are highly 
customizable. Table, Navigation Bar, Buttons, CustomLoader are the components used in the 
application and import from MaterialUI. 
• Highchart library is used to display data in graphs. Displaying data in graphs is one 
of the main features of the application. Highchart made is very easy just by few lines of code 
to create 2 graphs. 
• React-S3 is a library, used to upload a file from client (Frontend) to Amazon S3 
bucket.
• UUID is a library to generate a universally unique identifier.

-------------------------------------

To run the code
1. Pull the code from git or download the zip.
2. Open VScode and open the project
3. On terminal run command - " npm install". Wait for all the dependencies to be installed
4. Download qrel and run file from - https://github.com/CLEFeHealth/CLEFeHealth2016Task3 respository
5. Run the backend application - code available on https://github.com/Ashi-chauhan/IR-EvaluationSystem.git
6. Run command - "npm start"
7. On browser load url - "http://localhost:3000/ir". It will take you to the home screen
8. DO the evaluation
--------------------------------
Every page has its own package inside the view folder.
• FileUpload folder contains index.js file having code for the file upload page. 
• The ResultPage folder has code for the evaluation result page which shows data in 
tables. Index.js has all table-related implementations like API calls and pagination in the table. 
• Filter-dropdown.js imports <ReactSelect> component and implements a multi-select 
dropdown to filter data from table. data.js file has a list of measures on which table data can be 
filtered.
• Reusable components are stored in the ‘component’ package. Navbar and
CustomLoader are two components that are used multiple times. CustomLoader is used when 
the user is uploading qrel and result files. The navBar has two links – Homepage and FileUpload 
screen.
All the components are developed in a different package and used with the help of import. It 
makes the component reusable. Routing is handled through <Routes> tag and implemented in 
routes.js. It is used to route from one page or component to another.
 
