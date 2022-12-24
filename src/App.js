import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Navigation from './Navigation';
import TokenLoadBuffer from './components/TokenLoadBuffer';
import {TokenProvider, useToken} from './data/token';
import SignIn from './routes/SignIn';
import './style.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App() {
  return (
    <TokenProvider>
      <TokenLoadBuffer>
        <QueryClientProvider client={queryClient}>
          <div className="page-container">
            <Body />
          </div>
        </QueryClientProvider>
      </TokenLoadBuffer>
    </TokenProvider>
  );
}

function Body() {
  const {isLoggedIn} = useToken();

  if (isLoggedIn) {
    return <Navigation />;
  } else {
    return <SignIn />;
  }
}
