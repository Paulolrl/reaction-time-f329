import React, {useState} from 'react';
import './App.css';
import moment from 'moment';

function App() {

  const [isOn, setIsOn] = useState(false);
  const [turnTime, setTurnTime] = useState();
  const [diffs, setDiffs] = useState([]);
  const [diff, setDiff] = useState(0);

  function startRandom(){
    setIsOn(false);
    let time = Math.floor(Math.random() * 10000 + 1000);     // returns a random integer from 0 to 100
    setTimeout(() => {
      setTurnTime(moment());
      setIsOn(true);
    }, time);
  }

  function reaction(){
    let diff = moment.duration(moment().diff(turnTime));
    setDiff(diff._milliseconds);
    setDiffs(diffs => {
      let newDiffs = [...diffs];
      newDiffs.push(diff._milliseconds);
      return newDiffs;
    });
  }

  function calcAverage(){
    const sum = diffs.reduce((a, b) => a + b, 0);
    return Math.round((sum / diffs.length) || 0);
  }

  return (
    <div className="App">
      <div className={'summary'}>
        <span>Ultima reação: {diff} ms</span>
        <span>Média do tempo das reações: {calcAverage()} ms</span>
      </div>
      <button className={'button'} onClick={startRandom}>Iniciar</button>
      <div className={'light'} style={{backgroundColor: isOn? '#f51b1b': '#910000'}} />
      <button className={'button'} onClick={reaction}>reagir</button>
      <span className={'obs'}>
        <p>Obs: Ao clicar em inicar o circulo vermelho é "aceso" dentro de um tempo aleatório no intervalo de 1 a 10 segundos,
        então o momento em que ele foi aceso é guardado e quando clico em reagir é calculada a diferença de tempo entre
        o momento em que o circulo foi aceso e o momento em que reagi em milisegundos. Esse tempo também é armazenado em um
        vetor para ser calculada a média de várias reações.</p>
        <p>Obs 2: É importante ressaltar que esse teste de tempo de reação é influenciado por alguns fatores, como por exemplo a
        taxa de atualização da tela, que no meu caso é de 60Hz.
        </p>
        <p>O código fonte da aplicação pode ser encontrado em: {' '}
          <a href={'https://github.com/Paulolrl/reaction-time-f329'}>
            https://github.com/Paulolrl/reaction-time-f329
          </a>
        </p>
      </span>
    </div>
  );
}

export default App;
