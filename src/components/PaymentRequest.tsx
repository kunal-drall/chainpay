import React, { useState } from 'react';
import { QrCode, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode.react';

export function PaymentRequest({ address }: { address: string }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BLD');
  const [description, setDescription] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentLink = `agoric:${address}?amount=${amount}&denom=${currency}&memo=${encodeURIComponent(description)}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Payment Request</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                placeholder="0.00"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
              >
                <option value="BLD">BLD</option>
                <option value="IST">IST</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
              rows={3}
              placeholder="What's this payment for?"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Wallet Address</h3>
        
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={address}
            readOnly
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <QrCode className="w-5 h-5" />
            {showQR ? 'Hide' : 'Show'} QR Code
          </button>
        </div>

        {showQR && (
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <QRCode value={paymentLink} size={200} level="H" />
          </div>
        )}
      </div>
    </div>
  );
}