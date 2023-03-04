import './styles/index.scss';
import Header from './components/Header/Header';
import CellsContainer from './components/CellsContainer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startGame } from './store/slices/configurationSlice';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGame())
  }, [])
  
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
