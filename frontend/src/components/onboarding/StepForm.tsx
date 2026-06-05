'use client'

import { useState } from 'react'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

const steps = ['Personal', 'Address', 'KYC', 'Review']

export default function StepForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<any>({})
  const router = useRouter()

  const next = () => setStep(s => s + 1)
  const prev = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    try {
      await api.post('/auth/register', {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country || 'US',
        currency: form.currency || 'USD',
      })
      // After registration, submit KYC
      if (form.idFile) {
        const fd = new FormData()
        fd.append('document', form.idFile)
        fd.append('documentType', 'PASSPORT')
        await api.post('/kyc/submit', fd)
      }
      router.push('/login?registered=true')
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error')
    }
  }

  return (
    <div>
      {/* Progress indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {steps.map((s, i) => (
          <div key={s} style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: i <= step ? '#001f3f' : '#eef3fc',
            color: i <= step ? 'white' : '#5b6e8c',
            fontWeight: 600,
            fontSize: '14px',
          }}>{s}</div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2>Personal Information</h2>
          <input placeholder="First Name" onChange={e => setForm({...form, firstName: e.target.value})} style={inputStyle} />
          <input placeholder="Last Name" onChange={e => setForm({...form, lastName: e.target.value})} style={inputStyle} />
          <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
          <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />
          <button onClick={next} style={btnStyle}>Next</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Address</h2>
          <input placeholder="Country" onChange={e => setForm({...form, country: e.target.value})} style={inputStyle} />
          <input placeholder="City" onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} />
          <button onClick={next} style={btnStyle}>Next</button>
          <button onClick={prev} style={btnOutlineStyle}>Back</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Identity Verification</h2>
          <input type="file" onChange={e => setForm({...form, idFile: e.target.files?.[0]})} style={inputStyle} />
          <button onClick={next} style={btnStyle}>Next</button>
          <button onClick={prev} style={btnOutlineStyle}>Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Review</h2>
          <p>Name: {form.firstName} {form.lastName}</p>
          <p>Email: {form.email}</p>
          <p>Country: {form.country}</p>
          <button onClick={handleSubmit} style={btnStyle}>Submit</button>
          <button onClick={prev} style={btnOutlineStyle}>Back</button>
        </div>
      )}
    </div>
  )
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '16px', fontSize: '1rem' }
const btnStyle = { background: '#001f3f', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 600, cursor: 'pointer', marginRight: '10px' }
const btnOutlineStyle = { background: 'transparent', border: '1px solid #cdd9ed', padding: '12px 24px', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }