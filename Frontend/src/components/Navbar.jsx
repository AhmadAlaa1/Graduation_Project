import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../store/slices/authSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a9e8f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");

        Swal.fire({
          title: "Logged out!",
          text: "See you soon 👋",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="fixed-top w-100" style={{ zIndex: 1030 }}>
      <div className="container">
        <nav
          className={`navbar navbar-expand-lg bg-white rounded-pill px-3 py-2 border transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
          style={{ transition: 'all 0.3s ease' }}
        >
          <div className="container-fluid p-0">

            <a className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark ms-2" href="/">
              <div className="d-flex align-items-center justify-content-center rounded-circle me-2 navbar-brand-icon">
                <i className="fa-solid fa-microphone-lines fs-6"></i>
              </div>
              Speak<span className="text-brand">2</span>hire
            </a>

            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
            >
              <i className="fa-solid fa-bars fs-3 text-brand"></i>
            </button>

            {/* الكود ده بيبدأ من أول الـ collapse div */}
            <div className="collapse navbar-collapse mobile-menu-dropdown" id="mainNavbar">

              {/* شيلنا text-center وخليناها text-start */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-0 gap-lg-3 fw-medium text-start mt-2 mt-lg-0 px-2 px-lg-0">
                <li className="nav-item">
                  <a className="nav-link active mobile-nav-link" href="#">Home</a>
                </li>
                <li className="nav-item"><a className="nav-link mobile-nav-link" href="#">About</a></li>
                <li className="nav-item"><a className="nav-link mobile-nav-link" href="#">Services</a></li>
                <li className="nav-item"><a className="nav-link mobile-nav-link" href="#">Blog</a></li>
                <li className="nav-item"><a className="nav-link mobile-nav-link" href="#">Pages</a></li>
                <li className="nav-item"><a className="nav-link mobile-nav-link" href="#">Contact</a></li>
              </ul>

              {/* فاصل بصري بيظهر في الموبايل بس */}
              <hr className="d-lg-none text-secondary opacity-25 my-3" />

              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-2 mt-lg-0 pb-2 pb-lg-0 me-lg-2 px-2 px-lg-0 text-start">
                {token ? (
                  <>
                    {user && (
                      <div className="text-nowrap mb-1 mb-lg-0">
                        <span className="text-secondary me-1">Hi,</span>
                        <span className="fw-bold text-dark text-capitalize">{user.firstName}</span>
                      </div>
                    )}
                    <button
                      className="btn btn-light rounded-pill px-4 fw-semibold border w-100 w-lg-auto"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>
                    <button
                      className="btn rounded-pill px-4 fw-semibold w-100 w-lg-auto btn-brand"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="btn rounded-pill px-5 fw-semibold w-100 w-lg-auto btn-brand"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;