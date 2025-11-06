import React from 'react';

function AdminPanel() {
  const bets = [
    { id: 1, user: '0x123...abc', market: 'Биток < $100k', bet: 'YES', amount: 100, time: '2025-11-05 10:30' },
    { id: 2, user: '0x456...def', market: 'Биток < $100k', bet: 'NO', amount: 50, time: '2025-11-05 11:15' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'red', textAlign: 'center' }}>Админ-панель</h1>
      <h2>Список ставок</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Юзер</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Рынок</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Ставка</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Сумма</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Время</th>
          </tr>
        </thead>
        <tbody>
          {bets.map(b => (
            <tr key={b.id}>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.user}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.market}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.bet}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>${b.amount}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px' }}>
          Пополнить баланс юзеру
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
