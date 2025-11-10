const express = require("express");
const app = express();
const PORT = 5000;
const orderRoute=require("./routes/order")

app.use(express.json());
app.use("/api/v1/order",orderRoute);


app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
