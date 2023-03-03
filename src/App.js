import './styles/index.scss';
import Header from './components/Header/Header';
import CellsContainer from './components/CellsContainer';

const App = () => {
  return (
    <main>
      <div className='game-container'>
        <Header />
        <CellsContainer />
      </div>
    </main>
  );
}

export default App;
