'use client'

import { useRouter } from "next/navigation"
import { useApolloClient } from "@apollo/client"
import { Button } from "./ui/button"
import signOutUser from "@/lib/signout"

const SignOutButton = () => {
    const router = useRouter()
    const apolloClient = useApolloClient()

    const handleSignOut = async() => {
        try {

            // apolloClient.stop()
            // await apolloClient.clearStore()
            // await nhost.auth.signOut()


            await signOutUser(apolloClient)
            router.push('/auth')


            
        }

        catch (error) {
            console.error('Sign out error: ', error)
        }
    }

    return (
        <div className="flex justify-end">
            <Button
                variant={"outline"}
                onClick={handleSignOut}
                className="text-sm text-red-600 underline"
            >
                Sign Out
            </Button>
        </div>
    )
}

export default SignOutButton;