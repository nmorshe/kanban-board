import nhost from "./nhost";
import { ApolloClient } from "@apollo/client";

const signOutUser = async(client: ApolloClient<any>) => {

    try {

        client.stop()
        await client.clearStore()
        await nhost.auth.signOut()
    }

    catch (error) {
        console.error('Error signing out: ', error)
    }
}

export default signOutUser;