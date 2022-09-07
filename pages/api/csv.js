const fs = require("fs");
const formidable = require('formidable');
const csvPath = "./csv/"

export default async function handler(req, res) {
  try {

    if (req.method === "POST") {
      const form = new formidable.IncomingForm({
        maxFileSize: Infinity
      });

      form.parse(req, (err, fields, files) => {
        const oldpath = files.file.filepath;
        const newpath = csvPath + files.file.originalFilename;


        fs.rename(oldpath, newpath, (err) => {
          if (err) throw err;
          res.status(200)
        });
      })
    } else if (req.method === "DELETE") {
      fs.readdirSync(csvPath).forEach(f => fs.rmSync(`${csvPath}/${f}`));
      res.status(200)

    }
  } catch (error) {
    res.status(400)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};