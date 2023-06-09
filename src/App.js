import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from './Layout';
import { Calendar } from './pages/calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
