const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http"); // Required for Socket.IO
const { Server } = require("socket.io"); // Importing Socket.IO
const Stateroute = require("./_Routes/Stateroute")
const Warhistoryroute = require("./_Routes/History/Warhistoryroute")
const originhistoryroute = require("./_Routes/History/Birthhistoryroute")
const Shortsroute = require("./_Routes/Video_features/Shortsroute")
const Placeroute = require("./_Routes/Famous_things/Placeroute")
const Foodroute = require("./_Routes/Famous_things/Foodroute")
const Productroute = require("./_Routes/Famous_things/Productroute")
const Festiveroute = require("./_Routes/Famous_things/Festivalroute")
const userroute = require("./_Routes/Users/Userroute")
const Danceroute = require("./_Routes/Famous_things/Danceroute")
const state_slider = require("./_UserRoutes/State/State_slider")


const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins (configure appropriately for production)
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.use(Stateroute);
app.use(Warhistoryroute);
app.use(originhistoryroute);
app.use(Shortsroute);
app.use(Placeroute)
app.use(Foodroute)
app.use(Festiveroute)
app.use(Productroute)
app.use(Danceroute)
app.use(state_slider)
app.use(userroute)

// CLOUDINARY_CLOUD_NAME= dsjex8xtn
// CLOUDINARY_API_KEY= 662524432854229
// CLOUDINARY_API_SECRET= Yc1S2RjPVrxMDETQrXpGaSKby4E

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://one1010piece1111:LSkd8pbeNd7rY1n9@cluster1.wgfrk.mongodb.net/culture?retryWrites=true&w=majority&appName=Cluster1',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });


// Start the server
const PORT = 1414;
httpServer.listen(PORT, () => {
  console.log(`Backend is in action on port ${PORT}`);
});
