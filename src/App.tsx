import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { WalletConnect } from './components/WalletConnect';
import { Dashboard } from './components/Dashboard';
import { PaymentRequest } from './components/PaymentRequest';
import { ArrowRight, Coins, Globe, Shield, Zap } from 'lucide-react';

function App() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [view, setView] = useState<'home' | 'dashboard' | 'payment'>('home');

  const handleConnect = (walletAddress: string) => {
    setConnected(true);
    setAddress(walletAddress);
    setView('dashboard');
  };

  if (connected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold">ChainPay</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'dashboard'
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setView('payment')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'payment'
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Payment Request
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        <main>
          {view === 'dashboard' && <Dashboard address={address} />}
          {view === 'payment' && <PaymentRequest address={address} />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Coins className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold">ChainPay</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <WalletConnect onConnect={handleConnect} />
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              The Future of Cross-Chain Payments
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              ChainPay revolutionizes blockchain payments with autonomous cross-chain transactions,
              smart contracts, and seamless wallet integration.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Connect wallet"]')?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <Globe className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cross-Chain Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seamlessly transfer assets across multiple blockchain networks with intelligent routing.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <Zap className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create autonomous payment contracts with sophisticated scheduling and triggers.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <Shield className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with advanced security measures and compliance tools for business needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;