import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage, PlatformsPage, GamesPage, SingleGamePage, ErrorPage } from './pages';
import { Footer, Navbar, DropDown } from './components/';
import { FilterProvider } from './contexts/filter_context';

const App = () => {
  return <Router>
    <FilterProvider>
      <DropDown ContentComponent={Navbar} contentMsg={'Site Navigation'} forceClose={true} />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/platforms'>
          <PlatformsPage />
        </Route>
        <Route path='/game/' component={SingleGamePage} />
        <Route path='/games/' component={GamesPage} />
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </FilterProvider>
  </Router>;
};

export default App;