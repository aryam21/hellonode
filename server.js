const express = require('express')
const path = require('path')
const app = express()

var ip = require("ip");
var cors = require("cors");

// Import the dd-trace package
const tracer = require('dd-trace').init();

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors());
app.get('/message', (req, res) => {
  // Start a new trace
  const span = tracer.startSpan('/message');
  // Your logic here
  span.finish();
  return res.send(process.env.PAGE_TITLE)
})
app.get('/color', (req, res) => {
  // Start a new trace
  const span = tracer.startSpan('/color');
  // Your logic here
  if (process.env.PAGE_COLOR==="Blue" || process.env.PAGE_COLOR==="blue")
    return res.send("#053354")
  if (process.env.PAGE_COLOR==="Green" || process.env.PAGE_COLOR==="green")
    return res.send("#002e0e")
  if (process.env.PAGE_COLOR==="Red" || process.env.PAGE_COLOR==="red")
    return res.send("#360300")
  if (process.env.PAGE_COLOR==="Black" || process.env.PAGE_COLOR==="black")
    return res.send("#262626")
  return res.send("#262626")
  span.finish();
})
app.get('/version', (req, res) => {
  // Start a new trace
  const span = tracer.startSpan('/version');
  // Your logic here
  return res.send(process.version)
  span.finish();
})
app.get('/ipaddress', (req, res) => {
  // Start a new trace
  const span = tracer.startSpan('/ipaddress');
  // Your logic here
  return res.send(ip.address())
  span.finish();
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(8080)
