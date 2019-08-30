import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.less';

// 函数组件
function Square(props) {

    return (
        <button
            className={props.isWinnerLine ? "square text-success" : "square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                isWinnerLine={this.props.line && this.props.line.includes(i)}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        let board = [];
        for (let i = 0; i < 9; i++) {

            board.push(
                <div className="board-row" key={i}>
                    {this.renderSquare(i)}
                    {this.renderSquare(++i)}
                    {this.renderSquare(++i)}
                </div>
            );
        }
        return board;
    }
}

function History(props) {

    const moves = props.history.map((step, move) => {

        const desc = move ? `跳转到${move}步 位置：${step.site}` : '重新开始';
        return (
            <li key={move}>
                <button
                    className={move === props.curHistoryStep ? 'text-bold' : ''}
                    onClick={() => props.onJumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    });
    return (
        <ol>
            {moves}
        </ol>
    );
}

class Game extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
            stepNumber: 0,
            curHistoryStep: null
        };
    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let squares = [...current.squares];
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat(
                {
                    squares,
                    site: [Math.floor(i / 3) + 1, i % 3 + 1]
                }
            ),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            curHistoryStep: null
        });
    }

    jumpTo(step) {

        this.setState({
            stepNumber: step,
            xIsNext: 0 === (step % 2),
            curHistoryStep: step
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const playerResult = calculateWinner(current.squares);
        let status = '当前玩家: ' + (this.state.xIsNext ? 'X' : 'O');
        if (playerResult) status = '赢家: ' + playerResult.winner;
        if (!playerResult && 10 === history.length) status = '平局';

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        line={playerResult && playerResult.line}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="game-status">{status}</div>
                    <ol>
                        <History
                            history={history}
                            onJumpTo={step => this.jumpTo(step)}
                            curHistoryStep={this.state.curHistoryStep}
                        />
                    </ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {

        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            return {
                winner: squares[a],
                line
            }
        }
    }
    return null;
}
