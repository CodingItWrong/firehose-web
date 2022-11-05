import {Link} from 'react-router-dom';

export default function Tag({name, ...props}) {
  return (
    <Link to={`/tags/${name}`} {...props}>
      {name}
    </Link>
  );
}
