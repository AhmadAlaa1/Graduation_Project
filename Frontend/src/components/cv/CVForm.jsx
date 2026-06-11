import { useState } from 'react'
import { useTranslation } from "react-i18next";
import {
  User, Briefcase, GraduationCap,
  ChevronDown, ChevronUp, Plus, Trash2,
  Award, Globe2, FolderGit2, Trophy, Code2, Brain
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../../store/slices/cvBuilderSlice'

/* ── Collapsible Section ── */
function Section({ icon: Icon, title, children, defaultOpen = true, badge }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="cvb-form-section">
      <button className="cvb-section-toggle" onClick={() => setOpen(!open)}>
        <div className="cvb-section-toggle-left">
          <Icon size={15} style={{ color: 'var(--primary)' }} />
          <span className="cvb-section-title">{title}</span>
          {badge !== undefined && badge !== null && (
            <span className="cvb-section-badge">{badge}</span>
          )}
        </div>
        {open
          ? <ChevronUp size={14} style={{ color: 'var(--muted)' }} />
          : <ChevronDown size={14} style={{ color: 'var(--muted)' }} />
        }
      </button>
      {open && <div className="cvb-section-body">{children}</div>}
    </div>
  )
}

/* ── Field ── */
function Field({ label, children, full = false }) {
  return (
    <div className={full ? 'cvb-field-full' : ''}>
      <label className="cvb-label">{label}</label>
      {children}
    </div>
  )
}

