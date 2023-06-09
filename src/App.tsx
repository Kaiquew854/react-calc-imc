import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem'
import leftArrowImage from './assets/leftarrow.png';

const App = () => {
  const [heightField, setheightField] = useState<number>(0);
  const [weightField, setweightField] = useState<number>(0);
  const [toShow, settoShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      settoShow(calculateImc(heightField, weightField))
    } else {
      alert("Digite todos os campos.")
    }
  }

 const handleBackButton = ()=>{
  settoShow(null);
  setheightField(0);
  setweightField(0);
 }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='pwdImage' width={150} />
        </div>
      </header>
      <div className={styles.container}>

        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla pa ìndice de Massa Corpórea. parâmetro
            adotado pela Organização Mundial de Saude para
            calcular opeso ideal de cada pessoa.
          </p>
          <input
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setheightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder='Digite o seu peso. Ex: 75.3 (em Kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setweightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>


        <div className={styles.rightSide}>

          {!toShow && //mapeia todos elementos se não houver calculo
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }

          {toShow && //exibe apenas o item do calculateimc
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }

        </div>


      </div>
    </div>
  );
}

export default App;
