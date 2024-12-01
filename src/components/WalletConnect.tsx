import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const connectKeplr = async () => {
    if (!window.keplr) {
      alert('Please install Keplr wallet');
      return;
    }

    try {
      // Agoric testnet chain configuration
      const agoricChainInfo = {
        chainId: 'agoricdev-11',
        chainName: 'Agoric Devnet',
        rpc: 'https://devnet.rpc.agoric.net',
        rest: 'https://devnet.api.agoric.net',
        bip44: {
          coinType: 564,
        },
        bech32Config: {
          bech32PrefixAccAddr: 'agoric',
          bech32PrefixAccPub: 'agoricpub',
          bech32PrefixValAddr: 'agoricvaloper',
          bech32PrefixValPub: 'agoricvaloperpub',
          bech32PrefixConsAddr: 'agoricvalcons',
          bech32PrefixConsPub: 'agoricvalconspub',
        },
        currencies: [
          {
            coinDenom: 'BLD',
            coinMinimalDenom: 'ubld',
            coinDecimals: 6,
          },
          {
            coinDenom: 'IST',
            coinMinimalDenom: 'uist',
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: 'BLD',
            coinMinimalDenom: 'ubld',
            coinDecimals: 6,
          },
        ],
        stakeCurrency: {
          coinDenom: 'BLD',
          coinMinimalDenom: 'ubld',
          coinDecimals: 6,
        },
        gasPriceStep: {
          low: 0,
          average: 0.1,
          high: 0.2,
        },
      };

      // Suggest the Agoric chain to Keplr
      await window.keplr.experimentalSuggestChain(agoricChainInfo);
      await window.keplr.enable('agoricdev-11');
      
      const offlineSigner = window.keplr.getOfflineSigner('agoricdev-11');
      const accounts = await offlineSigner.getAccounts();
      console.log('Connected account:', accounts[0].address);
      onConnect(accounts[0].address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect to Agoric network. Please make sure you have Keplr wallet installed and try again.');
    }
  };

  return (
    <button
      onClick={connectKeplr}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
      aria-label="Connect wallet"
    >
      <Wallet className="w-5 h-5" />
      Connect Wallet
    </button>
  );
}