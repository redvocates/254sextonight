"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function ModelDetails() {
  const { slug } = useParams();
  const [model, setModel] = useState(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(null);

  //useEffect(() => { 
    //async function fetchModel() {
      //try {
        //const res = await axios.get(`/api/getmodels/${slug}`);
        //setModel(res.data.model);
        //console.log('Fetched Model Data:', res.data.model); // Log fetched data directly
      //} catch (error) {
        //console.error("Error fetching model data:", error);
      //}
    //} 
    //fetchModel();
  //}, [slug]);
  useEffect(() => {
    async function fetchModelData(slug, clientId = null) {
      try {
        const res = await axios.get(`/api/getmodels/${slug}${clientId ? `?clientId=${clientId}` : ""}`);
        setModel(res.data.model);
        console.log("Updated Model Data:", res.data.model);
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    }

    const storedClientId = localStorage.getItem("clientId");
    setClientId(storedClientId);
    fetchModelData(slug, storedClientId);
  }, [slug]);


useEffect(() => {
  if (!model) return;

  // Set page title
  document.title = `${model.username} - Escort in ${model.detailedlocation} | 254sextonight`;

  const metas = [
    { name: 'description', content: model.description || `Meet ${model.username}, available in ${model.detailedlocation}.` },
    { property: 'og:title', content: `${model.username} - Escort in ${model.detailedlocation}` },
    { property: 'og:description', content: model.description || `Meet ${model.username}, available in ${model.detailedlocation}.` },
    { property: 'og:image', content: model.imagedisplay },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${model.username} - Escort in ${model.detailedlocation}` },
    { name: 'twitter:description', content: model.description || `Meet ${model.username}, available in ${model.detailedlocation}.` },
    { name: 'twitter:image', content: model.imagedisplay }
  ];

  metas.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name='${name}']` : `meta[property='${property}']`;
    let element = document.querySelector(selector);

    if (element) {
      element.setAttribute("content", content);
    } else {
      element = document.createElement("meta");
      if (name) element.name = name;
      if (property) element.setAttribute("property", property);
      element.content = content;
      document.head.appendChild(element);
    }
  });
}, [model]);


    const handleInterestSubmit = useCallback(async () => {
      if (!clientName) return alert("Enter your Mpesa name");
      if (!clientPhone) return alert("Enter your phone number");
      if (!clientEmail) return alert("Enter your email address");
  
      setIsLoading(true);
  
      try {
        const response = await axios.post(`/api/getmodels/${slug}`, {
          modelSlug: model.slug,
          phonenumber:clientPhone,
          fullname: clientName,
          location: model.detailedlocation,
          price: 1000, // Fixed price
          email: clientEmail,
          loverid: model._id,
          lovername: model.username,
          lovercounty: model.county,
          loverlocation: model.detailedlocation,
          lovershot: model.shot,
          loversleepover: model.sleepover,
          loverage: model.yearofbirth,
          loverimage: model.imagedisplay,
          successfull: false,
        });
  
        if (response.status === 200) {
          alert("Payment successful! Unlocking details...");
          const generatedClientId = response.data.clientId;
          localStorage.setItem("clientId", generatedClientId);
          setClientId(generatedClientId);
  
          await fetchModelData(slug, generatedClientId); // Fetch updated model data
        } else {
          alert("Payment failed. Try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
  

    setIsLoading(false);
    setShowInterestForm(false);
  });

  if (!model) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black border border-b border-red-800 text-white">

      <div className="container mx-auto p-4">
        {/* Model Details Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Model Image */} 
          <div className="relative flex flex-col">
          <h1 className="text-4xl font-bold text-red-500">{model.username}</h1>

           {/**<Image
              src={model.imagedisplay} 
              alt={model.username} 
              width={500}  
              height={600} 
              className="rounded-lg w-full z-10 object-cover"
           /> */}

            <Image src={model.imagedisplay || '/multixnxx-14 pictures-0 (1).jpg'} className="rounded-lg object-cover w-full" alt={model.username} width={500} height={600} />

            
          </div>

          {/* Model Info */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-red-500">Wet Pussy: <span className="text-red-700">{model.username}</span></h1>
            <p className="text-lg">{model.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <p><strong>Gender:</strong> {model.gender}</p>
              <p><strong>Shot Price:</strong> {model.shot || "KES 1500"}</p>
              <p><strong>Sleepover:</strong> {model.sleepover || "KES 8500"}</p>
              <p><strong>Incalls:</strong> {model.incalls ? "Yes" : "No"}</p>
              <p><strong>Outcalls:</strong> {model.outcalls ? "Yes" : "No"}</p>
              <p><strong>Anal:</strong> {model.anal ? "Yes" : "No"}</p>
              <p><strong>County:</strong> {model.county}</p>
              <p><strong>Country:</strong> {model.country}</p>
              <p><strong>Location:</strong> {model.detailedlocation}</p>
              <p><strong>Price:</strong> KES 1000</p>

              {/* Show Contact Details Only If API Returns Them */}
              <p className={model.phonenumber ? "text-green-400" : "text-red-400"}>
                <strong>Phone Number:</strong> {model.phonenumber || "🔒 Locked"}
              </p>
              <p className={model.email ? "text-green-400" : "text-red-400"}>
                <strong>Email:</strong> {model.email || "🔒 Locked"}
              </p>
            </div>
            

            {/* Show Interest Button If Phone is Still Locked */}
            {!model.phonenumber && (
              <>
                <div className="bg-red-900 text-white p-3 rounded-md text-center animate-pulse">
                  <p className="font-semibold">🔒 Security First!</p>
                  <p>Your safety is our priority. Contact details will be revealed after successful payment.</p>
                </div>

                <button 
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
                  onClick={() => setShowInterestForm(true)}
                >
                  I am Interested
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interest Form Overlay */}
      {showInterestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-black p-6 rounded-lg w-80 text-center border border-green-400">
            <h2 className="text-xl font-bold text-green-700">Name</h2>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-4 p-2 w-full border border-green-400 rounded-lg text-white"
            />
            <h2 className="text-xl font-bold text-green-700">Mpesa Number</h2>
            <input
              type="text"
              placeholder="07XXXXXXXX"
              required
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="mt-4 p-2 w-full border border-green-400 rounded-lg text-white"
            />
            <h2 className="text-xl font-bold text-green-700">Email Address</h2>
            <input
              type="email"
              placeholder="ilovesex@254sextonight@gmail.com"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="mt-4 p-2 w-full border border-green-400 rounded-lg text-white"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white mt-4 py-2 px-4 rounded-lg w-full"
              onClick={handleInterestSubmit}
            >
              Pay KES {model.price}
            </button>
            <button 
              className="text-white mt-2 underline"
              onClick={() => setShowInterestForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
          <h2 className="text-xl text-white">Processing Payment...</h2>
        </div>
      )}
    </div>
  );
}
