import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { scoreCV, scoreLabel } from '../../services/atsEngine'
import { useTranslation } from "react-i18next";
import {
  CheckCircle2, XCircle, AlertCircle, Info,
  Zap, Tag, ChevronRight, TrendingUp
} from 'lucide-react'

/* ── Circular progress ── */
function ScoreRing({ score, color }) {
  const r = 52
  const c = 2 * Math.PI * r
  const pct = (score / 100) * c
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#f0f0f0" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r}
        fill="none" stroke={color} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${pct} ${c}`}
        transform="rotate(-90 65 65)"
        style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)' }}
      />
      <text x="65" y="60" textAnchor="middle" fontSize="26" fontWeight="700"
        fill={color} fontFamily="var(--font-display)">{score}</text>
      <text x="65" y="76" textAnchor="middle" fontSize="11" fill="#9ca3af"
        fontWeight="600" letterSpacing="0.5">/ 100</text>
    </svg>
  )
}

/* ── Suggestion Item ── */
function SuggestionItem({ text, type }) {
  const iconMap = {
    success: { Icon: CheckCircle2, color: '#10b981', bg: '#f0fdf4' },
    warning: { Icon: AlertCircle,  color: '#f59e0b', bg: '#fffbeb' },
    error:   { Icon: XCircle,      color: '#ef4444', bg: '#fef2f2' },
  }
  const cfg = iconMap[type] || { Icon: Info, color: '#6b7280', bg: '#f9fafb' }

  return (
    <li className="cvb-suggestion-item" style={{ background: cfg.bg }}>
      <cfg.Icon size={14} style={{ color: cfg.color, marginTop: 2, flexShrink: 0 }} />
      <span style={{ color: 'var(--text-color)' }}>{text}</span>
    </li>
  )
}

/* ── Keyword Group ── */
function KeywordGroup({ label, words = [], icon: Icon, color }) {
  if (!words || !words.length) return null
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="cvb-keyword-group-label">
        <Icon size={11} style={{ color }} /> {label}
      </div>
      <div className="cvb-keyword-pills">
        {words.map(w => (
          <span key={w} className="cvb-keyword-pill" style={{ background: `${color}15`, color }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ATSPanel() {
  const currentCV = useSelector((state) => state.cvBuilder.currentCV)
  const { t } = useTranslation();

  // ✅ تأمين التفكيك بإضافة قيم افتراضية فارغة لمنع الـ Uncaught TypeError
  const { 
    score = 0, 
    suggestions = [], 
    keywords = { powerVerbs: [], techKeywords: [], softSkills: [] }, 
    breakdown = [] 
  } = useMemo(() => {
    return scoreCV(currentCV || {}) || {}
  }, [currentCV])

  const label = scoreLabel(score)
  
  const labelText = useMemo(() => {
    if (label === 'Excellent') return t('ats_panel.score_desc_high');
    if (label === 'Good') return t('ats_panel.score_desc_good');
    if (label === 'Fair') return t('ats_panel.score_desc_mid');
    return t('ats_panel.score_desc_low');
  }, [label, t]);

  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444'
  
  // ✅ تأمين التحقق من المصفوفات بداخل كائن الـ keywords
  const noKeywords = !keywords?.powerVerbs?.length && !keywords?.techKeywords?.length && !keywords?.softSkills?.length

  const categories = {
    contact:  'Contact Info',
    summary:  'Professional Summary',
    skills:   'Skills Section',
    work:     'Work Experience',
    edu:      'Education History',
    projects: 'Projects Section'
  }

  // ✅ تأمين الـ .forEach للتأكد من أنها تدور حول مصفوفة صالحة دائماً
  const grouped = useMemo(() => {
    const res = {}
    if (!Array.isArray(breakdown)) return res;
    
    breakdown.forEach(item => {
      if (item && item.category) {
        if (!res[item.category]) res[item.category] = []
        res[item.category].push(item)
      }
    })
    return res
  }, [breakdown])

  return (
    <div className="cvb-ats-wrap cvb-fade-in">
      
      {/* Score Ring */}
      <div className="cvb-ats-card" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px' }}>
        <ScoreRing score={score} color={color} />
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: 4 }}>
            {t('ats_panel.score_label')}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
            {labelText}
          </p>
        </div>
      </div>

      {/* Improvements */}
      {suggestions && suggestions.length > 0 && (
        <div className="cvb-ats-card">
          <div className="cvb-ats-section-title">
            <Zap size={12} style={{ color: 'var(--primary)' }} /> {t('ats_panel.improvements_title')}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {suggestions.map((s, i) => <SuggestionItem key={i} {...s} />)}
          </ul>
        </div>
      )}

      {/* Keywords */}
      <div className="cvb-ats-card">
        <div className="cvb-ats-section-title">
          <Tag size={12} style={{ color: 'var(--primary)' }} /> {t('ats_panel.keywords_title')}
        </div>
        <KeywordGroup label={t('ats_panel.keyword_groups.action_verbs')} icon={ChevronRight} words={keywords?.powerVerbs} color="var(--primary)" />
        <KeywordGroup label={t('ats_panel.keyword_groups.tech_keywords')} icon={ChevronRight} words={keywords?.techKeywords} color="#2563eb" />
        <KeywordGroup label={t('ats_panel.keyword_groups.soft_skills')} icon={ChevronRight} words={keywords?.softSkills} color="#7c3aed" />
        {noKeywords && (
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', padding: '8px 0' }}>
            {t('ats_panel.no_keywords')}
          </p>
        )}
      </div>

      {/* Score Breakdown */}
      <div className="cvb-ats-card">
        <div className="cvb-ats-section-title">{t('ats_panel.score_breakdown_title')}</div>
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: 12 }}>
            <div className="cvb-check-cat">{categories[cat] || cat}</div>
            {items && items.map((item, idx) => (
              <div key={idx} className="cvb-check-row">
                <div className="cvb-check-left">
                  {item.pass ? <CheckCircle2 size={13} color="#10b981" /> : <XCircle size={13} color="#ef4444" />}
                  <span style={{ color: item.pass ? 'var(--text-color)' : 'var(--muted)' }}>{item.name}</span>
                </div>
                <div className="cvb-check-pts" style={{ color: item.pass ? '#10b981' : '#ef4444' }}>
                  {item.pass ? `+${item.points}` : '0'} pts
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}