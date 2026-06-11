import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// ضفنا ArrowLeft هنا 👇
import { Plus, FileText, Trash2, Edit3, Clock, Loader2, Sparkles, ArrowLeft } from 'lucide-react'
import { cvService } from '../services/api'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../store/slices/authSlice'
import { setCVList } from '../store/slices/cvBuilderSlice'
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const cvList = useSelector((state) => state.cvBuilder.cvList)
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { fetchCVs() }, [])

  const fetchCVs = async () => {
    try {
      const res = await cvService.getAll()
      const data = Array.isArray(res) ? res : res?.data || res?.cvs || []
      dispatch(setCVList(data))
    } catch {
      toast.error(t('dashboard.load_error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm(t('dashboard.delete_confirm'))) return
    setDeletingId(id)
    try {
      await cvService.delete(id)
      dispatch(setCVList(cvList.filter(c => c.id !== id)))
      toast.success(t('dashboard.delete_success'))
    } catch {
      toast.error(t('dashboard.delete_error'))
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (d) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const firstName = user?.fullName?.split(' ')[0] || user?.firstName || 'there'

  const stats = [
    { label: t('dashboard.stats.total_cvs'), value: cvList.length, icon: FileText, color: '#35a388' },
    { label: t('dashboard.stats.ats_ready'), value: 0, icon: Sparkles, color: '#f59e0b' },
    { label: t('dashboard.stats.last_updated'), value: cvList.length ? formatDate(cvList[0]?.updatedAt || cvList[0]?.createdAt) : '—', icon: Clock, color: '#6366f1' },
  ]

  const getSubtitle = () => {
    if (cvList.length === 0) return t('dashboard.subtitle_empty');
    if (cvList.length === 1) return t('dashboard.subtitle_count_one', { count: 1 });
    return t('dashboard.subtitle_count_many', { count: cvList.length });
  };

  return (
    <div className="cvb-dashboard cvb-fade-up">


      <div className="cvb-dash-header">
        <div>
          {/* اسم المستخدم ومعه زرار العودة في نفس السطر */}
          <h1 className="cvb-dash-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/')}
              className="cvb-inline-back-btn"
              title={t('interview_home.btn_back')}
            >
              <ArrowLeft size={16} /> {/* صغرنا المقاس لـ 16 عشان يتماشى مع النص */}
              <span className="cvb-back-text">{t('interview_home.btn_back')}</span>
            </button>
            {t('dashboard.greeting', { name: firstName })}
          </h1>
          <p className="cvb-dash-subtitle" style={{ paddingLeft: i18n.language === 'ar' ? '0' : '48px', paddingRight: i18n.language === 'ar' ? '48px' : '0' }}>
            {getSubtitle()}
          </p>
        </div>

        <button onClick={() => navigate('/cv-builder/new')} className="cvb-btn-primary">
          <Plus size={16} /> {t('dashboard.btn_new_cv')}
        </button>
      </div>

      <div className="cvb-stats-row">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="cvb-stat-card">
            <div className="cvb-stat-icon" style={{ background: `${color}42` }}>
              <Icon size={15} style={{ color }} />
            </div>
            <div className="cvb-stat-info-block">
              <span className="cvb-stat-value">{value}</span>
              <span className="cvb-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="cvb-loading-center" style={{ minHeight: 200 }}>
          <Loader2 size={28} className="cvb-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : cvList.length === 0 ? (
        <div className="cvb-empty cvb-fade-in">
          <div className="cvb-empty-icon">
            <FileText size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="cvb-empty-title">{t('dashboard.empty_title')}</h3>
          <p className="cvb-empty-desc">{t('dashboard.empty_desc')}</p>
          <button onClick={() => navigate('/cv-builder/new')} className="cvb-btn-primary">
            <Plus size={16} /> {t('dashboard.btn_create_first')}
          </button>
        </div>
      ) : (
        <div className="cvb-cv-grid">
          {cvList.map((cv) => (
            <div
              key={cv.id}
              onClick={() => navigate(`/cv-builder/${cv.id}/edit`)}
              className="cvb-cv-card cvb-fade-up"
            >
              <div className="cvb-cv-card-header">
                <div className="cvb-cv-card-icon">
                  <FileText size={18} style={{ color: 'var(--primary)' }} />
                </div>
                <div className="cvb-cv-card-actions">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/cv-builder/${cv.id}/edit`) }}
                    className="cvb-icon-btn"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(cv.id, e)}
                    disabled={deletingId === cv.id}
                    className="cvb-icon-btn danger"
                  >
                    {deletingId === cv.id
                      ? <Loader2 size={14} className="cvb-spin" />
                      : <Trash2 size={14} />
                    }
                  </button>
                </div>
              </div>

              <div className="cvb-cv-card-body">
                <div className="cvb-cv-card-title">{cv.title}</div>
                {cv.fullName && <div className="cvb-cv-card-name">{cv.fullName}</div>}
              </div>

              <div className="cvb-cv-card-footer">
                <div className="cvb-tags">
                  {cv.technicalSkills && cv.technicalSkills.length > 0 ? (
                    <>
                      {cv.technicalSkills.slice(0, 2).map(s => (
                        <span key={s} className="cvb-tag">{s}</span>
                      ))}
                      {cv.technicalSkills.length > 2 && (
                        <span className="cvb-tag">+{cv.technicalSkills.length - 2}</span>
                      )}
                    </>
                  ) : (
                    <span className="cvb-tag" style={{ opacity: 0.6 }}>{t('dashboard.no_skills')}</span>
                  )}
                </div>
                <span className="cvb-date">
                  <Clock size={11} />
                  {formatDate(cv.updatedAt || cv.createdAt)}
                </span>
              </div>
            </div>
          ))}

          <button onClick={() => navigate('/cv-builder/new')} className="cvb-add-card cvb-fade-up">
            <div className="cvb-add-icon">
              <Plus size={20} style={{ color: 'var(--muted)' }} />
            </div>
            {t('dashboard.btn_new_cv')}
          </button>
        </div>
      )}
    </div>
  )
}