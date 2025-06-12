import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState('')
  const [operator, setOperator] = useState(null)
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState('') 

  const handleNumberClick = (num) => {
    if (display === '0' || operator) {
      setDisplay(num.toString())
      setCurrentValue(num.toString())
    } else {
      setDisplay(display + num)
      setCurrentValue(currentValue + num)
    }
    setOperation(prev => prev + num) 
  }

  const handleOperatorClick = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(currentValue))
    } else if (currentValue) {
      const result = calculate()
      setPreviousValue(result)
      setDisplay(result.toString())
    }
    setOperator(op)
    setCurrentValue('')
    setOperation(prev => prev + ' ' + op + ' ') 
  }

  const calculate = () => {
    const prev = parseFloat(previousValue)
    const current = parseFloat(currentValue)
    switch (operator) {
      case '+': return prev + current
      case '-': return prev - current
      case '*': return prev * current
      case '/': return prev / current
      default: return current
    }
  }

  const handleEquals = () => {
    if (previousValue !== null && currentValue && operator) {
      const result = calculate()
      setDisplay(result.toString())
      setPreviousValue(null)
      setCurrentValue(result.toString())
      setOperator(null)
      setOperation(result.toString()) 
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentValue('')
    setPreviousValue(null)
    setOperator(null)
    setOperation('') 
  }

  const handleDelete = () => {
    if (currentValue.length > 1) {
      const newValue = currentValue.slice(0, -1)
      setCurrentValue(newValue)
      setDisplay(newValue)
      setOperation(prev => prev.slice(0, -1)) 
    } else {
      setCurrentValue('0')
      setDisplay('0')
      setOperation('0') 
    }
  }

  const handleToggleSign = () => {
    if (currentValue) {
      const toggledValue = parseFloat(currentValue) * -1
      setCurrentValue(toggledValue.toString())
      setDisplay(toggledValue.toString())
      setOperation(toggledValue.toString()) 
    }
  }

  const Button = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={`w-full h-16 text-2xl font-bold rounded-lg ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100">
      <div className="bg-zinc-100 p-4 rounded-xl shadow-lg w-full max-w-xs border border-zinc-300">
        <div className="bg-zinc-200 p-4 rounded-lg mb-4">
          <div className="text-right text-lg text-zinc-600 mb-2 h-6">{operation}</div>
          <div className="text-right text-4xl font-bold text-zinc-800">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={handleClear} className="col-span-2 bg-zinc-500 ">Clear</Button>
          <Button onClick={handleDelete} className="bg-zinc-500 ">DEL</Button>
          <Button onClick={() => handleOperatorClick('/')} className="bg-zinc-500">/</Button>
          <Button onClick={() => handleNumberClick(7)} className="bg-zinc-300">7</Button>
          <Button onClick={() => handleNumberClick(8)} className="bg-zinc-300">8</Button>
          <Button onClick={() => handleNumberClick(9)} className="bg-zinc-300">9</Button>
          <Button onClick={() => handleOperatorClick('*')} className="bg-zinc-500 ">*</Button>
          <Button onClick={() => handleNumberClick(4)} className="bg-zinc-300">4</Button>
          <Button onClick={() => handleNumberClick(5)} className="bg-zinc-300">5</Button>
          <Button onClick={() => handleNumberClick(6)} className="bg-zinc-300">6</Button>
          <Button onClick={() => handleOperatorClick('-')} className="bg-zinc-500 ">-</Button>
          <Button onClick={() => handleNumberClick(1)} className="bg-zinc-300">1</Button>
          <Button onClick={() => handleNumberClick(2)} className="bg-zinc-300">2</Button>
          <Button onClick={() => handleNumberClick(3)} className="bg-zinc-300">3</Button>
          <Button onClick={() => handleOperatorClick('+')} className="bg-zinc-500 ">+</Button>
          <Button onClick={handleToggleSign} className="bg-zinc-300">+/-</Button>
          <Button onClick={() => handleNumberClick(0)} className="bg-zinc-300">0</Button>
          <Button onClick={() => handleNumberClick('.')} className="bg-zinc-300">.</Button>
          <Button onClick={handleEquals} className="bg-zinc-500 ">=</Button>
        </div>
      </div>
    </div>
  )
}

export default App