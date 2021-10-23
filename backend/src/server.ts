import app from "./main/config/app";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT


app.listen(Number(PORT), () => {
  console.log("Listening at: http://localhost:" + PORT)
})