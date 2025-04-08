import { useEffect } from "react";
import Sidebar from "../Components/Sidebar";


const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="flex flex-col max-w-[70rem] gap-6 dark:bg-[#000D38] py-12 px-6 md:px-10 mx-auto flex-1 rounded-xl border dark:border-[#00387E] dark:text-white text-lg leading-8">
        <h1 className="text-4xl font-bold font-poppins mb-4">Terms and Conditions</h1>

        <p className="text-lg"><strong>Last Updated:</strong> April 04, 2025</p>

        <p>
          Welcome to Finraces! These Terms and Conditions ("Terms") govern your access to and use of the Finraces website,
          platform, and services (collectively, the "Service") provided by Finraces ("we," "us," or "our").
          By accessing or using the Service, you agree to be bound by these Terms.
          If you do not agree with these Terms, please do not use the Service.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">1. Eligibility</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Be at least 18 years of age or the age of majority in your jurisdiction.</li>
          <li>Provide accurate and complete registration information.</li>
          <li>Agree to comply with these Terms and all applicable laws.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">2. Account Registration and Security</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Account Creation:</strong> Register with a valid email or phone number and create a secure password. You may also use Google or Facebook to sign up.</li>
          <li><strong>Account Responsibility:</strong> You are responsible for keeping your credentials secure. Contact <a href="mailto:support@finraces.com" className="text-blue-400 underline">support@finraces.com</a> if you suspect unauthorized activity.</li>
          <li><strong>2FA:</strong> Optional or required two-factor authentication may be enforced for additional security.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">3. Use of the Service</h2>
        <p>You agree to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Use the Service only for lawful purposes.</li>
          <li>Not engage in cheating, manipulation, or disrupt fairness of races.</li>
          <li>Not upload or share illegal, harmful, or infringing content.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">4. Race Participation and Creation</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Joining Races:</strong> Submit predictions before lock time (15 minutes prior to race start).</li>
          <li><strong>Creating Races:</strong> Provide name, schedule, and stock list. Private races require invite links.</li>
          <li><strong>Points and Rankings:</strong> Based on accuracy and volatility. Results are displayed publicly.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">5. Intellectual Property</h2>
        <ul className="list-disc list-inside ml-4">
          <li>All Service content and features are owned by Finraces or its licensors.</li>
          <li>By submitting content, you grant Finraces rights to use and display it for Service operations.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">6. Privacy</h2>
        <p>
          Your use of the Service is governed by our <a href="/policy" className="text-blue-400 underline">Privacy Policy</a>, which explains how we handle your data.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">7. Market Research and Stock Data</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Data is for informational and entertainment purposes only, not investment advice.</li>
          <li>We do not guarantee accuracy or reliability of stock data.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">8. Cheating Prevention</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Prediction locking enforces fairness.</li>
          <li>We log data to detect suspicious patterns.</li>
          <li>Accounts may be flagged or penalized for violations.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">9. User Conduct</h2>
        <ul className="list-disc list-inside ml-4">
          <li>No bots or automated tools allowed.</li>
          <li>No harassment, impersonation, or security breaches.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">10. Termination</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>By You:</strong> Delete your account anytime from Settings.</li>
          <li><strong>By Us:</strong> We may suspend or terminate accounts for violations or at our discretion.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">11. Disclaimers</h2>
        <ul className="list-disc list-inside ml-4">
          <li>The Service is provided "as is" with no warranties.</li>
          <li>We are not liable for losses related to race outcomes or stock data.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">12. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Finraces and its affiliates shall not be liable for any indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">13. Indemnification</h2>
        <p>
          You agree to indemnify Finraces against any losses or claims from your use of the Service or violations of these Terms.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">14. Modifications</h2>
        <ul className="list-disc list-inside ml-4">
          <li>We may update or discontinue parts of the Service at any time.</li>
          <li>We may revise these Terms; continued use means acceptance of changes.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">15. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the United States, without regard to conflict of law principles.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">16. Contact Us</h2>
        <p>
          📧 <a href="mailto:support@finraces.com" className="text-blue-400 underline">support@finraces.com</a><br />
          📝 Reach out via the “Help and Support” section in Settings.
        </p>
      </div>
    </div>
  );
};

export default Terms;
