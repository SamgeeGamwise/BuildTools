const fs = require("fs");
const csv = require("fast-csv");

const csvPath = "./csv/"
const fileTypes = [{
    title: "Situation Judgement",
    abbr: "SJ",
    active: false
  },
  {
    title: "Work History",
    abbr: "WH",
    active: false
  },
  {
    title: "Work Style",
    abbr: "WS",
    active: false
  },
];


export default async function handler(req, res) {
  // Get all saved files
  if (req.method === "GET") {
    try {
      const files = readFileNames()
      res.status(200).json(files)
    } catch (error) {
      res.status(400).json([])
    }

    // Convert CSV to JSON
  } else if (req.method === "POST") {

    // Convert to the questions JSON file
    if (req.body.type === "questions") {
      try {
        const data = await getJSON(req)
        res.status(200).json(data)
      } catch {
        res.status(400).json([])
      }

      // Convert to the Main.json file
    } else if (req.body.type === "main") {
      try {
        const data = await getMain(req)
        res.status(200).json(data)

      } catch {
        res.status(400).json([])
      }
    }
  }
}

// Read all csv files and return matches from fileTypes
function readFileNames() {
  let csvPaths = fs.readdirSync(csvPath)

  if (csvPaths) {
    csvPaths = csvPaths.map(path => path.replace(/\.[^/.]+$/, ""))
    const activeFileTypes = fileTypes.filter(fileType => csvPaths.indexOf(fileType.abbr) !== -1);
    return activeFileTypes
  } else {
    return []
  }
}

// Read CSV file by requested file abbr and return formatted JSON question file
function getJSON(req) {
  return new Promise((resolve, reject) => {
    const questions = [];
    const assessmentAbbr = req.body.file.toUpperCase()
    const path = `${csvPath}${assessmentAbbr}.csv`

    if (fileTypes.find((fileType) => fileType.abbr === assessmentAbbr)) {

      readCSVFile(path, data => {
        // WS Files
        if (req.body.file === "ws") {
          data.forEach(row => {

            questions.push({
              questRes1: row[1].trim(),
              questRes2: row[2].trim(),
              _id: row[0].trim(),
            });
          })

          // WH Files
        } else if (req.body.file === "wh") {
          data.forEach(row => {

            const question = {};

            question.questText = row[1].trim();

            for (let i = 2; i < row.length; i++) {
              if (row[i]) {
                question[`questRes${i - 1}`] = row[i].trim();
              }
            }

            question._id = row[0].trim();
            questions.push(question);
          })

          // SJ Files
        } else if (req.body.file === "sj") {
          data.forEach(row => {
            const question = {};

            question.questLabel = row[2].trim();
            question.questText = row[3].trim();

            for (let i = 4; i < row.length; i++) {
              if (row[i]) {
                question[`questRes${i - 3}`] = row[i].trim();
              }
            }
            question.audio = row[1].trim();
            question._id = row[0].trim();
            questions.push(question);

          })
        } else {
          reject()
        }
        resolve(questions);
      })
    } else {
      reject()
    }
  })
}

// Read CSV file by requested file abbr and return formatted JSON main file
function getMain(req) {
  return new Promise((resolve, reject) => {
    const questions = []
    const assessmentAbbr = req.body.file.toUpperCase()

    if (fileTypes.find((fileType) => fileType.abbr === assessmentAbbr)) {
      const path = `${csvPath}${assessmentAbbr}.csv`

      readCSVFile(path, data => {
        data.forEach(row => {
          const question = {
            _id: row[0].trim(),
          };
          questions.push(question);
        });
        resolve(questions)
      })
    } else {
      reject()
    }
  })
}

// Read CSV file by path
function readCSVFile(path, next) {
  const fileData = []
  fs.createReadStream(path, {
      encoding: 'binary'
    }).pipe(csv.parse({
      headers: false,
    }))
    .on("error", (error) => reject(error))
    .on("data", (row) => fileData.push(row))
    .on("end", () => next(fileData));
}