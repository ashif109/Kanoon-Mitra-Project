import React, { useState } from "react";
import { Link } from "react-router-dom";

const FloatingAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am your Kanoon Mitra AI Legal Assistant. How can I help you with Indian law, FIR guidance, or RTI filing today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Under Indian Legal Provisions, citizens have fundamental rights protected by the Constitution. ";
      const q = userText.toLowerCase();

      if (q.includes("fir")) {
        reply = "To file an FIR, visit your nearest Police Station or file an e-FIR on your State Police Portal for cyber/theft crimes. Ensure you obtain a free copy of the FIR under Section 173 of BNSS.";
      } else if (q.includes("rti")) {
        reply = "Under RTI Act 2005, you can ask any Public Information Officer (PIO) for government records, expense details, or scheme status. Response must be provided within 30 days.";
      } else if (q.includes("cyber") || q.includes("fraud")) {
        reply = "In case of Cyber Fraud, immediately dial national helpline 1930 or file a complaint on cybercrime.gov.in within 24 hours to freeze stolen bank funds.";
      } else if (q.includes("rent") || q.includes("agreement")) {
        reply = "You can generate a legally valid Residential Rent Agreement using our Kanoon Mitra Free Legal Docs builder under the Legal Docs page.";
      } else if (q.includes("lawyer") || q.includes("consult")) {
        reply = "You can browse verified Advocates by specialization and book a direct consultation slot via our 'Ask a Lawyer' section.";
      } else {
        reply += "You can explore detailed legal articles in our Knowledge Hub or connect directly with verified advocates on Kanoon Mitra.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 p-4 font-semibold text-white shadow-2xl shadow-indigo-500/40 transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="text-2xl">🤖</span>
          <span className="hidden sm:inline-block pr-1 text-sm font-bold">Ask AI Legal Assistant</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] rounded-[2rem] border border-white/10 bg-slate-950/95 text-slate-100 shadow-2xl shadow-slate-950/80 backdrop-blur-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400">
                🤖
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Kanoon Mitra AI</h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online Legal Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                      : "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-900 border border-white/10 px-4 py-2.5 text-slate-400 rounded-tl-none flex items-center gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-white/10 bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-[11px]">
            <button
              onClick={() => setInput("How to file an e-FIR?")}
              className="whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 hover:border-indigo-400 hover:text-white"
            >
              📝 e-FIR Help
            </button>
            <button
              onClick={() => setInput("RTI Application rules?")}
              className="whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 hover:border-indigo-400 hover:text-white"
            >
              📜 RTI Rules
            </button>
            <button
              onClick={() => setInput("Cyber Fraud helpline 1930")}
              className="whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 hover:border-indigo-400 hover:text-white"
            >
              🛡️ Cyber Fraud
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900/80 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any legal question..."
              className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-400 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="rounded-2xl bg-indigo-500 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 active:scale-95 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingAiAssistant;
