import { useState } from 'react'
import './App.css'

function App() {
  const [allocation, setAllocation] = useState('')
  const [investors, setInvestors] = useState([])
  const [results, setResults] = useState([])

  const [name, setName] = useState('')
  const [requestedAmount, setRequestedAmount] = useState('')
  const [averageAmount, setAverageAmount] = useState('')

  const clearFields = () => {
    setName('')
    setRequestedAmount('')
    setAverageAmount('')
  }

  const calculateAllocations = async (event) => {
    event.preventDefault()
    console.log(import.meta.env)
    const url = import.meta.env.VITE_API
    const body = { allocation, investors }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setResults(json.allocations)
    } catch (error) {
      console.error(error.message);
    }
  }

  const addInvestor = (event) => {
    event.preventDefault()
    setInvestors(oldInvestors => [...oldInvestors, {
      name,
      requestedAmount: Number(requestedAmount),
      averageAmount: Number(averageAmount )
    }])
    clearFields()
  }

  return (
    <>
      <div id="prorate-component">
        <span className="form-title">Inputs</span>
        <div className="inputs">
          <form id="prorate-form">
            <div className="form-section">
              <span className="title">Total Available Allocation</span>
              <div className="form-controls">
                <input type="text"
                  placeholder="Allocation"
                  value={allocation}
                  onChange={event => setAllocation(event.target.value) } />
              </div>
            </div>
            <div className="form-section">
              <span className="title">Investor Breakdown</span>
              <div className="form-controls">
                <input type="text"
                  placeholder="Name"
                  value={name}
                  onChange={event => setName(event.target.value) } />
                <input type="text"
                  value={requestedAmount}
                  placeholder="Requested Amount"
                  onChange={event => setRequestedAmount(event.target.value) } />
                <input type="text"
                  value={averageAmount}
                  placeholder="Average Amount"
                  onChange={event => setAverageAmount(event.target.value) } />
              </div>
            </div>
            <button onClick={addInvestor}>Add Investor</button>
            <input type="submit" value="Prorate" onClick={calculateAllocations} />
          </form>
        </div>
        <span className="form-title">Investors</span>
        <div className="investors">
          <ul>
            {investors.map((investor) => {
              return <li key={investor.name}>{investor.name}: {investor.requestedAmount}</li>
            })}
          </ul>
        </div>
        <span className="form-title">Results</span>
        <div className="results">
          <ul>
            {results.map(result => {
              return <li key={result.name}>{result.name}: ${result.amount}</li>
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
