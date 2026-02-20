import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '@/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from '@/App.tsx';
import Home from '@/pages/home';
import Login from '@/pages/login';
import SignUp from '@/pages/sign-up';

import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import NotFound from './pages/not-found';
import AuthProvider from './providers/AuthProvider';
import UserProvider from './providers/UserProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<UserProvider>
						<Routes>
							<Route
								path='/'
								element={<App />}
							>
								<Route element={<AuthGuard />}>
									<Route
										index
										element={<Home />}
									/>
								</Route>

								<Route element={<GuestGuard />}>
									<Route
										path='login'
										element={<Login />}
									/>
									<Route
										path='sign-up'
										element={<SignUp />}
									/>
								</Route>

								{/* Not Found */}
								<Route
									path='*'
									element={<NotFound />}
								/>
							</Route>
						</Routes>
					</UserProvider>
				</BrowserRouter>
			</AuthProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>,
);
