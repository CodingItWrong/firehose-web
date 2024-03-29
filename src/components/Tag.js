import {Link} from 'react-router-dom';

export default function Tag({name, ...props}) {
  return (
    <li className="tag-list__tag">
      <Link to={`/tags/${name}`} data-cy="tag-link" {...props}>
        {name}
      </Link>
    </li>
  );
}
