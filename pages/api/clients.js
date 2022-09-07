import fs from 'fs'
const clientContent = '../ClientContent/Clients'

export default function handler(req, res) {
  const clientData = []
  const clients = fs.readdirSync(clientContent)

  for (let i = 0; i < clients.length; i++) {
    try {
      if (fs.existsSync(`${clientContent}/${clients[i]}/VJT/projectConfig.json`)) {
        const clientDataSecond = JSON.parse(fs.readFileSync(`${clientContent}/${clients[i]}/VJT/projectConfig.json`, 'utf8').toString().trim())

        clientData.push({
          clientId: clients[i],
          ...clientDataSecond
        })
      } else {
        clientData.push({
          clientId: clients[i]
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json(clientData)
}