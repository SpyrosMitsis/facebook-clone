
# MyBook (facebook-clone)

A simple, Facebook Clone made using Typescript ,React, scss for the frontend and .NET C# for the backend.

ViteJs is used as the build tool.




## Tech Stack
**Client:** React, Typescript, SCSS

**Server:** .NET, MS SQL SERVER


 <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" width="48"> [![My Skills](https://skills.thijs.gg/icons?i=ts,scss,vite,react,dotnet,cs)](https://skills.thijs.gg)




## Installation and Running Locally


### Step 1: Clone the Repository

Download the project from the GitHub repository using the following command:

```bash
git clone https://github.com/SpyrosMitsis/facebook-clone.git
```

### Step 2: Install node depenencies
```bash
cd facebook-clone
npm install 
```
### Step 3: Install .NET Core 6.0
Make sure you have .NET Core 6.0 installed on your machine. You can download it from the official .NET website. [here](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)


## Running the Backend

To run the backend of the Facebook Clone project, follow these steps:

### Step 0 Import Sql Script Inside The Database
before connecting the backend application to the sql server one must
first import the `facebook-clone.sql` file inside the sql server.

### Step 1. Update Connection String

Open the `appsettings.json` file in the backend project directory. Look for the `ConnectionStrings` section and create a new connection string for your SQL database. Replace the placeholder values with your actual database information.

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=YourDatabaseName;User=YourUsername;Password=YourPassword;"
}
```

### Step 2. Install .NET Dependencies
Navigate to the backend project directory and install the .NET dependencies using the following command:

```bash
cd backend
dotnet restore
```

### Step 3. Run the Application
Run the following command to start the backend server:

```bash
dotnet run
```

## Running the Frontend (Vite)

To run the frontend of the Facebook Clone project using Vite, follow these steps:


### Step 1. Run the Application
Run the following command to start the Vite development server:

```bash
npm run dev
```


## Demo

![](https://imgur.com/a/LTafqBj)

