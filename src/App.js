import './App.css';
import { useState, useRef } from 'react';

function App() {

  const [InputValue, setInputValue] = useState('')
  const [InputType, setInputType] = useState('binary')
  const [outputValue, setOutputValue] = useState('Convert results ')
  const inputRef = useRef()


  const typeSwap = () => {
    InputType === 'binary' ? setInputType('text') : setInputType('binary');
    inputRef.current.value = '';

  }

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(`${outputValue}`)
  };
  


  const inputing = () => {
    Convert(InputType, InputValue)
  }
  function Convert(type, value) {
    let output = '';
    if (type === 'binary') {
      output = binaryToText(value);
    } else if (type === 'text') {
      output = textToBinary(value);
    }
    setOutputValue(output)
  }

  function binaryToText(input) {
    let output = '';
    output = input.split(' ').map((num) => parseInt(num, 2))
      .map((num) => String.fromCharCode(num))
      .join('')
    return output
  }

  function textToBinary(input) {
    let output = '';
    output = input.split('')
      .map((char) => char.charCodeAt(0))
      .map((char) => char.toString(2))
      .join(' ')

    return output
  }

  return (
    <div className="App">
      <h1 className="title">{InputType === 'binary' ? "Binary to text" : "Text to binary"}</h1>
      <div className="container">
        <button className="switch" type="reset" data-type={InputType} onClick={typeSwap}>Switch</button>
        <form>
          <div className="input">
            <textarea ref={inputRef} name="input" id="input" cols="30" rows="10" data-type={InputType} placeholder={InputType === 'binary' ? "Binary code here ..." : "Text here ..."} onChange={(e) => setInputValue(e.target.value)}></textarea>
          </div>
          <button className="Convert" onClick={inputing} type="button">Convert</button>
          <div className="output">
            {outputValue}
          </div>
          <i className="fas fa-copy" onClick={copyToClipboard}></i>
        </form>
      </div>
    </div>
  );
}

export default App;
