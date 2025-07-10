
import type {CodegenConfig} from '@graphql-codegen/cli';

const configQL: CodegenConfig = {
    schema: [
        {
            [process.env.NHOST_GRAPHQL_URL!]: {
                headers: {
                    'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET!
                }
            }
        }
    ],
    documents: 'src/graphql/*.graphql',
    generates: {
        './src/_generated_/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            // plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']

            config: {
                withHooks: true,
                reactApolloVersion: 3
            }
        }
    }
}


export default configQL;