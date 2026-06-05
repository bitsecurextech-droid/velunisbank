'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

const steps = ['Personal', 'Address', 'KYC', 'Account Type', 'Review']

export default function OpenAccount() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    accountType: 'CHECKING',
  })
  const [idFile, setIdFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const next = () => setStep(s => s + 1)
  const prev = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      // 1. Register the user
      await api.post('/auth/register', {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
        accountType: form.accountType,
        currency: 'USD', // default – can be detected later
      })

      // 2. Upload KYC document if provided
      if (idFile) {
        const fd = new FormData()
        fd.append('document', idFile)
        fd.append('documentType', 'PASSPORT')
        await api.post('/kyc/submit', fd)
      }

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '100%', boxShadow: '0 12px 30px rgba(0,0,0,0.05)', border: '1px solid #eef3fc' }}>
        {/* Progress Steps */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
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

        {error && <p style={{ color: '#8B0000', marginBottom: '16px' }}>{error}</p>}

        {/* Step 0 – Personal Info */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '20px' }}>Personal Information</h2>
            <input name="firstName" placeholder="First Name" onChange={handleChange} style={inputStyle} required />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} style={inputStyle} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
            <input name="dateOfBirth" type="date" placeholder="Date of Birth" onChange={handleChange} style={inputStyle} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
            <button onClick={next} style={btnStyle}>Next</button>
          </div>
        )}

        {/* Step 1 – Address */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '20px' }}>Residential Address</h2>
            <input name="addressLine1" placeholder="Street Address" onChange={handleChange} style={inputStyle} required />
            <input name="addressLine2" placeholder="Apartment / Suite (optional)" onChange={handleChange} style={inputStyle} />
            <input name="city" placeholder="City" onChange={handleChange} style={inputStyle} required />
            <input name="state" placeholder="State / Province" onChange={handleChange} style={inputStyle} required />
            <input name="postalCode" placeholder="Postal Code" onChange={handleChange} style={inputStyle} required />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prev} style={btnOutlineStyle}>Back</button>
              <button onClick={next} style={btnStyle}>Next</button>
            </div>
          </div>
        )}

        {/* Step 2 – KYC */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '20px' }}>Identity Verification</h2>
            <p style={{ color: '#5b6e8c', marginBottom: '12px' }}>Upload a valid passport, national ID, or driver’s license.</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setIdFile(e.target.files?.[0] || null)}
              style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prev} style={btnOutlineStyle}>Back</button>
              <button onClick={next} style={btnStyle}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3 – Account Type */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '20px' }}>Account Type</h2>
            <select name="accountType" value={form.accountType} onChange={handleChange} style={inputStyle}>
              <option value="CHECKING">Personal Checking</option>
              <option value="SAVINGS">Savings</option>
              <option value="BUSINESS">Business</option>
              <option value="JOINT">Joint</option>
              <option value="MULTI_CURRENCY">Multi‑Currency</option>
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prev} style={btnOutlineStyle}>Back</button>
              <button onClick={next} style={btnStyle}>Next</button>
            </div>
          </div>
        )}

        {/* Step 4 – Review */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '20px' }}>Review Your Application</h2>
            <div style={{ background: '#f9fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', fontSize: '14px' }}>
              <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Date of Birth:</strong> {form.dateOfBirth}</p>
              <p><strong>Address:</strong> {form.addressLine1}, {form.city}, {form.state} {form.postalCode}</p>
              <p><strong>Account Type:</strong> {form.accountType}</p>
              <p><strong>KYC Document:</strong> {idFile ? idFile.name : 'None'}</p>
            </div>
            {message && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{message}</p>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prev} style={btnOutlineStyle}>Back</button>
              <button onClick={handleSubmit} disabled={loading} style={btnStyle}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid #e0e4ea',
  background: '#f9fafc',
  marginBottom: '16px',
  fontSize: '1rem',
  color: '#001f3f',
}

const btnStyle: React.CSSProperties = {
  background: '#001f3f',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '30px',
  fontWeight: 600,
  cursor: 'pointer',
}

const btnOutlineStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #cdd9ed',
  padding: '12px 24px',
  borderRadius: '30px',
  fontWeight: 600,
  cursor: 'pointer',
  color: '#001f3f',
}