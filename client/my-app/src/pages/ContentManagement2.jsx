// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import { Footer } from "./Footer";
// import { CMSideBar } from "./CMSideBar";

// import "../styles/cm2.css";

// export const ContentManagement2 = () => {
//   const [subscribers, setSubscribers] = useState([]);

//   useEffect(() => {
//     // Function to fetch subscribers
//     const fetchSubscribers = async () => {
//       try {
//         const response = await fetch('/api/auth/newsletter-subscribers');
//         if (response.ok) {
//           const data = await response.json();
//           setSubscribers(data);
//         } else {
//           throw new Error('Failed to fetch subscribers');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchSubscribers();
//   }, []);

//   // Function to handle removal of subscriber
//   const removeSubscriber = async (email) => {
//     try {
//       const response = await fetch('/api/auth/toggle-newsletter-subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, isNews: false }),
//       });

//       if (response.ok) {
//         // Update the subscribers state to remove the unsubscribed user
//         setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
//       } else {
//         throw new Error('Failed to unsubscribe');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="content-management">
//       <div className="div">
//         <Footer />
//         <div className="manage-subscribers">
//           <div className="div-wrapper">
//             <div className="text-wrapper-6">Manage Subscribers</div>
//           </div>
//           {/* Map over the subscribers state to render each subscriber */}
//           {subscribers.map(subscriber => (
//             <div key={subscriber.email} className="subscriber-entry">
//               <div className="text-wrapper-7">{subscriber.email}</div>
//               <button className="content-wrapper" onClick={() => removeSubscriber(subscriber.email)}>
//                 <div className="content-4">
//                   <div className="text-wrapper-8">Remove</div>
//                 </div>
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="text-2">
//           <div className="text-wrapper-6">Content Management</div>
//         </div>
//         <CMSideBar />
//         <Header />
//       </div>
//     </div>
//   );
// };
