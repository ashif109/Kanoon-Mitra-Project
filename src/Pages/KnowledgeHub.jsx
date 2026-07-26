<<<<<<< HEAD
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const KnowledgeHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      badge: "Featured",
      category: "Criminal Law",
=======
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const KnowledgeHub = () => {

  // ⭐ FEATURED ARTICLES ARRAY
  const featuredArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      badge: "Features",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Complete Step-by-Step Guide",
      desc: "Learn the complete process of filing a First Information Report (FIR) in India, including online and offline methods.",
<<<<<<< HEAD
      content: "Filing an FIR is the first legal step in initiating investigation for cognizable offences. Ensure you mention exact date, time, location, suspect details, and list of witnesses...",
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      badge: "Featured",
      category: "Family Law",
=======
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      badge: "Features",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: A Comprehensive Guide",
      desc: "Understanding the fundamental rights and legal protections available to women in India under various laws.",
<<<<<<< HEAD
      content: "Indian Constitution guarantees equal rights to women under Article 14 and Article 15. Key statutory rights include Domestic Violence Act 2005, POSH Act 2013, Equal Remuneration Act...",
    },
  ];

  const allArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      category: "Criminal Law",
=======
      link: ""
    }
  ];

  // ⭐ ALL ARTICLES ARRAY
  const allArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Step-by-Step Guide",
      desc: "Learn the complete FIR filing process in India.",
<<<<<<< HEAD
      content: "Detailed steps on filing an FIR, Zero FIR guidelines, and remedies if police refuse registration.",
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      category: "Family Law",
=======
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: Complete Guide",
      desc: "A deep dive into women rights & protections.",
<<<<<<< HEAD
      content: "Detailed breakdown of inheritance rights, maternity benefit laws, and protection against harassment.",
    },
    {
      img: "https://images.unsplash.com/photo-1634868287216-7f7fbcf21b30?w=600&auto=format&fit=crop&q=60",
      category: "Property Law",
=======
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1634868287216-7f7fbcf21b30?w=600&auto=format&fit=crop&q=60",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Rajesh Kumar",
      date: "10 January 2024",
      read: "10 min read",
      title: "Property Dispute Resolution: Legal Options Available",
      desc: "Explore the various legal remedies and procedures available for resolving property disputes in India.",
<<<<<<< HEAD
      content: "Partition suits, injunctions, title verification, and RERA complaint procedures explained.",
    },
    {
      img: "https://images.unsplash.com/photo-1609793086003-d198f47e72a5?w=600&auto=format&fit=crop&q=60",
      category: "Consumer Rights",
=======
      link: ""
    },
    // --------- NEXT ROW ----------
    {
      img: "https://images.unsplash.com/photo-1609793086003-d198f47e72a5?w=600&auto=format&fit=crop&q=60",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Anjali Singh",
      date: "8 January 2024",
      read: "6 min read",
      title: "Consumer Rights: How to File Complaints Effectively",
      desc: "A detailed guide on consumer rights and complaint procedures.",
<<<<<<< HEAD
      content: "National Consumer Helpline reporting, e-daakhil portal filing, and compensation claims.",
    },
    {
      img: "https://images.unsplash.com/photo-1659274270360-eaa4475d5557?q=80&w=1170&auto=format&fit=crop",
      category: "Cyber Law",
=======
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1659274270360-eaa4475d5557?q=80&w=1170&auto=format&fit=crop",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Vikram Malhotra",
      date: "5 January 2024",
      read: "9 min read",
      title: "Cyber Crime Prevention: Protecting Yourself Online",
<<<<<<< HEAD
      desc: "Tips and legal measures for online safety and fraud reporting.",
      content: "Emergency steps under Helpline 1930, cyber cell evidence gathering, and banking fraud complaints.",
    },
    {
      img: "https://images.unsplash.com/photo-1713947504256-135041318f31?q=80&w=1332&auto=format&fit=crop",
      category: "Labor Law",
=======
      desc: "Tips and legal measures for online safety.",
      link: ""
    },
    {
      img: "https://images.unsplash.com/photo-1713947504256-135041318f31?q=80&w=1332&auto=format&fit=crop",
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      author: "Adv. Suresh Reddy",
      date: "3 January 2024",
      read: "11 min read",
      title: "Employee Rights: Understanding Labor Laws in India",
<<<<<<< HEAD
      desc: "Overview of employee rights, severance, and labor laws.",
      content: "Industrial Disputes Act, Shops & Establishment Act, PF withdrawal, and notice period legalities.",
    },
  ];

  const categories = ["All Articles", "Family Law", "Criminal Law", "Property Law", "Consumer Rights", "Cyber Law", "Labor Law"];

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-120 object-cover"
          src="/images/open-book-beautiful-setting.jpg"
          alt="Knowledge Hub"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            Legal Education & Awareness
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Knowledge Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-gray-200">
            Access comprehensive legal knowledge, guides, and resources to understand your rights and legal procedures in India.
=======
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
          src="/images/open-book-beautiful-setting.jpg"
          alt="law background"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Knowledge Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
            Access comprehensive legal knowledge, guides, and resources to understand your rights and legal procedures.
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
          </p>
        </div>
      </div>

<<<<<<< HEAD
      {/* Filter & Search Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full md:w-80 border border-gray-300 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white shadow-sm"
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-blue-800 text-white shadow-md"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles Section */}
        {selectedCategory === "All Articles" && !searchQuery && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredArticles.map((card, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col justify-between">
                  <div className="relative">
                    <img className="w-full h-64 object-cover" src={card.img} alt={card.title} />
                    <span className="absolute top-4 left-4 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {card.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2 font-medium">
                      {card.author} • {card.date} • {card.read}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{card.desc}</p>

                    <button
                      onClick={() => setActiveArticle(card)}
                      className="inline-flex items-center gap-2 text-blue-800 font-bold text-sm hover:text-blue-900 transition"
                    >
                      Read Full Article <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All Articles Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory === "All Articles" ? "All Legal Guides" : `${selectedCategory} Guides`}
        </h2>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200">
            <p className="text-lg">No articles found matching "{searchQuery}" under {selectedCategory}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredArticles.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden flex flex-col justify-between">
                <div>
                  <img className="w-full h-48 object-cover" src={card.img} alt={card.title} />
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {card.category}
                    </span>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      {card.author} • {card.date}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{card.read}</span>
                  <button
                    onClick={() => setActiveArticle(card)}
                    className="inline-flex items-center gap-1.5 text-blue-800 font-bold text-xs hover:text-blue-900"
                  >
                    Read <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Box */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated with Legal Knowledge</h2>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to our legal newsletter to receive statutory updates, landmark judgement summaries, and rights awareness directly in your inbox.
          </p>

          {subscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm font-semibold">
              ✓ Thank you for subscribing to Kanoon Mitra Legal Updates!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-80"
                required
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl transition shadow"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Article Detail Drawer Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {activeArticle.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{activeArticle.title}</h2>
            <p className="text-xs text-gray-500 mb-4">
              By {activeArticle.author} • Published on {activeArticle.date} • {activeArticle.read}
            </p>

            <img className="w-full h-56 object-cover rounded-xl mb-4" src={activeArticle.img} alt={activeArticle.title} />

            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <p className="font-semibold text-gray-900">{activeArticle.desc}</p>
              <p>{activeArticle.content}</p>
              <p>
                Knowing your statutory rights empowers you to navigate legal challenges effectively. For case-specific advice, consult a verified advocate on Kanoon Mitra.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
=======
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
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf

export default KnowledgeHub;
