import * as React from 'react'
import Square from "./Square";

interface IBoardProps {
    squares: string[]
    onClick: (index: number) => void
}

export default class Board extends React.Component<IBoardProps> {

    private renderSquare(index: number): JSX.Element {

        const thisClick = () => {
            this.props.onClick(index)
        }

        const squares = this.props.squares;
        return <Square value={squares[index]} onClick={thisClick} />;
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}
