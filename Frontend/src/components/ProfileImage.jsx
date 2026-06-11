import { useTranslation } from "react-i18next";

export default function ProfileImage({ src, onImageChange }) {
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onImageChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-img-container mb-3">
      <img src={src} alt={t('profile.page_title')} />
      <label htmlFor="upload-img" className="btn-change-photo" title={t('profile.update_cv_label')}>
        <i className="fa-solid fa-camera"></i>
      </label>
      <input 
        type="file" 
        id="upload-img" 
        className="d-none" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
}