import Link from "next/link";

export default function MasseuseEventsRegistrationHelp() {
  return (
    <section
      className="bg-cover bg-center min-h-screen flex items-center justify-center text-white p-6"
      style={{ backgroundImage: "url('/multixnxx-15 pictures-10 (4).jpg')" }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded-lg max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6">How to Register</h2>
        <ul className="space-y-4 text-lg text-left">
          <li>✅ Enter your details in the registration form.</li>
          <li>✅ Pay a **KES 1000** registration fee.</li>
          <li>✅ You’ll receive an email confirming your submission.</li>
          <li>✅ Wait for a **maximum of 5 hours** for verification.</li>
          <li>✅ Once verified, you’ll receive a **confirmation email**.</li>
          <li>✅ The email will also include a **link to your profile**.</li>
        </ul>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <Link href="/register-masseuse">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition">
              Register as Masseuse
            </button>
          </Link>
          <Link href="/register-event">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
              Register an Event
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
