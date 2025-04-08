import { useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const Policy = () => {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="flex flex-col max-w-[70rem] gap-6 dark:bg-[#000D38] py-12 px-6 md:px-10 mx-auto flex-1 rounded-xl border dark:border-[#00387E] dark:text-white text-lg leading-8">
        <h1 className="text-4xl font-bold font-poppins mb-4">
          Privacy Policy
        </h1>

        <p className="text-lg"><strong>Last Updated:</strong> April 04, 2025</p>

        <p className="text-lg">
          At Finraces (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;), we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your
          personal information when you use our website, platform, and services (collectively, the "Service").
        </p>

        <p className="text-lg">
          By using the Service, you consent to the practices described in this Privacy Policy.
          If you do not agree, please do not use the Service.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">1. Information We Collect</h2>

        <h3 className="text-2xl font-semibold mt-6">a. Information You Provide</h3>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li><strong>Account Registration:</strong> Name, email, password, and optionally phone number or social login info (Google/Facebook).</li>
          <li><strong>User Content:</strong> Race predictions, messages, community posts, profile updates.</li>
          <li><strong>Settings Preferences:</strong> Notification and privacy preferences, theme selections.</li>
          <li><strong>Support Requests:</strong> Information submitted via support forms or emails.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6">b. Automatically Collected Information</h3>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li><strong>Usage Data:</strong> Pages visited, time spent, features used.</li>
          <li><strong>Device & Log Data:</strong> IP, OS, browser, device, timestamps.</li>
          <li><strong>Behavioral Data:</strong> Prediction patterns, accuracy, interactions.</li>
          <li><strong>Geographic Data:</strong> Approximate location from IP or Google Analytics.</li>
          <li><strong>Cookies & Tracking:</strong> Cookies and similar tools to improve your experience.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6">c. Third-Party Data</h3>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li>Google/Facebook profile data if used for login.</li>
          <li>Google Analytics for aggregate usage insights.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li>Provide and improve the Service (races, leaderboards, community features).</li>
          <li>Personalize content (suggestions, watchlist updates).</li>
          <li>Detect cheating and maintain fairness.</li>
          <li>Send notifications and respond to support.</li>
          <li>Analyze usage patterns for optimization.</li>
          <li>Secure the platform from abuse.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">3. How We Share Your Information</h2>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li><strong>We do not sell your personal info.</strong></li>
          <li>Shared with service providers under confidentiality.</li>
          <li>Displayed in the app (e.g., username, predictions, rankings).</li>
          <li>May be disclosed due to legal requirements.</li>
          <li>Transferred in case of merger/acquisition.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">4. Data Security</h2>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li><strong>Encryption:</strong> AES-256 standard for sensitive data.</li>
          <li><strong>2FA:</strong> Optional two-factor authentication via email.</li>
          <li><strong>Monitoring:</strong> IP and device logs to detect suspicious activity.</li>
        </ul>
        <p className="text-lg">No system is 100% secure, but we strive to safeguard your data.</p>

        <h2 className="text-3xl font-bold mt-10 mb-2">5. Your Choices and Rights</h2>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li>Manage account and notification preferences in Settings.</li>
          <li>Control cookie preferences via your browser.</li>
          <li>Request data access or deletion via <a href="mailto:support@finraces.com" className="text-blue-400 underline">support@finraces.com</a>.</li>
          <li>Delete your account via Settings (some data may be retained for compliance).</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">6. Data Retention</h2>
        <ul className="list-disc list-inside ml-4 text-lg">
          <li>We retain data as long as your account is active.</li>
          <li>Behavioral data may be anonymized and retained longer for analytics and cheating prevention.</li>
          <li>Deleted account data is purged within 30 days unless otherwise required.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-2">7. Children’s Privacy</h2>
        <p className="text-lg">
          The Service is not intended for users under 18. If we learn that a child has submitted data, we will delete it immediately.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">8. Third-Party Links and Services</h2>
        <p className="text-lg">
          We are not responsible for the practices of third-party services (e.g., stock APIs, Google Analytics) linked or integrated within our platform.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">9. International Data Transfers</h2>
        <p className="text-lg">
          If you access our services internationally, your data may be processed in regions with different data laws. We ensure adequate protection and compliance.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">10. Changes to This Privacy Policy</h2>
        <p className="text-lg">
          We may update this policy from time to time. Major changes will be communicated via email or platform notifications.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-2">11. Contact Us</h2>
        <p className="text-lg">
          📧 <a href="mailto:support@finraces.com" className="text-blue-400 underline">support@finraces.com</a><br />
          📝 Help form is available in the &#34;Help and Support&#34; section of the Settings module.
        </p>
      </div>
    </div>
  );
};

export default Policy;
