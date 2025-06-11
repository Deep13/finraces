import { useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const sections = [
  "Getting Started",
  "Joining a Race",
  "Creating Your Own Race",
  "Making Predictions",
  "Understanding Points & Rankings",
  "Using Tags",
  "Notifications & Updates",
  "Tips for Winning",
  "Need Help?",
];

const HowToUseFinraces = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="flex flex-col md:flex-row max-w-[90rem] mx-auto flex-1 gap-3 px-2 scroll-smooth">
        {/* Sticky Left Nav */}
        <div className="hidden md:block w-64 sticky top-20 bottom-20 h-[40rem] rounded-xl border dark:border-[#00387E] dark:bg-[#000D38] p-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Sections
          </h2>
          <ul className="space-y-2 text-sm dark:text-gray-300">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 gap-6 dark:bg-[#000D38] py-12 px-4 md:px-10 rounded-xl border dark:border-[#00387E] dark:text-white text-lg leading-8 w-full scroll-smooth">
          <h1 className="text-4xl font-bold font-poppins mb-4">
            How to Use FinRacers
          </h1>
          <p className="text-lg">
            FinRacers is a platform where you can participate in
            prediction-based stock market races. This guide will help you
            understand how to get started and use the platform effectively.
          </p>

          <Section title="Getting Started">
            <ul className="list-disc list-inside ml-4">
              <li>Create an account using your email, Google, or Facebook.</li>
              <li>
                Complete your profile and enable 2FA for added security
                (optional).
              </li>
              <li>
                Explore the dashboard to view upcoming races or join existing
                ones.
              </li>
            </ul>
          </Section>

          <Section title="Joining a Race">
            <ul className="list-disc list-inside ml-4">
              <li>Click on any available race in the “Explore” tab.</li>
              <li>Read race details including stock list and rules.</li>
              <li>
                Submit your predictions before the lock time (usually 15 mins
                before race start).
              </li>
            </ul>
          </Section>

          <Section title="Creating Your Own Race">
            <ul className="list-disc list-inside ml-4">
              <li>Go to the “My Races” section and click “Create Race”.</li>
              <li>
                Enter race name, select a schedule, and choose stocks to
                include.
              </li>
              <li>
                Set the privacy: Public (open to all) or Private (invite-only).
              </li>
            </ul>
          </Section>

          <Section title="Making Predictions">
            <ul className="list-disc list-inside ml-4">
              <li>
                Select a stock and predict its movement: Up, Down, or No Change.
              </li>
              <li>
                Predictions are locked at the race’s start time to ensure
                fairness.
              </li>
              <li>
                You can view all your submitted predictions in the “My
                Predictions” tab.
              </li>
            </ul>
          </Section>

          <Section title="Understanding Points & Rankings">
            <ul className="list-disc list-inside ml-4">
              <li>
                Points are awarded based on accuracy and market volatility.
              </li>
              <li>Leaderboards show top performers based on total points.</li>
              <li>Ranks update live after each race ends.</li>
            </ul>
          </Section>

          <Section title="Using Tags">
            <p>
              In chat or race discussions, you can tag{" "}
              <span className="text-blue-400">@users</span> or{" "}
              <span className="text-green-400">$stocks</span> to mention
              specific people or stocks.
            </p>
          </Section>

          <Section title="Notifications & Updates">
            <ul className="list-disc list-inside ml-4">
              <li>
                Get notified of race results, leaderboard updates, and mentions.
              </li>
              <li>
                Enable browser or email notifications for real-time updates.
              </li>
            </ul>
          </Section>

          <Section title="Tips for Winning">
            <ul className="list-disc list-inside ml-4">
              <li>
                Study market trends and recent stock news before predicting.
              </li>
              <li>Join races early to avoid last-minute prediction rush.</li>
              <li>Check your past predictions to learn and improve.</li>
            </ul>
          </Section>

          <Section title="Need Help?">
            <p>
              Reach out anytime from the “Help and Support” section under
              Settings or email us at{" "}
              <a
                href="mailto:support@finraces.com"
                className="text-blue-400 underline"
              >
                support@finraces.com
              </a>
              .
            </p>
          </Section>

          <p className="text-sm text-gray-400 mt-8">
            Last updated: April 08, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

// Section Component with ID for scrolling
const Section = ({ title, children }) => {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section id={id} className="scroll-mt-16">
      {" "}
      {/* adjust this value if needed */}
      <h2 className="text-3xl font-bold mt-10 mb-2">{title}</h2>
      {children}
    </section>
  );
};

export default HowToUseFinraces;
