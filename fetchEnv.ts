
const getEnvs = async() => {
    return {
        NHOST_GRAPHQL_URL: process.env.NHOST_GRAPHQL_URL!, 
        NHOST_ADMIN_SECRET: process.env.NHOST_ADMIN_SECRET!
    }
}

export default getEnvs