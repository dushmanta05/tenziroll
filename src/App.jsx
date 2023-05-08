import React from 'react'
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

import Footer from './components/Footer';

import Die from './components/Die'

const App = () => {

  const [diceValue, setDiceValue] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false)
  const [attempt, setAttempt] = React.useState(0)


  React.useEffect(() => {
    const allHeld = diceValue.every(dice => dice.isHeld);
    const firstValue = diceValue[0].value;
    const allSameValue = diceValue.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  }, [diceValue])

  function generateNewDie(){
      return {value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()}
  }
  function allNewDice(){
    let array = [];
    for (let index = 0; index < 10; index++) {
      array.push(generateNewDie())
    }
    return array;
  }
  function rollDice(){
    if(!tenzies){
      setAttempt(prev => prev + 1)
      setDiceValue(oldDiceValue => oldDiceValue.map(obj => obj.isHeld ? obj : generateNewDie()))
    } else {
      setAttempt(0)
      setTenzies(false);
      setDiceValue(allNewDice());
    }
  }
  function holdDice(id){
    setDiceValue(oldDiceValue => oldDiceValue.map(obj => obj.id === id ? {...obj, isHeld: !obj.isHeld} : obj))
  }

  const diceElements = diceValue.map(obj => <Die isHeld={obj.isHeld} key={obj.id} value={obj.value} holdDice={() => holdDice(obj.id)} />)

  return (
    <><main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies 🎲</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
       {diceElements}
      </div>
      {tenzies && <div className='win'>Congratulations! You won, and you have taken {attempt} attempt to solve it.🥳</div>}
      <button className='roll-dice' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
    <Footer />
    </>
  )
}

export default App