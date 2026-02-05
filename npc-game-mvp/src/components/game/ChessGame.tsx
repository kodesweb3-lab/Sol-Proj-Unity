import { useState, useEffect, useCallback } from 'react'

// Chess piece unicode characters
const PIECES = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
}

// Initial board state
const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
]

interface GameState {
  board: (string | null)[][]
  selected: { row: number; col: number } | null
  turn: 'white' | 'black'
  validMoves: { row: number; col: number }[]
  history: string[]
  gameOver: boolean
  winner: 'white' | 'black' | null
  difficulty: 'novice' | 'intermediate' | 'expert'
}

export default function ChessGame() {
  const [gameState, setGameState] = useState<GameState>({
    board: INITIAL_BOARD,
    selected: null,
    turn: 'white',
    validMoves: [],
    history: [],
    gameOver: false,
    winner: null,
    difficulty: 'novice'
  })
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white')
  const [gameStarted, setGameStarted] = useState(false)

  // Simple valid moves calculator
  const getValidMoves = useCallback((board: string[][][], row: number, col: number): { row: number; col: number }[] => {
    const piece = board[row][col]
    if (!piece) return []

    const moves: { row: number; col: number }[] = []
    const isWhite = piece === piece.toUpperCase()
    const pieceType = piece.toLowerCase()

    const addMove = (r: number, c: number) => {
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c]
        if (!target || (isWhite !== target === target.toUpperCase())) {
          moves.push({ row: r, col: c })
        }
      }
    }

    // Pawn
    if (pieceType === 'p') {
      const direction = isWhite ? -1 : 1
      const startRow = isWhite ? 6 : 1
      
      // Forward
      addMove(row + direction, col)
      // Double from start
      if (row === startRow) {
        addMove(row + 2 * direction, col)
      }
      // Captures
      addMove(row + direction, col - 1)
      addMove(row + direction, col + 1)
    }

    // Rook
    if (pieceType === 'r') {
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i
          const c = col + dc * i
          if (r < 0 || r >= 8 || c < 0 || c >= 8) break
          const target = board[r][c]
          if (target) {
            if (isWhite !== target === target.toUpperCase()) {
              moves.push({ row: r, col: c })
            }
            break
          }
          moves.push({ row: r, col: c })
        }
      })
    }

    // Knight
    if (pieceType === 'n') {
      [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr, dc]) => {
        addMove(row + dr, col + dc)
      })
    }

    // Bishop
    if (pieceType === 'b') {
      [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i
          const c = col + dc * i
          if (r < 0 || r >= 8 || c < 0 || c >= 8) break
          const target = board[r][c]
          if (target) {
            if (isWhite !== target === target.toUpperCase()) {
              moves.push({ row: r, col: c })
            }
            break
          }
          moves.push({ row: r, col: c })
        }
      })
    }

    // Queen (rook + bishop)
    if (pieceType === 'q') {
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i
          const c = col + dc * i
          if (r < 0 || r >= 8 || c < 0 || c >= 8) break
          const target = board[r][c]
          if (target) {
            if (isWhite !== target === target.toUpperCase()) {
              moves.push({ row: r, col: c })
            }
            break
          }
          moves.push({ row: r, col: c })
        }
      })
    }

    // King
    if (pieceType === 'k') {
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        addMove(row + dr, col + dc)
      })
    }

    return moves
  }, [])

  // Simple AI move
  const getAIMove = useCallback((board: string[][][], difficulty: string): { from: { row: number; col: number }; to: { row: number; col: number } } | null => {
    const allMoves: { from: { row: number; col: number }; to: { row: number; col: number }; score: number }[] = []

    // Find all pieces of current turn (black since AI plays black)
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col]
        if (piece && piece === piece.toLowerCase()) { // Black pieces
          const moves = getValidMoves(board, row, col)
          moves.forEach(move => {
            const target = board[move.row][move.col]
            let score = 0
            
            // Capture scoring
            if (target) {
              const values: Record<string, number> = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 100 }
              score = values[target.toLowerCase()] || 0
            }
            
            // Difficulty modifiers
            if (difficulty === 'novice') {
              score += Math.random() * 2 - 1
            } else if (difficulty === 'intermediate') {
              score += Math.random() * 1 - 0.3
            }
            
            allMoves.push({ from: { row, col }, to: move, score })
          })
        }
      }
    }

    if (allMoves.length === 0) return null

    // Sort by score
    allMoves.sort((a, b) => b.score - a.score)
    
    // Return top move (or random from top 3 for variety)
    const topMoves = allMoves.slice(0, Math.min(3, allMoves.length))
    return topMoves[Math.floor(Math.random() * topMoves.length)]
  }, [getValidMoves])

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (gameState.gameOver || isAIThinking || !gameStarted) return
    
    // Only allow player to move their color
    const piece = gameState.board[row][col]
    if (piece && ((playerColor === 'white' && piece === piece.toUpperCase()) ||
        (playerColor === 'black' && piece === piece.toLowerCase()))) {
      // Select piece
      const validMoves = getValidMoves(gameState.board, row, col)
      setGameState(prev => ({
        ...prev,
        selected: { row, col },
        validMoves
      }))
    } else if (gameState.selected) {
      // Try to move
      const isValid = gameState.validMoves.some(m => m.row === row && m.col === col)
      if (isValid) {
        // Make move
        const newBoard = gameState.board.map(r => [...r])
        const piece = newBoard[gameState.selected.row][gameState.selected.col]
        newBoard[row][col] = piece
        newBoard[gameState.selected.row][gameState.selected.col] = null
        
        // Check for game over (simplified - just capture king)
        const captured = gameState.board[row][col]
        const gameOver = captured?.toLowerCase() === 'k'
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          selected: null,
          validMoves: [],
          turn: gameOver ? prev.turn : (prev.turn === 'white' ? 'black' : 'white'),
          history: [...prev.history, `${PIECES[piece as keyof typeof PIECES] || ''}${String.fromCharCode(97 + prev.selected.col)}${8 - prev.selected.row} → ${String.fromCharCode(97 + col)}${8 - row}`],
          gameOver,
          winner: gameOver ? playerColor : null
        }))

        // AI turn
        if (!gameOver && playerColor === 'white') {
          setIsAIThinking(true)
          setTimeout(() => {
            const aiMove = getAIMove(newBoard, gameState.difficulty)
            if (aiMove) {
              const aiBoard = newBoard.map((r: (string | null)[]) => [...r])
              const aiPiece = aiBoard[aiMove.from.row][aiMove.from.col]
              aiBoard[aiMove.to.row][aiMove.to.col] = aiPiece
              aiBoard[aiMove.from.row][aiMove.from.col] = null
              
              const aiCaptured = newBoard[aiMove.to.row][aiMove.to.col]
              const aiGameOver = aiCaptured?.toUpperCase() === 'K'
              
              setGameState(prev => ({
                ...prev,
                board: aiBoard,
                turn: aiGameOver ? prev.turn : 'white',
                history: [...prev.history, `AI: ${PIECES[aiPiece as keyof typeof PIECES] || ''}${String.fromCharCode(97 + aiMove.from.col)}${8 - aiMove.from.row} → ${String.fromCharCode(97 + aiMove.to.col)}${8 - aiMove.to.row}`],
                gameOver: aiGameOver,
                winner: aiGameOver ? 'black' : null
              }))
            }
            setIsAIThinking(false)
          }, 1000)
        }
      }
    }
  }

  // Reset game
  const resetGame = () => {
    setGameState({
      board: INITIAL_BOARD,
      selected: null,
      turn: 'white',
      validMoves: [],
      history: [],
      gameOver: false,
      winner: null,
      difficulty: gameState.difficulty
    })
    setGameStarted(false)
    setIsAIThinking(false)
  }

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameState(prev => ({
      ...prev,
      turn: playerColor === 'white' ? 'white' : 'black'
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="gradient-text">🎮 Play Chess vs AI</span>
        </h2>
        <p className="text-gray-400">Challenge an AI opponent and win SOL!</p>
      </div>

      {/* Game Controls */}
      {!gameStarted && (
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <label className="block text-sm mb-2">Your Color</label>
              <select
                value={playerColor}
                onChange={(e) => setPlayerColor(e.target.value as 'white' | 'black')}
                className="input-field"
              >
                <option value="white">White (You move first)</option>
                <option value="black">Black (AI moves first)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">AI Difficulty</label>
              <select
                value={gameState.difficulty}
                onChange={(e) => setGameState(prev => ({ ...prev, difficulty: e.target.value as 'novice' | 'intermediate' | 'expert' }))}
                className="input-field"
              >
                <option value="novice">Novice (ELO 800)</option>
                <option value="intermediate">Intermediate (ELO 1200)</option>
                <option value="expert">Expert (ELO 1800+)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={startGame} className="btn-primary">
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Status */}
      <div className="flex justify-center gap-4 mb-6">
        <div className={`glass-card px-6 py-3 ${gameState.turn === 'white' ? 'border-primary-500' : ''}`}>
          <span className="text-2xl mr-2">♔</span>
          <span>White: {gameState.turn === 'white' ? "Your turn" : "AI thinking..."}</span>
        </div>
        <div className={`glass-card px-6 py-3 ${gameState.turn === 'black' ? 'border-primary-500' : ''}`}>
          <span className="text-2xl mr-2">♚</span>
          <span>Black: {gameState.turn === 'black' ? "Your turn" : "AI thinking..."}</span>
        </div>
      </div>

      {/* AI Thinking Indicator */}
      {isAIThinking && (
        <div className="text-center mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 text-primary-400">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2"></span>
            AI is thinking...
          </span>
        </div>
      )}

      {/* Chess Board */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-8 gap-0.5 bg-gray-700 p-1 rounded-lg shadow-2xl">
          {gameState.board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isSelected = gameState.selected?.row === rowIndex && gameState.selected?.col === colIndex
              const isValidMove = gameState.validMoves.some(m => m.row === rowIndex && m.col === colIndex)
              const isLight = (rowIndex + colIndex) % 2 === 0
              
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  disabled={!gameStarted || isAIThinking}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-2xl sm:text-3xl
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'bg-yellow-400' : ''}
                    ${isValidMove ? 'ring-2 ring-green-400' : ''}
                    ${!gameStarted ? 'opacity-50' : ''}
                    hover:opacity-90 transition
                  `}
                >
                  {piece ? (
                    <span className={`
                      ${piece === piece.toUpperCase() ? 'text-black' : 'text-black'}
                      font-bold
                    `}>
                      {PIECES[piece as keyof typeof PIECES]}
                    </span>
                  ) : isValidMove ? (
                    <span className="w-3 h-3 bg-green-500/50 rounded-full"></span>
                  ) : null}
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Game Over */}
      {gameState.gameOver && (
        <div className="glass-card p-8 text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">
            {gameState.winner === playerColor ? '🎉 You Win!' : '😔 AI Wins!'}
          </h3>
          <p className="text-gray-400 mb-4">
            {gameState.winner === playerColor 
              ? 'Congratulations! You defeated the AI!' 
              : 'The AI was too strong. Try again!'}
          </p>
          <button onClick={resetGame} className="btn-primary">
            Play Again
          </button>
        </div>
      )}

      {/* Game History */}
      {gameState.history.length > 0 && (
        <div className="glass-card p-4">
          <h4 className="font-semibold mb-2">Move History</h4>
          <div className="max-h-32 overflow-y-auto text-sm text-gray-400">
            {gameState.history.map((move, i) => (
              <div key={i} className="py-1 border-b border-white/5">
                {Math.floor(i / 2) + 1}. {move}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Betting (future feature) */}
      <div className="mt-8 glass-card p-6">
        <h4 className="font-semibold mb-4">🎰 Betting (Coming Soon)</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">0.1 SOL</div>
            <div>Casual Stakes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">0.5 SOL</div>
            <div>Regular Stakes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">1 SOL</div>
            <div>High Stakes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
