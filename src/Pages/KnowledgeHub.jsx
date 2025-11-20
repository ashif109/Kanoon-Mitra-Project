import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const KnowledgeHub = () => {

  // ⭐ FEATURED ARTICLES ARRAY
  const featuredArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      badge: "Features",
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Complete Step-by-Step Guide",
      desc: "Learn the complete process of filing a First Information Report (FIR) in India, including online and offline methods.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      badge: "Features",
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: A Comprehensive Guide",
      desc: "Understanding the fundamental rights and legal protections available to women in India under various laws.",
      link: ""
    }
  ];

  // ⭐ ALL ARTICLES ARRAY
  const allArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Step-by-Step Guide",
      desc: "Learn the complete FIR filing process in India.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: Complete Guide",
      desc: "A deep dive into women rights & protections.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1634868287216-7f7fbcf21b30?w=600&auto=format&fit=crop&q=60",
      author: "Adv. Rajesh Kumar",
      date: "10 January 2024",
      read: "10 min read",
      title: "Property Dispute Resolution: Legal Options Available",
      desc: "Explore the various legal remedies and procedures available for resolving property disputes in India.",
      link: ""
    },
    // --------- NEXT ROW ----------
    {
      img: "https://images.unsplash.com/photo-1609793086003-d198f47e72a5?w=600&auto=format&fit=crop&q=60",
      author: "Adv. Anjali Singh",
      date: "8 January 2024",
      read: "6 min read",
      title: "Consumer Rights: How to File Complaints Effectively",
      desc: "A detailed guide on consumer rights and complaint procedures.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1659274270360-eaa4475d5557?q=80&w=1170&auto=format&fit=crop",
      author: "Adv. Vikram Malhotra",
      date: "5 January 2024",
      read: "9 min read",
      title: "Cyber Crime Prevention: Protecting Yourself Online",
      desc: "Tips and legal measures for online safety.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1713947504256-135041318f31?q=80&w=1332&auto=format&fit=crop",
      author: "Adv. Suresh Reddy",
      date: "3 January 2024",
      read: "11 min read",
      title: "Employee Rights: Understanding Labor Laws in India",
      desc: "Overview of employee rights and labor laws.",
      link: ""
    },
    // --------- NEXT ROW ----------
    {
      img: "https://plus.unsplash.com/premium_photo-1723701786826-5a8b325536bd?q=80&w=1090&auto=format&fit=crop",
      author: "Adv. Priya Sharma",
      date: "28 December 2023",
      read: "15 min read",
      title: "Divorce Process in India: Requirements & Procedure",
      desc: "Step-by-step divorce process in India.",
      link: ""
    },
    {
      img: "https://img.freepik.com/free-photo/doctor-writing-medical-notes_1098-21569.jpg?w=1480",
      author: "Adv. Meera Patel",
      date: "25 December 2023",
      read: "7 min read",
      title: "RTI Filing: Your Right to Information",
      desc: "Guide to filing RTI applications.",
      link: ""
    }
  ];


  return (
    <div>
      {/* ----------------------- HERO SECTION ----------------------- */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-120 object-cover"
          src="/src/assets/open-book-beautiful-setting.jpg"
          alt="law background"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Knowledge Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
            Access comprehensive legal knowledge, guides, and resources to understand your rights and legal procedures.
          </p>
        </div>
      </div>

      {/* ----------------------- SEARCH + FILTERS ----------------------- */}
      <div className='p-8'>
        <div className='flex flex-col md:flex-row gap-6 mb-8 m-9'>
          <input className="w-full md:w-50"
            type="text" placeholder='Search articles...' />

          {["All Articles", "Family Law", "Criminal Law", "Property Law", "Consumer Rights", "Cyber Law", "Labor Law"].map((item, i) => (
            <button key={i} className="bg-blue-800 text-white px-4 py-2 rounded ">
              {item}
            </button>
          ))}
        </div>

        {/* ----------------------- FEATURED CARDS ----------------------- */}
        <h1 className='text-3xl font-semibold mb-3 drop-shadow-lg p-3'>
          Featured Articles
        </h1>

        <div className='flex flex-col lg:flex-row justify-between gap-8 mx-4 sm:mx-10 mb-10 h-128'>
          {featuredArticles.map((card, i) => (
            <div key={i} className='relative bg-white shadow-2xl rounded-lg overflow-hidden w-full lg:w-[48%] hover:shadow-indigo-400/50'>
              <img className='w-full h-70 object-cover' src={card.img} />

              <h1 className='absolute top-3 left-4 bg-blue-800 text-white px-3 py-1 rounded shadow-lg '>
                {card.badge}
              </h1>

              <div className='p-5'>
                <p className='text-gray-700'>{card.author} • {card.date} • {card.read}</p>
                <h1 className='text-2xl font-semibold mb-3'>{card.title}</h1>
                <p className='text-gray-700'>{card.desc}</p>
                <br />

                <a href={card.link} className="inline-flex items-center gap-2 text-blue-700 text-2xl font-semibold hover:text-blue-800">
                  Read more <FaArrowRight className="mt-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-12">
          {allArticles.map((card, i) => (
            <div key={i} className='relative bg-white shadow-2xl rounded-lg overflow-hidden hover:shadow-indigo-400/50'>
              <img className='w-full h-70 object-cover' src={card.img} />

              <div className='p-5'>
                <p className='text-gray-700'>{card.author} • {card.date}</p>
                <h1 className='text-xl font-semibold mb-3'>{card.title}</h1>
                <p className='text-gray-700'>{card.desc}</p>
                <br /> 
                <div className='flex justify-between'><p>{card.read}</p>

                <a href={card.link} className="inline-flex items-center gap-2 text-blue-700 text-xl font-semibold hover:text-blue-900">
                  Read more <FaArrowRight className="mt-0.5" />
                </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className='shadow-2xl rounded-lg text-center h-50'>
          <h1 className=' font-semibold text-black text-3xl text-center p-2'>Stay Updated with Legal Knowledge</h1>
          <p className='p-2 text-gray-700  text-center'>Subscribe to our newsletter and receive the latest legal articles, updates, and tips  <br /> directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full sm:w-auto">
            <input
              className="bg-black/70 w-full sm:w-[400px] border border-amber-50 rounded-lg p-2 text-white placeholder-gray-300 text-sm sm:text-base"
              type="text"
              placeholder="Enter your email address"
            />
            <button className="bg-blue-700 hover:shadow-blue-400/50 hover:shadow-lg transition-all duration-300 px-5 py-2 rounded-lg text-white text-lg hover:bg-blue-800">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default KnowledgeHub;
