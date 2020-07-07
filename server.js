const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const app = express();

// Allow cros-origin
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));