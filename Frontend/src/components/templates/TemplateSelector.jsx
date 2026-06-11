import { Check } from 'lucide-react'
import { useTranslation } from "react-i18next";

const TEMPLATES = [
  {
    id: 'classic', name: 'Classic', desc: 'Dark header · Traditional',
    Preview: () => (
      <div style={{ width: 360, height: 480, pointerEvents: 'none', background: '#fff' }}>
        <div style={{ background: '#111827', height: 72, padding: '10px 14px' }}>
          <div style={{ height: 13, background: 'rgba(255,255,255,0.9)', borderRadius: 2, width: '50%', marginBottom: 5 }} />
          <div style={{ height: 7, background: 'rgba(255,255,255,0.5)', borderRadius: 2, width: '32%', marginBottom: 6 }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.3)', borderRadius: 2, width: '75%' }} />
        </div>
        <div style={{ padding: '12px 14px' }}>
          {[['SUMMARY', '90%'], ['EXPERIENCE', '75%'], ['SKILLS', '55%']].map(([l, w]) => (
            <div key={l} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 6, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3, borderBottom: '1px solid #e5e7eb', paddingBottom: 2 }}>{l}</div>
              <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2, marginBottom: 2 }} />
              <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2, width: w }} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'modern', name: 'Modern', desc: 'Dark sidebar · Two-column',
    Preview: () => (
      <div style={{ width: 360, height: 480, display: 'flex', pointerEvents: 'none' }}>
        <div style={{ width: 108, background: '#111827', padding: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#374151', margin: '0 auto 6px' }} />
          <div style={{ height: 7, background: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 2, width: '70%', marginBottom: 12 }} />
          {[80, 65, 55, 72].map((w, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 2 }} />
              <div style={{ height: 3, background: 'rgba(255,255,255,0.4)', borderRadius: 99, width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 10 }}>
          {[['SUMMARY', '95%'], ['EXPERIENCE', '80%'], ['EDUCATION', '60%']].map(([l, w]) => (
            <div key={l} style={{ marginBottom: 9 }}>
              <div style={{ fontSize: 6, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3, borderBottom: '1px solid #e5e7eb', paddingBottom: 2 }}>{l}</div>
              <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, marginBottom: 2 }} />
              <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, width: w }} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'minimal', name: 'Minimal', desc: 'Ultra-clean · Typography',
    Preview: () => (
      <div style={{ width: 360, height: 480, padding: 20, background: '#fff', pointerEvents: 'none' }}>
        <div style={{ borderBottom: '2px solid #111827', paddingBottom: 10, marginBottom: 12 }}>
          <div style={{ height: 16, background: '#111827', borderRadius: 2, width: '50%', marginBottom: 4 }} />
          <div style={{ height: 7, background: '#d1d5db', borderRadius: 2, width: '30%', marginBottom: 7 }} />
          <div style={{ height: 5, background: '#e5e7eb', borderRadius: 2, width: '85%' }} />
        </div>
        {[['EXPERIENCE', '100%', '80%'], ['EDUCATION', '90%', '60%'], ['SKILLS', '75%', null]].map(([l, w1, w2]) => (
          <div key={l} style={{ marginBottom: 11 }}>
            <div style={{ fontSize: 6, letterSpacing: 2, color: '#9ca3af', marginBottom: 4, fontWeight: 700, borderBottom: '1px solid #f3f4f6', paddingBottom: 3 }}>{l}</div>
            <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2, marginBottom: 2, width: w1 }} />
            {w2 && <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2, width: w2 }} />}
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'executive', name: 'Executive', desc: 'Premium · Side panel',
    Preview: () => (
      <div style={{ width: 360, height: 480, pointerEvents: 'none', background: '#fff' }}>
        <div style={{ height: 5, background: '#111827' }} />
        <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ height: 13, background: '#111827', borderRadius: 2, width: 90, marginBottom: 4 }} />
            <div style={{ height: 7, background: '#9ca3af', borderRadius: 2, width: 60 }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            {[70, 55, 80].map((w, i) => <div key={i} style={{ height: 5, background: '#f3f4f6', borderRadius: 2, width: w, marginBottom: 3 }} />)}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 3, padding: '10px 8px 10px 14px' }}>
            {[['EXPERIENCE', '95%'], ['EDUCATION', '70%']].map(([l, w]) => (
              <div key={l} style={{ marginBottom: 9 }}>
                <div style={{ fontSize: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#9ca3af', borderBottom: '1.5px solid #111827', paddingBottom: 2, marginBottom: 4 }}>{l}</div>
                <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, marginBottom: 2 }} />
                <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, width: w }} />
              </div>
            ))}
          </div>
          <div style={{ flex: 2, padding: 10, borderLeft: '1px solid #f3f4f6' }}>
            {[['SKILLS', 80], ['LANGUAGES', 60]].map(([l, w]) => (
              <div key={l} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#9ca3af', borderBottom: '1.5px solid #111827', paddingBottom: 2, marginBottom: 4 }}>{l}</div>
                <div style={{ height: 3, background: '#f3f4f6', borderRadius: 99 }} />
                <div style={{ height: 2, background: '#374151', borderRadius: 99, width: `${w}%`, marginTop: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
]

export default function TemplateSelector({ selected, onSelect }) {
  const { t } = useTranslation();

  return (
    <div className="cvb-template-grid">
      {TEMPLATES.map(({ id, name, desc, Preview }) => (
        <button key={id} onClick={() => onSelect(id)} className="cvb-template-btn">
          <div
            className="cvb-template-preview-wrap"
            style={{
              border: selected === id ? '2.5px solid var(--primary)' : '2px solid var(--border)',
              boxShadow: selected === id ? '0 0 0 3px rgba(61,191,138,0.15)' : 'none',
            }}
          >
            <div style={{ transform: 'scale(1)', transformOrigin: 'top left', width: 360, height: 480 }}>
              <Preview />
            </div>
            {selected === id && (
              <div className="cvb-template-check">
                <Check size={12} color="#fff" strokeWidth={3} />
              </div>
            )}
          </div>
          <div>
            <div className="cvb-template-name" style={{ color: selected === id ? 'var(--primary)' : 'var(--text)' }}>{name}</div>
            <div className="cvb-template-desc">{desc}</div>
          </div>
        </button>
      ))}
    </div>
  )
}