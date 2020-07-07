const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const path = require("path");
const app = express();

// Allow cros-origin
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static("public"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));