export default function CVForm() {
  const dispatch = useDispatch()
  const currentCV = useSelector((state) => state.cvBuilder.currentCV)
  const { t } = useTranslation();

  if (!currentCV) return null

  const setVal = (field, value) => {
    dispatch(updateField({ field, value }))
  }

  const listAdd = (field, emptyItem) => {
    const arr = [...(currentCV[field] || [])]
    arr.push(emptyItem)
    setVal(field, arr)
  }

  const listRemove = (field, idx) => {
    const arr = [...(currentCV[field] || [])]
    arr.splice(idx, 1)
    setVal(field, arr)
  }

  const itemUpdate = (field, idx, subField, val) => {
    const arr = (currentCV[field] || []).map((item, i) => {
      if (i === idx) return { ...item, [subField]: val }
      return item
    })
    setVal(field, arr)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Personal Info */}
      <Section icon={User} title={t('profile.page_title')} defaultOpen={true}>
        <div className="cvb-grid-2">
          <Field label={t('profile.fields.firstName')}>
            <input className="cvb-input" value={currentCV.fullName || ''} onChange={e => setVal('fullName', e.target.value)} placeholder="John Doe" />
          </Field>
          <Field label="Job Title">
            <input className="cvb-input" value={currentCV.jobTitle || ''} onChange={e => setVal('jobTitle', e.target.value)} placeholder="Full Stack Developer" />
          </Field>
          <Field label={t('profile.fields.email')}>
            <input className="cvb-input" type="email" value={currentCV.email || ''} onChange={e => setVal('email', e.target.value)} placeholder="john@example.com" />
          </Field>
          <Field label={t('profile.fields.phone')}>
            <input className="cvb-input" value={currentCV.phone || ''} onChange={e => setVal('phone', e.target.value)} placeholder="+1 234 567 890" />
          </Field>
          <Field label={t('profile.fields.city')}>
            <input className="cvb-input" value={currentCV.location || ''} onChange={e => setVal('location', e.target.value)} placeholder="New York, NY" />
          </Field>
          <Field label="LinkedIn URL">
            <input className="cvb-input" value={currentCV.linkedIn || ''} onChange={e => setVal('linkedIn', e.target.value)} placeholder="linkedin.com/in/username" />
          </Field>
          <Field label="Website / Portfolio" full={true}>
            <input className="cvb-input" value={currentCV.website || ''} onChange={e => setVal('website', e.target.value)} placeholder="github.com/username" />
          </Field>
          <Field label="Professional Summary" full={true}>
            <textarea className="cvb-input cvb-textarea" value={currentCV.summary || ''} onChange={e => setVal('summary', e.target.value)} placeholder="Experienced engineer specializing in..." />
          </Field>
        </div>
      </Section>

      {/* 2. Work Experience */}
      <Section icon={Briefcase} title="Work Experience" badge={(currentCV.experiences||[]).length||null} defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(currentCV.experiences||[]).map((exp, idx) => (
            <div key={idx} className="cvb-item-card">
              <button onClick={() => listRemove('experiences', idx)} className="cvb-item-remove">
                <Trash2 size={13} />
              </button>
              <div className="cvb-grid-2">
                <Field label="Company">
                  <input className="cvb-input" value={exp.company||''} onChange={e => itemUpdate('experiences', idx, 'company', e.target.value)} placeholder="Google" />
                </Field>
                <Field label="Position">
                  <input className="cvb-input" value={exp.position||''} onChange={e => itemUpdate('experiences', idx, 'position', e.target.value)} placeholder="Software Engineer" />
                </Field>
                <Field label="Start Date">
                  <input className="cvb-input" value={exp.startDate||''} onChange={e => itemUpdate('experiences', idx, 'startDate', e.target.value)} placeholder="Jan 2022" />
                </Field>
                <Field label="End Date">
                  <input className="cvb-input" value={exp.endDate||''} disabled={exp.current} onChange={e => itemUpdate('experiences', idx, 'endDate', e.target.value)} placeholder="Present" />
                </Field>
                <div className="cvb-field-full">
                  <label className="cvb-checkbox-row">
                    <input type="checkbox" checked={exp.current||false} onChange={e => itemUpdate('experiences', idx, 'current', e.target.checked)} />
                    <span>I currently work here</span>
                  </label>
                </div>
                <Field label="Description" full={true}>
                  <textarea className="cvb-input cvb-textarea" value={exp.description||''} onChange={e => itemUpdate('experiences', idx, 'description', e.target.value)} placeholder="Led development of..." />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => listAdd('experiences', { company:'', position:'', startDate:'', endDate:'', description:'', current:false })} className="cvb-btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          <Plus size={15} /> Add Experience
        </button>
      </Section>

      {/* 3. Education */}
      <Section icon={GraduationCap} title="Education" badge={(currentCV.educations||[]).length||null} defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(currentCV.educations||[]).map((edu, idx) => (
            <div key={idx} className="cvb-item-card">
              <button onClick={() => listRemove('educations', idx)} className="cvb-item-remove">
                <Trash2 size={13} />
              </button>
              <div className="cvb-grid-2">
                <Field label="School / University">
                  <input className="cvb-input" value={edu.institution||''} onChange={e => itemUpdate('educations', idx, 'institution', e.target.value)} placeholder="MIT" />
                </Field>
                <Field label="Degree">
                  <input className="cvb-input" value={edu.degree||''} onChange={e => itemUpdate('educations', idx, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                </Field>
                <Field label="Field of Study">
                  <input className="cvb-input" value={edu.field||''} onChange={e => itemUpdate('educations', idx, 'field', e.target.value)} placeholder="Computer Science" />
                </Field>
                <Field label="Grade / GPA">
                  <input className="cvb-input" value={edu.grade||''} onChange={e => itemUpdate('educations', idx, 'grade', e.target.value)} placeholder="3.8 / 4.0" />
                </Field>
                <Field label="Start Date">
                  <input className="cvb-input" value={edu.startDate||''} onChange={e => itemUpdate('educations', idx, 'startDate', e.target.value)} placeholder="Sep 2018" />
                </Field>
                <Field label="End Date">
                  <input className="cvb-input" value={edu.endDate||''} onChange={e => itemUpdate('educations', idx, 'endDate', e.target.value)} placeholder="May 2022" />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => listAdd('educations', { institution:'', degree:'', field:'', startDate:'', endDate:'', grade:'' })} className="cvb-btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          <Plus size={15} /> Add Education
        </button>
      </Section>

      {/* 4. Technical Skills */}
      <Section icon={Code2} title={t('dashboard.stats.total_cvs')} badge={(currentCV.technicalSkills||[]).length||null} defaultOpen={false}>
        <div className="cvb-pills">
          {(currentCV.technicalSkills||[]).map((sk, idx) => (
            <span key={idx} className="cvb-pill" onClick={() => listRemove('technicalSkills', idx)}>
              {sk} &times;
            </span>
          ))}
        </div>
        <input
          className="cvb-input"
          placeholder="Type a skill and press Enter (e.g., React, Node.js)"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              const arr = [...(currentCV.technicalSkills||[])]
              if(!arr.includes(e.target.value.trim())) {
                arr.push(e.target.value.trim())
                setVal('technicalSkills', arr)
              }
              e.target.value = ''
            }
          }}
        />
      </Section>

      {/* 5. Soft Skills */}
      <Section icon={Brain} title="Soft Skills" badge={(currentCV.softSkills||[]).length||null} defaultOpen={false}>
        <div className="cvb-pills">
          {(currentCV.softSkills||[]).map((sk, idx) => (
            <span key={idx} className="cvb-pill purple" onClick={() => listRemove('softSkills', idx)}>
              {sk} &times;
            </span>
          ))}
        </div>
        <input
          className="cvb-input"
          placeholder="Type soft skill and press Enter (e.g., Leadership, Communication)"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              const arr = [...(currentCV.softSkills||[])]
              if(!arr.includes(e.target.value.trim())) {
                arr.push(e.target.value.trim())
                setVal('softSkills', arr)
              }
              e.target.value = ''
            }
          }}
        />
      </Section>

      {/* 6. Certifications */}
      <Section icon={Award} title="Certifications" badge={(currentCV.certifications||[]).length||null} defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(currentCV.certifications||[]).map((cert, idx) => (
            <div key={idx} className="cvb-item-card">
              <button onClick={() => listRemove('certifications', idx)} className="cvb-item-remove">
                <Trash2 size={13} />
              </button>
              <div className="cvb-grid-2">
                <Field label="Certification Name">
                  <input className="cvb-input" value={cert.name||''} onChange={e => itemUpdate('certifications', idx, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                </Field>
                <Field label="Issuing Organization">
                  <input className="cvb-input" value={cert.issuer||''} onChange={e => itemUpdate('certifications', idx, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                </Field>
                <Field label="Issue Date">
                  <input className="cvb-input" value={cert.date||''} onChange={e => itemUpdate('certifications', idx, 'date', e.target.value)} placeholder="Mar 2023" />
                </Field>
                <Field label="Credential URL">
                  <input className="cvb-input" value={cert.url||''} onChange={e => itemUpdate('certifications', idx, 'url', e.target.value)} placeholder="https://..." />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => listAdd('certifications', { name:'', issuer:'', date:'', url:'' })} className="cvb-btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          <Plus size={15} /> Add Certification
        </button>
      </Section>

      {/* 7. Projects */}
      <Section icon={FolderGit2} title="Projects" badge={(currentCV.projects||[]).length||null} defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(currentCV.projects||[]).map((proj, idx) => (
            <div key={idx} className="cvb-item-card">
              <button onClick={() => listRemove('projects', idx)} className="cvb-item-remove">
                <Trash2 size={13} />
              </button>
              <div className="cvb-grid-2">
                <Field label="Project Name">
                  <input className="cvb-input" value={proj.name||''} onChange={e => itemUpdate('projects', idx, 'name', e.target.value)} placeholder="E-Commerce App" />
                </Field>
                <Field label="Project URL">
                  <input className="cvb-input" value={proj.url||''} onChange={e => itemUpdate('projects', idx, 'url', e.target.value)} placeholder="https://github.com/..." />
                </Field>
                <Field label="Description" full={true}>
                  <textarea className="cvb-input cvb-textarea" value={proj.description||''} onChange={e => itemUpdate('projects', idx, 'description', e.target.value)} placeholder="Built a fully functional..." />
                </Field>
                <div className="cvb-field-full">
                  <label className="cvb-label">Technologies Used</label>
                  <div className="cvb-pills">
                    {(proj.techs || []).map((tId, tIdx) => (
                      <span key={tIdx} className="cvb-pill" onClick={() => {
                        const nextTechs = [...(proj.techs || [])]
                        nextTechs.splice(tIdx, 1)
                        itemUpdate('projects', idx, 'techs', nextTechs)
                      }}>
                        {tId} &times;
                      </span>
                    ))}
                  </div>
                  <input
                    className="cvb-input"
                    placeholder="Type tech and press Enter (e.g. Next.js, PostgreSQL)"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const nextTechs = [...(proj.techs || [])]
                        if(!nextTechs.includes(e.target.value.trim())) {
                          nextTechs.push(e.target.value.trim())
                          itemUpdate('projects', idx, 'techs', nextTechs)
                        }
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => listAdd('projects', { name:'', description:'', url:'', techs:[] })} className="cvb-btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          <Plus size={15} /> Add Project
        </button>
      </Section>

      {/* 8. Achievements */}
      <Section icon={Trophy} title="Achievements" badge={(currentCV.achievements||[]).length||null} defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(currentCV.achievements||[]).map((ach, idx) => (
            <div key={idx} className="cvb-ach-row">
              <div className="cvb-ach-dot" />
              <input
                className="cvb-input"
                style={{ flex: 1 }}
                placeholder="Reduced deployment time by 60%..."
                value={ach}
                onChange={e => {
                  const arr = [...(currentCV.achievements||[])]
                  arr[idx] = e.target.value
                  setVal('achievements', arr)
                }}
              />
              <button
                onClick={() => listRemove('achievements', idx)}
                className="cvb-item-remove"
                style={{ position: 'static' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => listAdd('achievements', '')} className="cvb-btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={15} /> Add Achievement
        </button>
        <div className="cvb-hint">Each achievement should be specific and quantified!</div>
      </Section>

    </div>
  )
}