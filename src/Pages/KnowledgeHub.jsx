import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { 
  FaSearch, 
  FaBookOpen, 
  FaArrowRight, 
  FaBookmark, 
  FaRegBookmark, 
  FaShareAlt, 
  FaClock, 
  FaUserTie, 
  FaTimes, 
  FaShieldAlt, 
  FaPhoneAlt,
  FaChevronDown,
  FaCheckCircle
} from "react-icons/fa";

const KnowledgeHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [apiNews, setApiNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const fallbackArticles = [
    {
      id: "news-fallback-1",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
      category: "Criminal Law",
      author: "Adv. Priya Sharma",
      date: "08 Aug 2026",
      title: "How to File an FIR: Complete Step-by-Step Guide under Sec 154 CrPC",
      desc: "Understand cognizable vs non-cognizable offences, Zero FIR procedures, and legal remedies if police refuse to register FIR.",
      content: "Under Section 154 of the Code of Criminal Procedure (CrPC), any person can report a cognizable offence to the officer in charge of a police station. If the police refuse to register an FIR, you can approach the Superintendent of Police under Sec 154(3) or file a private complaint before the Magistrate under Sec 156(3) CrPC.",
    },
    {
      id: "news-fallback-2",
      img: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&auto=format&fit=crop&q=80",
      category: "Family Law",
      author: "Adv. Meera Patel",
      date: "05 Aug 2026",
      title: "Women Rights & Maintenance under Indian Law: Comprehensive Analysis",
      desc: "Overview of Section 125 CrPC, Domestic Violence Act 2005, and stridhan recovery procedures.",
      content: "Section 125 CrPC provides a speedy remedy for maintenance of wives, children, and parents. The Protection of Women from Domestic Violence Act 2005 further ensures right to residence, protection orders, and monetary relief for aggrieved women.",
    },
    {
      id: "news-fallback-3",
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80",
      category: "Property Law",
      author: "Adv. Rajesh Kumar",
      date: "02 Aug 2026",
      title: "Property Dispute Resolution: Legal Options, Notices & Court Remedies",
      desc: "Step-by-step guide to partition suits, title search, injunctions, and revenue court mutation procedures.",
      content: "Property disputes in India can be resolved through civil partition suits, suits for declaration of title, and permanent injunctions under the Specific Relief Act 1963. Always conduct a 30-year title search at the Sub-Registrar Office before property transactions.",
    }
  ];

  // Fetch live legal news from backend API
  useEffect(() => {
    setIsLoadingNews(true);
    fetch(`${API_BASE_URL}/api/legal-news`)
      .then((res) => res.json())
      .then((data) => {
        const rawResults = data.results || data.articles || (Array.isArray(data) ? data : []);
        if (Array.isArray(rawResults) && rawResults.length > 0) {
          const formattedNews = rawResults.map((item, i) => {
            const rawCat = Array.isArray(item.category) ? item.category[0] : item.category;
            const rawAuthor = Array.isArray(item.creator) ? item.creator[0] : item.creator;
            return {
              id: item.article_id || `news-${i}`,
              img: item.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
              category: rawCat ? (rawCat.charAt(0).toUpperCase() + rawCat.slice(1)) : "Legal Updates",
              author: rawAuthor || "Kanoon News Desk",
              date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recent",
              read: item.pubDate,
              title: item.title || "Legal News & Analysis",
              desc: item.description || "Latest legal news update from courts and statutory bodies in India.",
              content: item.content || item.description || "Detailed legal news analysis provided by Kanoon Mitra Legal News Service.",
              externalLink: item.link
            };
          });
          setApiNews(formattedNews);
        } else {
          setApiNews(fallbackArticles);
        }
      })
      .catch((err) => {
        console.error("Legal News API connection error:", err);
        setApiNews(fallbackArticles);
      })
      .finally(() => {
        setIsLoadingNews(false);
      });
  }, []);

  // Dynamically extract unique categories from news items
  const dynamicCategories = Array.from(new Set(apiNews.map((a) => a.category).filter(Boolean)));
  const categories = ["All Articles", ...dynamicCategories];

  // Filtering logic based on API news
  const filteredArticles = apiNews.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.category && article.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = apiNews.slice(0, 2);

  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setNewsletterEmail("");
  };

  const faqs = [
    {
      q: "What is Zero FIR and can police refuse it?",
      a: "A Zero FIR can be filed at any police station in India regardless of where the incident occurred. Police officers cannot legally refuse to record a Zero FIR for cognizable offences."
    },
    {
      q: "How fast should I report cyber financial fraud?",
      a: "Immediately within 2 hours of unauthorized deduction by calling National Cyber Helpline 1930. Quick reporting allows bank systems to freeze stolen money."
    },
    {
      q: "What is the time limit for an RTI reply?",
      a: "Under the RTI Act 2005, the Public Information Officer (PIO) must provide information within 30 days of receiving the application (48 hours if life and liberty are concerned)."
    },
    {
      q: "Are oral agreements legally binding in India?",
      a: "Yes, oral agreements are valid under the Indian Contract Act 1872 if essential legal conditions are met, though written agreements are much easier to prove in court."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-16 sm:pt-20 font-poppins selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <div className="relative w-full bg-slate-900 text-white overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            className="w-full h-full object-cover"
            src="/images/open-book-beautiful-setting.jpg"
            alt="Knowledge Hub background"
          />
          <div className="absolute inset-0 g-gradient-to-b from-black/80 via-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <FaBookOpen className="text-blue-400" />
            <span>INDIAN LEGAL KNOWLEDGE INITIATIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400">Hub</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed font-light mb-8">
            Empowering citizens with simplified legal guides, court procedures, BNSS/CrPC insights, and consumer protection rights.
          </p>

          {/* Integrated Search Box */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl focus-within:border-blue-400 focus-within:bg-slate-900/90 transition-all">
              <FaSearch className="text-slate-400 text-lg ml-3 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, section, FIR, RTI, POSH..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white px-2 text-sm font-bold"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Quick Searches:</span>
              {["FIR Procedure", "Cyber Fraud 1930", "Women Rights", "Tenant Rights", "e-Daakhil"].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="bg-white/5 hover:bg-blue-600/30 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Header */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat, idx) => {
              const count = cat === "All Articles" 
                ? apiNews.length 
                : apiNews.filter(a => a.category === cat).length;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-700 text-white shadow-md shadow-blue-700/20 scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategory === cat ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Featured Landmark Guides */}
        {!searchQuery && selectedCategory === "All Articles" && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Legal Guides</h2>
                <p className="text-xs sm:text-sm text-gray-500">Essential handbooks on citizen rights & law procedures</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.externalLink) {
                      window.open(item.externalLink, "_blank", "noreferrer");
                    } else {
                      setActiveArticle(item);
                    }
                  }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={item.img}
                      alt="Justice Statue"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/—Pngtree—the statue of justice symbol_15550943.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {item.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full text-gray-700 hover:text-blue-600 transition shadow"
                    >
                      {bookmarkedIds.includes(item.id) ? <FaBookmark className="text-blue-600" /> : <FaRegBookmark />}
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-3 text-xs text-gray-200 font-medium mb-1">
                        <span className="flex items-center gap-1"><FaUserTie className="text-orange-400" /> {item.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FaClock /> {item.read}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug group-hover:text-blue-200 transition">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">{item.date}</span>
                      <a
                        href={item.externalLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!item.externalLink) {
                            e.preventDefault();
                            setActiveArticle(item);
                          }
                        }}
                        className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline group-hover:translate-x-1 transition-transform"
                      >
                        Read Full News <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Section */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedCategory === "All Articles" ? "All Legal Articles & Analysis" : `${selectedCategory} Articles`}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-500 text-sm mb-6">
                No guides match "{searchQuery}" under "{selectedCategory}". Try clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Articles");
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    if (article.externalLink) {
                      window.open(article.externalLink, "_blank", "noreferrer");
                    } else {
                      setActiveArticle(article);
                    }
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={article.img}
                      alt="Justice Statue"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/—Pngtree—the statue of justice symbol_15550943.png";
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {article.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-gray-700 hover:text-blue-600 transition shadow"
                    >
                      {bookmarkedIds.includes(article.id) ? (
                        <FaBookmark className="text-blue-600 text-xs" />
                      ) : (
                        <FaRegBookmark className="text-xs" />
                      )}
                    </button>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center text-[11px] text-gray-500 gap-2 mb-2 font-medium">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.read || "5 min read"}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {article.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-medium">{article.date}</span>
                      <a
                        href={article.externalLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!article.externalLink) {
                            e.preventDefault();
                            setActiveArticle(article);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs hover:underline"
                      >
                        Read Full News <FaArrowRight className="text-[10px]" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Legal FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              Quick Clarity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Frequently Asked Legal Questions</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Instant answers to crucial citizen law inquiries</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left font-semibold text-sm sm:text-base text-gray-900 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown className={`text-gray-500 text-xs transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-blue-50/50 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Helplines & Newsletter Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Emergency Helplines Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
                <FaShieldAlt className="text-base" /> Emergency Citizen Portals
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Need Immediate Legal Emergency Assistance?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Official Government of India national helplines for urgent assistance.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="font-medium text-slate-300">National Cyber Fraud:</span>
                <span className="font-extrabold text-orange-400 text-sm flex items-center gap-1.5"><FaPhoneAlt /> 1930</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="font-medium text-slate-300">NALSA Free Legal Aid:</span>
                <span className="font-extrabold text-blue-400 text-sm flex items-center gap-1.5"><FaPhoneAlt /> 15100</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="font-medium text-slate-300">National Women Helpline:</span>
                <span className="font-extrabold text-pink-400 text-sm flex items-center gap-1.5"><FaPhoneAlt /> 1091</span>
              </div>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col justify-between shadow-xl">
            <div>
              <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                Weekly Digest
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Stay Ahead with Legal Awareness</h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed mb-6">
                Subscribe to our weekly Kanoon Mitra digest to receive simplified court judgments, law modifications, rights guides, and legal tips directly in your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                <FaCheckCircle className="text-emerald-400 text-xl flex-shrink-0" />
                <span>Thank you for subscribing! Your legal digest subscription is confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white text-gray-900 text-sm px-4 py-3.5 rounded-xl focus:outline-none flex-1 placeholder:text-gray-400 font-medium"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-md whitespace-nowrap cursor-pointer"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Interactive Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-100 animate-fadeIn">
            {/* Modal Sticky Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeArticle.category || "Legal Guide"}
                </span>
                <span className="text-xs text-gray-400 font-medium">• {activeArticle.read}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 pb-4 border-b border-gray-100 font-medium">
                <div className="flex items-center gap-1.5 text-gray-800 font-semibold">
                  <FaUserTie className="text-blue-700" />
                  <span>{activeArticle.author}</span>
                  {activeArticle.designation && <span className="text-gray-400 font-normal">({activeArticle.designation})</span>}
                </div>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              {activeArticle.img && (
                <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl mb-6">
                  <img className="w-full h-full object-cover" src={activeArticle.img} alt={activeArticle.title} />
                </div>
              )}

              {/* Key Provisions Banner */}
              {activeArticle.keySections && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Relevant Statutory Provisions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.keySections.map((sec, i) => (
                      <span key={i} className="bg-white text-blue-800 border border-blue-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 font-normal">
                {activeArticle.content || activeArticle.desc}
              </div>

              {/* Emergency Helpline Banner inside modal */}
              {activeArticle.helpline && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-2xl text-xs sm:text-sm text-orange-900 font-medium mb-6">
                  🚨 <span className="font-bold">Emergency Helpline / Portal:</span> {activeArticle.helpline}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                {activeArticle.externalLink && (
                  <a
                    href={activeArticle.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Read Full News on Original Site <FaArrowRight />
                  </a>
                )}

                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition text-sm cursor-pointer shadow-md"
                >
                  Close Reader
                </button>

                <button
                  onClick={(e) => toggleBookmark(activeArticle.id, e)}
                  className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {bookmarkedIds.includes(activeArticle.id) ? (
                    <>
                      <FaBookmark className="text-blue-600" /> Bookmarked
                    </>
                  ) : (
                    <>
                      <FaRegBookmark /> Bookmark Article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;

