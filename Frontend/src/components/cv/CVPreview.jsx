import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import TemplateClassic   from '../templates/TemplateClassic'
import TemplateModern    from '../templates/TemplateModern'
import TemplateMinimal   from '../templates/TemplateMinimal'
import TemplateExecutive from '../templates/TemplateExecutive'

const TEMPLATES = {
  classic:   TemplateClassic,
  modern:    TemplateModern,
  minimal:   TemplateMinimal,
  executive: TemplateExecutive,
}

export default function CVPreview({ template = 'classic' }) {
  const cv = useSelector((state) => state.cvBuilder.currentCV)
  const { t } = useTranslation();
  
  if (!cv) return null

  const Template   = TEMPLATES[template] || TemplateClassic
  const hasContent = cv.fullName || cv.email || cv.summary

  return (
    <div className="cvb-preview-wrap">
      <div className="cvb-preview-card">
        {hasContent
          ? <Template cv={cv} />
          : (
            <div className="cvb-preview-empty">
              {t('cv_preview.empty_preview_text', 'Fill in the form to see your CV preview')}
            </div>
          )
        }
      </div>
    </div>
  )
}