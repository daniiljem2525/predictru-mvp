import React, { useState, useEffect } from 'react';

function App() {
  const [markets, setMarkets] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    fetch('https://predictru-backend.onrender.com/markets')
      .then(res => res.json())
      .then(setMarkets)
      .catch(() => console.log('Backend не запущен — показываю демо'));
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        alert('Подключи Metamask!');
      }
    } else {
      alert('Установи Metamask!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a73e8', textAlign: 'center' }}>PredictRU</h1>
      
      {!account ? (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button 
            onClick={connectWallet} 
            style={{ 
              padding: '14px 28px', 
              fontSize: '18px', 
              background: '#1a73e8', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            Подключить Metamask
          </button>
        </div>
      ) : (
        <p style={{ textAlign: 'center', background: '#e8f0fe', padding: '10px', borderRadius: '8px' }}>
          Подключён: <strong>{account.slice(0,6)}...{account.slice(-4)}</strong>
        </p>
      )}

      <h2 style={{ marginTop: '30px' }}>Активные рынки</h2>
      
      {markets.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Загрузка рынков...</p>
      ) : (
        markets.map(m => (
          <div 
            key={m.id} 
            style={{ 
              border: '2px solid #ddd', 
              borderRadius: '16px', 
              margin: '20px 0', 
              padding: '20px', 
              background: '#fafafa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>{m.question}</h3>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Дедлайн:</strong> {new Date(m.deadline * 1000).toLocaleDateString('ru-RU')}
            </p>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <div style={{ flex: 1, background: '#e8f5e8', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
                  YES: ${m.yesPool}
                </div>
                <button 
                  style={{ 
                    marginTop: '12px', 
                    width: '100%', 
                    padding: '12px', 
                    background: '#4caf50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Ставка 100 USDT
                </button>
              </div>
              
              <div style={{ flex: 1, background: '#fce4ec', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c62828' }}>
                  NO: ${m.noPool}
                </div>
                <button 
                  style={{ 
                    marginTop: '12px', 
                    width: '100%', 
                    padding: '12px', 
                    background: '#f44336', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Ставка 100 USDT
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#888', fontSize: '14px' }}>
        © 2025 PredictRU — 3% комиссии → тебе
      </footer>
    </div>
  );
}

export default App;
