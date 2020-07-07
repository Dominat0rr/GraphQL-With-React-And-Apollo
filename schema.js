const axios = require("axios");

const SpacexEndPointURL = "https://api.spacexdata.com/v3/";
const SpacexEndPointLaunchesURL = SpacexEndPointURL + "launches";
const SpacexEndPointRocketsURL = SpacexEndPointURL + "rockets";

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
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    description: "Rocket Object",
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "RootQueryType Object",
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: () => {
                return axios
                    .get(SpacexEndPointLaunchesURL)
                    .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: { 
                flight_number: { type: GraphQLInt}
            },
            resolve: (parent, args) => {
                return axios
                    .get(SpacexEndPointLaunchesURL + `/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve: () => {
                return axios
                    .get(SpacexEndPointRocketsURL)
                    .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: { 
                rocket_id: { type: GraphQLInt}
            },
            resolve: (parent, args) => {
                return axios
                    .get(SpacexEndPointRocketsURL + `/${args.rocket_id}`)
                    .then(res => res.data);
            }
        },
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});