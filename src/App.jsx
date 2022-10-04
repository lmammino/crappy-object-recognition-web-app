import styles from './App.module.css'
import {Detector} from './Detector.jsx'

function App() {
  return (
    <div class={styles.App}>
      <main>
        <Detector/>
      </main>
    </div>
  );
}

export default App;
