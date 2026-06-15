import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ExamSetupPage from "./pages/ExamSetupPage";
import ExamInstructionsPage from "./pages/ExamInstructionsPage";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/setup"
            element={
              <ProtectedRoute>
                <ExamSetupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/instructions"
            element={
              <ProtectedRoute>
                <ExamInstructionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId"
            element={
              <ProtectedRoute>
                <ExamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result/:attemptId"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                  <p className="text-xl text-slate-400">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
