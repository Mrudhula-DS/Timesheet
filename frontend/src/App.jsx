import AuthProvider from "./auth/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./router";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ErrorBoundary>
  );
}
