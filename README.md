## Getting Started

#### Clone Repo to match the following folder structure:

- source
  - repos
    - ClientContent
    - VJTBuildTools (Clone here)

#### Install dependencies:

```bash
yarn
```

#### Run the development server:

```bash
yarn dev
```

#### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Convert CSV to JSON data

#### Create CSV files and save in CSV Folder

##### Notes:

- Make sure file names match the type of assessment (EX: WH.csv)
- Do not use headers
- Order the data in the CSV as such:
  - WH
    - Col 1: ID
    - Col 2: Question Text
    - Col 3 and on: Question Responses
  - WS
    - Col 1: ID
    - Col 2: Question Response 1
    - Col 3: Question Response 2
  - SJ
    - Col 1: ID
    - Col 2: Audio Path
    - Col 3: Question Label
    - Col 4: Question Text
    - Col 5 and on: Question Responses

#### Run the development server:

```bash
yarn dev
```

#### Open [http://localhost:3000](http://localhost:3000) with your browser and navigate to each tab that you have a CSV file.
