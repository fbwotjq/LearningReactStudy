import * as React from 'react'

interface SquareProps {
    value: any
    onClick: () => void
}

export default function Square (props: SquareProps) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}