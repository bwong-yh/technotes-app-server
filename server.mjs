import express from 'express'

const app = express()
const PORT = process.env.PORT || 8003

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))