import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Loader2, LayoutTemplate, Target, Eye, EyeOff, Download } from 'lucide-react'
import { cvService, pdfService } from '../services/api'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCV, updateField, markSaved, resetCV } from '../store/slices/cvBuilderSlice'
import { useTranslation } from "react-i18next";
import CVForm           from '../components/cv/CVForm'
import CVPreview        from '../components/cv/CVPreview'
import ATSPanel         from '../components/ats/ATSPanel'
import TemplateSelector from '../components/templates/TemplateSelector'
import toast from 'react-hot-toast'

export default function CVEditorPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const RIGHT_TABS = [
    { id: 'preview',   label: t('example_cv.preview_btn'),   icon: Eye },
    { id: 'templates', label: t('nav_pills.tabs.plans'), icon: LayoutTemplate },
  ]

  const EMPTY_CV = {
    title: 'My CV', fullName: '', jobTitle: '', email: '', phone: '',
    location: '', summary: '', linkedIn: '', website: '',
    technicalSkills: [], softSkills: [], achievements: [],
    experiences: [], educations: [], projects: [], certifications: [], languages: [],
  }

  const currentCV = useSelector((state) => state.cvBuilder.currentCV)
  const isDirty   = useSelector((state) => state.cvBuilder.isDirty)

  const [loading,     setLoading]     = useState(!!id)
  const [saving,      setSaving]      = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [rightTab,    setRightTab]    = useState('preview')
  const [template,    setTemplate]    = useState('classic')
  const [showRight,   setShowRight]   = useState(true)

  const isNew = !id

  useEffect(() => {
    if (id) {
      cvService.getById(id)
        .then(data => dispatch(setCurrentCV({ ...EMPTY_CV, ...data })))
        .catch(() => { toast.error(t('dashboard.load_error')); navigate('/dashboard') })
        .finally(() => setLoading(false))
    } else {
      dispatch(resetCV())
      dispatch(setCurrentCV({ ...EMPTY_CV }))
    }
    return () => dispatch(resetCV())
  }, [id])

  const sanitizeCV = (cv) => ({
    ...cv,
    technicalSkills: cv.technicalSkills || [],
    softSkills:      cv.softSkills      || [],
    achievements:    cv.achievements    || [],
    experiences:    (cv.experiences     || []).map(e => ({ company: e.company||'', position: e.position||'', startDate: e.startDate||'', endDate: e.endDate||'', description: e.description||'', current: e.current||false })),
    educations:     (cv.educations      || []).map(e => ({ institution: e.institution||'', degree: e.degree||'', field: e.field||'', startDate: e.startDate||'', endDate: e.endDate||'', grade: e.grade||'' })),
    projects:       (cv.projects        || []).map(p => ({ name: p.name||'', description: p.description||'', url: p.url||'', techs: p.techs||[] })),
    certifications: (cv.certifications  || []).map(c => ({ name: c.name||'', issuer: c.issuer||'', date: c.date||'', url: c.url||'' })),
    languages:      (cv.languages       || []).map(l => ({ name: l.name||'', level: l.level||'Fluent' })),
  })

  const handleSave = async () => {
    if (!currentCV?.title?.trim()) { toast.error('Please add a CV title'); return }
    setSaving(true)
    try {
      const payload = sanitizeCV(currentCV)
      if (isNew) {
        const saved = await cvService.create(payload)
        dispatch(markSaved())
        toast.success(t('profile.update_success'))
        navigate(`/cv-builder/${saved.id}/edit`, { replace: true })
      } else {
        await cvService.update(id, payload)
        dispatch(markSaved())
        toast.success('CV saved!')
      }
    } catch (err) {
      toast.error('Failed to save: ' + (err.response?.data?.message || err.message))
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!currentCV?.fullName) { toast.error('Please fill in your name before downloading'); return }
    setDownloading(true)
    try {
      await pdfService.download(sanitizeCV(currentCV), template)
      toast.success('PDF downloaded!')
    } catch {
      toast.error("PDF Service error")
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return (
    <div className="cvb-loading-center" style={{ height: '100vh' }}>
      <Loader2 size={28} className="cvb-spin" style={{ color: 'var(--primary)' }} />
    </div>
  )

  return (
    <div className="cvb-editor">
      <div className="cvb-editor-topbar">
        <button onClick={() => navigate('/cv-builder')} className="cvb-btn-ghost-back">
          <ArrowLeft size={15} /> {t('interview_home.btn_back')}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            type="text"
            value={currentCV?.title || ''}
            onChange={e => dispatch(updateField({ field: 'title', value: e.target.value }))}
            className="cvb-input transparent"
            style={{ fontWeight: 600 }}
            placeholder="Untitled CV"
          />
          {isDirty && <div className="cvb-unsaved">● Unsaved changes</div>}
        </div>

        <button onClick={() => setShowRight(!showRight)} className="cvb-btn-ghost">
          {showRight ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

        <button onClick={handleDownloadPDF} disabled={downloading} className="cvb-btn-outline">
          {downloading ? <Loader2 size={14} className="cvb-spin" /> : <Download size={14} />}
          PDF
        </button>

        <button onClick={handleSave} disabled={saving} className="cvb-btn-primary">
          {saving ? <Loader2 size={14} className="cvb-spin" /> : <Save size={14} />}
          {isNew ? t('interview_page.btn_retry') : t('profile.save_changes_btn')}
        </button>
      </div>

      <div className="cvb-editor-body">
        <div className="cvb-form-panel" style={{ width: showRight ? '46%' : '100%' }}>
          <CVForm />
        </div>

        {showRight && (
          <div className="cvb-right-panel">
            <div className="cvb-right-tabs">
              {RIGHT_TABS.map(({ id: tid, label, icon: Icon }) => (
                <button key={tid} onClick={() => setRightTab(tid)} className={`cvb-tab-btn ${rightTab === tid ? 'active' : ''}`}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            <div className="cvb-right-content">
              {rightTab === 'preview' && (
                <div className="cvb-right-scroll">
                  <CVPreview template={template} />
                </div>
              )}
              {/* {rightTab === 'ats' && <ATSPanel />} */}
              {rightTab === 'templates' && (
                <div className="cvb-right-scroll" style={{ padding: 24 }}>
                  <div className="cvb-ats-section-title">Choose Template</div>
                  <TemplateSelector selected={template} onSelect={(t) => { setTemplate(t); setRightTab('preview') }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}