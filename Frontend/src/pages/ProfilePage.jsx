// pages/ProfilePage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import ProfileImage from "../components/ProfileImage";
import ProfileProgress from "../components/ProfileProgress";
import ProfileForm from "../components/ProfileForm";
import { validateProfile } from "../utils/profileValidation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FIELD_KEYS = ["firstName", "lastName", "email", "phone", "age", "nationality", "city"];

function calcProgress(data) {
  const filled = FIELD_KEYS.filter((k) => String(data[k] || "").trim() !== "").length;
  return Math.round((filled / FIELD_KEYS.length) * 100);
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, loading, error, success, fetchMyInfo, updateProfile, clearState, removeAccount } = useUser();

  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("images/default-avatar.jpeg");
  const [cvFile, setCvFile] = useState(null);
  const [localImage, setLocalImage] = useState(null);

  // ── Fetch user info on mount ───────────────────────────────────────────
  useEffect(() => {
    fetchMyInfo();
  }, []);

  // ── Sync Redux profile → local form ───────────────────────────────────
  useEffect(() => {
    if (!profile) return;
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      age: profile.age || "",
      nationality: profile.nationality || "",
      city: profile.city || "",
    });
    if (profile.profileImage) setProfileImage(profile.profileImage);
  }, [profile]);

  // ── Success / error feedback ───────────────────────────────────────────
  useEffect(() => {
    if (success) {
      toast.success("Profile Updated Successfully!");
      clearState();
    }
  }, [success]);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleFieldChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleImageChange = (base64) => {
    setLocalImage(base64);
    setProfileImage(base64);
  };

  const handleCvChange = (e) => setCvFile(e.target.files[0] || null);

  const handleSave = () => {
    const userDto = { ...formData };
    if (localImage) userDto.profileImage = localImage;

    const { isValid, errors } = validateProfile(userDto);

    if (!isValid) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    updateProfile(userDto, cvFile);
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your account? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a9e8f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        Swal.fire({
          title: "Deleting account...",
          text: "Please wait",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await removeAccount();

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        await Swal.fire({
          title: "Deleted!",
          text: "See you soon 👋",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        navigate("/register");
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err || "Failed to delete account",
          icon: "error",
        });
      }
    });
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="profile-page-wrapper">
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col-lg-12">

              <div className="bg-white shadow-sm rounded-4 p-4 p-lg-5 border border-light">

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom gap-3">
                  <h3 className="fw-bold mb-0 text-dark">Your Profile</h3>

                  <button
                    type="button"
                    className="btn btn-outline-danger rounded-pill px-4 fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={handleDeleteAccount}
                  >
                    <i className="fa-solid fa-user-xmark"></i>
                    Delete Account
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger rounded-3 border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
                    <i className="fa-solid fa-circle-exclamation fs-5 me-2"></i>
                    {error}
                  </div>
                )}

                <div className="row g-5">
                  <div className="col-md-4 d-flex flex-column align-items-center border-end-md border-light">
                    <ProfileImage src={profileImage} onImageChange={handleImageChange} />
                    <ProfileProgress percent={calcProgress(formData)} />
                  </div>

                  <div className="col-md-8">
                    <ProfileForm
                      formData={formData}
                      onChange={handleFieldChange}
                      onSave={handleSave}
                      onCvChange={handleCvChange}
                      loading={loading}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
