import {useToken} from '../data/token';

export default function TokenLoadBuffer({children}) {
  const {isTokenLoaded} = useToken();

  if (!isTokenLoaded) {
    return null; // because children will error
  } else {
    return children;
  }
}
