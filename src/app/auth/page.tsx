'use client'

import React, { useState, useEffect } from "react"
import { useSignInEmailPassword, useSignUpEmailPassword, useUserId } from "@nhost/react"
import { useRouter } from 'next/navigation'

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signInEmailPassword, isLoading: isLoggingIn, error: loginError} = useSignInEmailPassword()
    const {signUpEmailPassword, isLoading: isRegisteringLoading, error: registerError} = useSignUpEmailPassword()

    const router = useRouter()
    const userId = useUserId()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isRegistering){
            const result = await signUpEmailPassword(email, password)

            if (!result.error) {
                router.push('/boards')
            }

            else {
                console.log(result)
            }
        }

        else {
            const result = await signInEmailPassword(email, password)
            if (!result.error || result.error?.error === 'already-signed-in') {
                router.push('/boards')
            }

            else {
                console.log("Error: " + result)
            }
        }
    }

    useEffect(() => {
        if (userId){
            router.push('/boards')
        }
    }, [userId, router])


    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2x1 font-bold mb-4">
                {isRegistering ? 'Sign Up' : 'Sign in'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {(loginError || registerError) && (
                    <p className="text-red-50 text-sm">
                        {loginError?.message || registerError?.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoggingIn || isRegisteringLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {isRegistering ? 'Sign Up' : 'Sign in'}
                </button>
            </form>

            <p className="mt-4 text-sm">
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-600 underline">
                    {isRegistering ? 'Sign in' : 'Register'}
                </button>
            </p>

            
        </div>
    )
}

export default AuthPage;