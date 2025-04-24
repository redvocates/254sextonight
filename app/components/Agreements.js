"use client";
import { useState } from "react";

export default function Agreements() {

  const terms = [
    { category: "Escort Rights", items: [
      "Escorts have the right to decline any client, location, or service.",
      "Escorts must be treated with dignity and respect at all times.",
      "Physical aggression, threats, or harassment towards escorts is strictly prohibited.",
      "Escorts have full control over the services they offer—clients must respect their choices.",
      "No client is entitled to any service not explicitly agreed upon by both parties.",
      "Escorts can refuse any form of unsafe service or activity.",
      "Escorts can request identity verification from clients before proceeding.",
      "Escorts must not be forced or coerced into any activity beyond their consent.",
      "All interactions must be based on mutual respect and agreed-upon boundaries.",
      "Escorts reserve the right to block or refuse future bookings with any client."
    ]},
    { category: "Client Responsibilities", items: [
      "Clients are fully responsible for their own safety when engaging with service providers.",
      "Clients must respect the escort’s personal space, boundaries, and limits.",
      "Clients must not request unsafe or illegal services.",
      "Clients must maintain confidentiality regarding any engagements with service providers.",
      "Clients must provide accurate information when booking a service.",
      "Any attempt to mislead, lie, or use fake details will result in an immediate blacklist.",
      "Clients should communicate respectfully and professionally at all times.",
      "Threatening or abusive behavior towards service providers is strictly prohibited.",
      "Clients are responsible for their belongings and personal security during the session.",
      "Clients must comply with local laws and regulations at all times."
    ]},
    { category: "Payments & Refunds", items: [
      "All payments must be made in full before services begin.",
      "Refunds are not issued once services have commenced.",
      "Cancellations within 24 hours may be non-refundable.",
      "Chargebacks or fraudulent transactions will be reported and legally pursued.",
      "Clients must confirm service details before making any payments.",
      "Escorts may charge additional fees for extra services requested.",
      "Late cancellations may result in penalties or blacklisting.",
      "Clients must not engage in negotiations to underpay an escort’s set price.",
      "Escorts have the right to refuse service if payment terms are not met.",
      "Failure to make payment will result in permanent blacklisting from the platform."
    ]},
    { category: "Scams & Fraud", items: [
      "Any attempt to scam, steal, or defraud a client or escort is strictly prohibited.",
      "Clients who fail to pay or attempt fraud will face legal consequences.",
      "Fake bookings, ghosting, or time-wasting will lead to a permanent blacklist.",
      "Escorts engaging in fraud, deception, or illegal activities will be removed permanently.",
      "Identity theft or impersonation of another escort will be legally prosecuted.",
      "Any attempt to extort or blackmail an escort or client is strictly prohibited.",
      "Clients who provide fake payment proof will be permanently banned.",
      "Escorts who falsely accuse clients for financial gain will be penalized.",
      "All transactions and interactions must be made in good faith.",
      "If fraud or scamming is reported, the party responsible may be exposed publicly."
    ]},
    { category: "Event & Massage Services", items: [
      "Event planners must follow professional conduct and uphold service agreements.",
      "Massage services must be professional and adhere to ethical standards.",
      "Event organizers must provide full payment before the event date.",
      "Clients must not request additional, non-agreed services from masseuses.",
      "Masseuses and event planners have the right to refuse service at any time.",
      "All event bookings must be made at least 24 hours in advance.",
      "Events must comply with local laws and venue regulations.",
      "Clients who fail to respect agreed-upon terms will be blacklisted.",
      "Masseuses are not obligated to perform any service beyond their comfort level.",
      "Event organizers must maintain professionalism in all interactions."
    ]},
    { category: "Permanent Listings", items: [
      "Escort, masseuse, or event planner details CANNOT be removed once listed.",
      "Requests for profile deletion will be denied under all circumstances.",
      "By agreeing to these terms, users consent to permanent data retention.",
      "No escort, masseuse, or event planner is entitled to profile removal.",
      "Attempts to forcefully remove a profile may result in legal consequences.",
      "Profile updates can be requested, but removals are strictly prohibited.",
      "Clients cannot request escort profile deletions on their behalf.",
      "Event organizers' information remains available indefinitely.",
      "The platform reserves the right to update but not delete profiles.",
      "Profiles are a permanent part of the service history and database."
    ]},
    { category: "Legal & Liability", items: [
      "The platform is not responsible for any damages, disputes, or losses.",
      "Users engage at their own risk and must take necessary precautions.",
      "Escorts and clients must handle disputes professionally and legally.",
      "The platform does not mediate financial or personal disputes.",
      "All users are responsible for their own actions and decisions.",
      "Any illegal activities reported will be forwarded to law enforcement.",
      "The platform reserves the right to suspend or terminate any account at its discretion.",
      "Service providers must ensure they comply with all local regulations.",
      "Clients and providers waive liability claims against the platform.",
      "By using the platform, all users agree to abide by these terms fully."
    ]}
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <div className="max-w-3xl w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-red-600">
        <h1 className="text-3xl font-bold text-red-500 text-center mb-6">
          Terms & Conditions
        </h1>

        {terms.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">
              {section.category}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
}
