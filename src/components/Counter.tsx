'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import PropTypes from 'prop-types'

interface CounterProps {
    initial: number
}

const Counter = ({initial}: CounterProps) => {
    const [currVal, setVal] = useState(initial)

    const increase = () => {
        setVal(currVal + 1)
    }
    
    return (
        <Button>
            <div onClick={increase}>
                <p>{currVal}</p>
            </div>
        </Button>
    )
}

Counter.propTypes = {
    initial: PropTypes.number.isRequired
}

export default Counter;