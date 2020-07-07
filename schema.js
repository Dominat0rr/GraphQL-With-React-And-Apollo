const axios = require("axios");

const SpacexEndPointURL = "https://api.spacexdata.com/v3/launches";

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList
} = require("graphql");

// Types
const LaunchType = new GraphQLObjectType({
    name: "Launch",
    description: "Launch Object",
    fields: () => ({
        flight_number: { type: GraphQLNonNull(GraphQLInt) },
        mision_name: { type: GraphQLNonNull(GraphQLString) },
        launch_year: { type: GraphQLNonNull(GraphQLString) },
        launch_date_local: { type: GraphQLNonNull(GraphQLString) },
        launch_success: { type: GraphQLNonNull(GraphQLBoolean) },
        rocket: { type: RocketType }
    })
});

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    description: "Rocket Object",
    fields: () => ({
        rocket_id: { type: GraphQLNonNull(GraphQLString) },
        rocket_name: { type: GraphQLNonNull(GraphQLString) },
        rocket_type: { type: GraphQLNonNull(GraphQLString) }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "RootQueryType Object",
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: (parent, args) => {
                return axios
                    .get(SpacexEndPointURL)
                    .then(res => res.data);
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});