import AppRoot from './App';
import Home from '../modules/Home/Home';
import Owner from '../modules/Property/pages/OwnerPage';

const routes = [{
  component: AppRoot,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/owner',
      component: Owner
    }
  ]
}];

export default routes;