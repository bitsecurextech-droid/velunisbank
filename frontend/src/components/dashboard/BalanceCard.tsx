interface Props {
  title: string;
  amount: number;
}

export default function BalanceCard({ title, amount }: Props) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #eef3fc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
      }}
    >
      <p style={{ color: '#5b6e8c', fontSize: '0.9rem', marginBottom: '8px' }}>{title}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#001f3f' }}>
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}