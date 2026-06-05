'use client';
import { useState } from 'react';
import axios from '@/lib/api';
import { useForm } from 'react-hook-form';

export function TransferForm() {
  const [recipientName, setRecipientName] = useState('');
  const { register, handleSubmit, watch } = useForm();
  const accountNumber = watch('accountNumber');

  const lookupRecipient = async (value: string) => {
    if (value.length < 8) return;
    const { data } = await axios.get(`/api/v1/transfers/lookup?accountNumber=${value}`);
    setRecipientName(data?.name || 'Not found');
  };

  const onSubmit = async (formData: any) => {
    if (!recipientName || recipientName === 'Not found') return alert('Invalid recipient');
    await axios.post('/api/v1/transfers', { ...formData, recipientName });
    // success handling
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 rounded-xl space-y-4">
      <input {...register('accountNumber')} onChange={(e) => { lookupRecipient(e.target.value); }} placeholder="Account Number" className="bg-navy/50 border border-gold/20 rounded-lg p-3 w-full text-white" />
      {recipientName && <p className="text-gold">Recipient: {recipientName}</p>}
      <input {...register('amount')} type="number" placeholder="Amount" className="bg-navy/50 border border-gold/20 rounded-lg p-3 w-full text-white" />
      <button type="submit" className="bg-gold text-navy font-semibold px-8 py-3 rounded-lg hover:bg-gold/90 transition">Transfer</button>
    </form>
  );
}