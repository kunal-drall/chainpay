import React from 'react';
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users, Wallet } from 'lucide-react';

export function Dashboard({ address }: { address: string }) {
  const stats = [
    { label: 'Total Balance', value: '1,234 BLD', icon: Wallet },
    { label: 'Total IST', value: '5,678 IST', icon: DollarSign },
    { label: 'Active Requests', value: '8', icon: CreditCard },
    { label: 'Connected Users', value: '12', icon: Users },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-indigo-600" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="font-medium">Payment Request #{i + 1}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-indigo-600 font-medium">50 BLD</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">100 IST</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}