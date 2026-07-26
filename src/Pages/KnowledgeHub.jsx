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
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Complete Step-by-Step Guide",
      desc: "Learn the complete process of filing a First Information Report (FIR) in India, including online and offline methods.",
      content: "Filing an FIR is the first legal step in initiating investigation for cognizable offences. Ensure you mention exact date, time, location, suspect details, and list of witnesses...",
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      badge: "Featured",
      category: "Family Law",
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: A Comprehensive Guide",
      desc: "Understanding the fundamental rights and legal protections available to women in India under various laws.",
      content: "Indian Constitution guarantees equal rights to women under Article 14 and Article 15. Key statutory rights include Domestic Violence Act 2005, POSH Act 2013, Equal Remuneration Act...",
    },
  ];

  const allArticles = [
    {
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
      category: "Criminal Law",
      author: "Adv. Priya Sharma",
      date: "15 January 2024",
      read: "8 min read",
      title: "How to File an FIR: Step-by-Step Guide",
      desc: "Learn the complete FIR filing process in India.",
      content: "Detailed steps on filing an FIR, Zero FIR guidelines, and remedies if police refuse registration.",
    },
    {
      img: "https://images.unsplash.com/photo-1678697644660-d33eb146d7ae?w=600&auto=format&fit=crop&q=60",
      category: "Family Law",
      author: "Adv. Meera Patel",
      date: "12 January 2024",
      read: "12 min read",
      title: "Women Rights in India: Complete Guide",
      desc: "A deep dive into women rights & protections.",
      content: "Detailed breakdown of inheritance rights, maternity benefit laws, and protection against harassment.",
    },
    {
      img: "https://images.unsplash.com/photo-1634868287216-7f7fbcf21b30?w=600&auto=format&fit=crop&q=60",
      category: "Property Law",
      author: "Adv. Rajesh Kumar",
      date: "10 January 2024",
      read: "10 min read",
      title: "Property Dispute Resolution: Legal Options Available",
      desc: "Explore the various legal remedies and procedures available for resolving property disputes in India.",
      content: "Partition suits, injunctions, title verification, and RERA complaint procedures explained.",
    },
    {
      img: "https://images.unsplash.com/photo-1609793086003-d198f47e72a5?w=600&auto=format&fit=crop&q=60",
      category: "Consumer Rights",
      author: "Adv. Anjali Singh",
      date: "8 January 2024",
      read: "6 min read",
      title: "Consumer Rights: How to File Complaints Effectively",
      desc: "A detailed guide on consumer rights and complaint procedures.",
      content: "National Consumer Helpline reporting, e-daakhil portal filing, and compensation claims.",
    },
    {
      img: "https://images.unsplash.com/photo-1659274270360-eaa4475d5557?q=80&w=1170&auto=format&fit=crop",
      category: "Cyber Law",
      author: "Adv. Vikram Malhotra",
      date: "5 January 2024",
      read: "9 min read",
      title: "Cyber Crime Prevention: Protecting Yourself Online",
      desc: "Tips and legal measures for online safety and fraud reporting.",
      content: "Emergency steps under Helpline 1930, cyber cell evidence gathering, and banking fraud complaints.",
    },
    {
      img: "https://images.unsplash.com/photo-1713947504256-135041318f31?q=80&w=1332&auto=format&fit=crop",
      category: "Labor Law",
      author: "Adv. Suresh Reddy",
      date: "3 January 2024",
      read: "11 min read",
      title: "Employee Rights: Understanding Labor Laws in India",
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
          </p>
        </div>
      </div>

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
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-blue-800 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {featuredArticles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-500" src={article.img} alt={article.title} />
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {article.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center text-xs text-gray-500 gap-3 mb-2 font-medium">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.read}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.desc}</p>
                </div>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-2 text-blue-800 font-bold text-sm hover:text-blue-900 transition"
                >
                  Read Full Guide <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* All Articles Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Legal Articles</h2>
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">No articles found matching "{searchQuery}" under "{selectedCategory}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredArticles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition duration-500" src={article.img} alt={article.title} />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center text-xs text-gray-500 gap-2 mb-2 font-medium">
                      <span className="text-blue-800 font-bold">{article.category}</span>
                      <span>•</span>
                      <span>{article.read}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{article.title}</h3>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">{article.desc}</p>
                  </div>
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-2 text-blue-800 font-bold text-xs hover:underline"
                  >
                    Read Article <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Stay Updated on Legal Awareness</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto mb-6">
            Subscribe to our weekly Legal Newsletter to receive simplified law updates, rights guides, and legal tips directly in your inbox.
          </p>

          {subscribed ? (
            <div className="bg-green-600/30 border border-green-400 text-green-100 p-4 rounded-xl max-w-md mx-auto font-semibold text-sm">
              🎉 Thank you for subscribing! Check your inbox for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none flex-1"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition text-sm whitespace-nowrap shadow-md"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {activeArticle.category || "Legal Guide"}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-3 mb-2">{activeArticle.title}</h2>
            <div className="flex items-center text-xs text-gray-500 gap-3 mb-4 pb-4 border-b border-gray-100">
              <span>{activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.read}</span>
            </div>
            <img className="w-full h-56 object-cover rounded-xl mb-4" src={activeArticle.img} alt={activeArticle.title} />
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{activeArticle.desc}</p>
            <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-r-xl text-sm text-gray-800 leading-relaxed font-medium mb-6">
              {activeArticle.content || "Legal guidance provided under Kanoon Mitra Knowledge Initiative."}
            </div>
            <button
              onClick={() => setActiveArticle(null)}
              className="w-full bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition text-sm"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;
