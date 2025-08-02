import AchievementSection from "../../../components/student/Academy/AchievementSection";
import AcademyForm from "../../../components/student/Academy/AcademyForm";
import AddCertificateButton from "../../../components/student/Academy/AddCertificateButton";
import CertificateCard from "../../../components/student/Academy/CertificateCard";

// Nếu CSS cần import vào đây:
import "../../../components/student/Academy/AchievementSection.css";
import "../../../components/student/Academy/CertificateCard.css";

export const Academy1 = () => {
  return (
    <>
          <AchievementSection />
          <AddCertificateButton />
          <CertificateCard />
          <AcademyForm />
      <h2>This is academy page</h2>
    </>
  );
};
