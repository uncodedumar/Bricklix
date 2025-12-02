"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  MessageSquare,
  X,
  ChevronDown,
  Zap,
  Briefcase,
  HelpCircle,
  User,
  MessageSquareText,
  Loader,
  Send,
  Phone,
  Mail,
  User2,
  ChevronLeft,
  ArrowLeft, // Added for Back Navigation
  MessageCircle, // New icon for WhatsApp Link
} from "lucide-react";

// --- CSS for Breathing Icon (Tailwind/Standard CSS) ---
// Note: In a real app, this would be in a global CSS file or defined using a CSS-in-JS library, 
// but for a single component, defining a simple style block or using Tailwind's arbitrary values/keyframes is common.
const breathingAnimation = `
@keyframes pulse-breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
    box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0);
  }
}
.breathe {
  animation: pulse-breathe 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}
`;

// Define types for better TypeScript structure
type Message = {
  id: number;
  sender: "user" | "bot";
  text: React.ReactNode;
  options?: any[];
  step?: string;
  isPlaceholder?: boolean;
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  purpose: string;
};

type Service = {
  id: string;
  name: string;
  icon: string;
  overview: string;
  process: string;
};

type FAQ = {
  id: string;
  q: string;
  a: string;
  nextOptions: { id: string; text: string }[];
};

type Action = {
  id: string;
  text: React.ReactNode;
  action: string;
  detailId?: string;
  serviceName?: string;
};

// --- Resend API Setup (No Change) ---
const RESEND_API_ROUTE = "/api/send-email";

// --- Gemini API Setup (No Change) ---
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";
const API_KEY = "AIzaSyAthhBh0X5fV7G84bxyuSl592YhS6XkmS8";
const MAX_RETRIES = 5;

// Function to handle the API call with exponential backoff (No Change)
const callGeminiAPI = async (
  userQuery: string,
  systemPrompt: string
): Promise<string> => {
  if (!API_KEY)
    return "AI Feature Disabled: Please provide an API_KEY for Gemini.";

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
          if (attempt < MAX_RETRIES - 1) {
            const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
        }
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      return (
        text ||
        "Error: Could not retrieve content from the AI. The response was empty."
      );
    } catch (error) {
      console.error("Gemini API call failed:", error);
      if (attempt === MAX_RETRIES - 1) {
        return "Error: Failed to connect to the AI service after multiple retries. Check console for details.";
      }
    }
  }
  return "Error: An unexpected issue occurred during API communication.";
};

// --- Resend Email Sender Function (Client-side) (No Change) ---
const sendLeadEmail = async (data: ContactInfo) => {
  console.log("Attempting to send lead data:", data);
  try {
    // IMPORTANT: Assuming you have a file at /pages/api/send-email.ts or /app/api/send-email/route.ts
    // that handles the Resend request securely from the server side.
    const response = await fetch(RESEND_API_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return true;
  } catch (error) {
    console.error("Error sending lead email:", error);
    return false;
  }
};

// --- Static Data (No Change) ---
const CURRENT_PAGE = "AI & Automation services";
const SERVICES_DATA: Service[] = [
  // ... (Your Services Data is intact)
  {
    id: "ai-integration",
    name: "AI Integration & AI Development",
    icon: "🤖",
    overview: "We integrate cutting-edge AI capabilities into your existing systems and develop custom AI solutions tailored to your business needs. From natural language processing to computer vision, we help you leverage AI to automate processes, gain insights, and enhance user experiences.",
    process: "Our Process: 1) AI Strategy Assessment 2) Custom AI Solution Design 3) Integration & Development 4) Testing & Optimization 5) Deployment & Training"
  },
  {
    id: "machine-learning",
    name: "Machine Learning Solutions",
    icon: "🧠",
    overview: "Build intelligent systems that learn from your data. We develop machine learning models for predictive analytics, pattern recognition, recommendation engines, and automated decision-making that improve over time.",
    process: "Our Process: 1) Data Analysis & Preparation 2) Model Selection & Design 3) Training & Validation 4) Integration & Deployment 5) Continuous Monitoring & Improvement"
  },
  {
    id: "software-development",
    name: "Software Development (ERPs, Web Apps, Portals, Systems)",
    icon: "💻",
    overview: "Full-stack software development services including Enterprise Resource Planning (ERP) systems, web applications, customer portals, and custom business systems. We build scalable, secure, and user-friendly solutions that streamline your operations.",
    process: "Our Process: 1) Requirements Analysis 2) Architecture Design 3) Development & Testing 4) Deployment 5) Maintenance & Support"
  },
  {
    id: "ai-marketing",
    name: "AI-Driven Marketing Services",
    icon: "📊",
    overview: "Leverage AI to optimize your marketing campaigns, personalize customer experiences, automate content generation, and analyze marketing performance. Our AI-powered marketing solutions help you reach the right audience at the right time.",
    process: "Our Process: 1) Marketing Strategy Review 2) AI Tool Selection 3) Campaign Automation Setup 4) Performance Monitoring 5) Optimization & Scaling"
  },
  {
    id: "seo-optimization",
    name: "SEO & Web Optimization",
    icon: "🔍",
    overview: "Improve your website's search engine rankings and performance. We provide comprehensive SEO audits, keyword optimization, technical SEO improvements, content strategy, and ongoing monitoring to boost your online visibility.",
    process: "Our Process: 1) SEO Audit & Analysis 2) Strategy Development 3) On-Page & Technical Optimization 4) Content Enhancement 5) Monitoring & Reporting"
  },
  {
    id: "web-app-development",
    name: "Web App Development",
    icon: "🌐",
    overview: "Create modern, responsive web applications that deliver exceptional user experiences. We build progressive web apps, single-page applications, and full-featured web platforms using the latest technologies and best practices.",
    process: "Our Process: 1) User Research & Design 2) Technology Stack Selection 3) Development & Testing 4) Performance Optimization 5) Launch & Support"
  },
  {
    id: "custom-automation",
    name: "Custom Automation Systems",
    icon: "⚙️",
    overview: "Automate repetitive tasks and workflows to save time and reduce errors. We design and implement custom automation systems that integrate with your existing tools, streamline processes, and free your team to focus on high-value work.",
    process: "Our Process: 1) Process Analysis 2) Automation Design 3) System Development 4) Integration & Testing 5) Training & Documentation"
  },
  {
    id: "data-analytics",
    name: "Data Analytics & AI Insights",
    icon: "📈",
    overview: "Transform your data into actionable insights. We help you collect, analyze, and visualize data using advanced analytics and AI-powered tools to make informed business decisions and identify growth opportunities.",
    process: "Our Process: 1) Data Assessment 2) Analytics Platform Setup 3) Data Processing & Analysis 4) Insight Generation 5) Reporting & Dashboards"
  },
  {
    id: "api-integrations",
    name: "API & System Integrations",
    icon: "🔌",
    overview: "Connect your systems seamlessly with robust API development and third-party integrations. We build secure, scalable APIs and integrate your applications with popular services, databases, and platforms.",
    process: "Our Process: 1) Integration Requirements 2) API Design & Development 3) Security Implementation 4) Testing & Documentation 5) Deployment & Monitoring"
  },
  {
    id: "branding-digital",
    name: "Branding & Digital Presence Enhancement",
    icon: "🎨",
    overview: "Strengthen your brand identity and digital presence. We provide comprehensive branding services, website redesigns, digital marketing strategies, and content creation to help you stand out in the digital landscape.",
    process: "Our Process: 1) Brand Audit 2) Strategy Development 3) Design & Content Creation 4) Implementation 5) Performance Tracking & Refinement"
  }
];

const FAQ_DATA: FAQ[] = [
  // ... (Your FAQ Data is intact)
  {
    id: "faq-1",
    q: "What is Bricklix, and who is it for?",
    a: "Bricklix is a modern, scalable platform designed to streamline operations, automate repetitive tasks, and centralize business workflows. It's built for startups, agencies, enterprises, and anyone who wants to run their business with more speed and clarity. Whether you're managing a small team or running a large operation, Bricklix scales smoothly with your needs.",
    nextOptions: [
      { id: "faq-2", text: "How does Bricklix work on a daily basis?" },
      { id: "faq-3", text: "How do I get started with Bricklix?" },
      { id: "faq-4", text: "Can Bricklix integrate with my existing systems?" }
    ]
  },
  {
    id: "faq-2",
    q: "How does Bricklix work on a daily basis?",
    a: "Bricklix brings your workflows into one clean, automated system. It handles tasks, approvals, real-time data processing, team collaboration, and intelligent insights powered by AI. Daily operations become faster, smarter, and far more organized, with automation reducing manual work and boosting productivity.",
    nextOptions: [
      { id: "faq-3", text: "How do I get started with Bricklix?" },
      { id: "faq-5", text: "Is Bricklix customizable for my business needs?" },
      { id: "faq-6", text: "How does data migration and team training work?" }
    ]
  },
  {
    id: "faq-3",
    q: "How do I get started with Bricklix?",
    a: "Getting started is simple: create an account, request a demo or trial, and begin onboarding. Our team guides you through setup, system configuration, and feature activation. Most users are fully operational within a short onboarding window, depending on the complexity of your business.",
    nextOptions: [
      { id: "faq-4", text: "Can Bricklix integrate with my existing systems or tools?" },
      { id: "faq-6", text: "How does data migration and team training work?" },
      { id: "faq-8", text: "What are the pricing options and plans?" }
    ]
  },
  {
    id: "faq-4",
    q: "Can Bricklix integrate with my existing systems or tools?",
    a: "Yes — Bricklix connects seamlessly with popular tools and platforms. It supports third-party integrations, API connections, webhooks, and developer-friendly documentation, making it easy to plug into your existing ecosystem without disruption.",
    nextOptions: [
      { id: "faq-5", text: "Is Bricklix customizable for my business needs?" },
      { id: "faq-9", text: "What kind of support does Bricklix offer?" },
      { id: "faq-1", text: "What is Bricklix, and who is it for?" }
    ]
  },
  {
    id: "faq-5",
    q: "Is Bricklix customizable for my business needs?",
    a: "Absolutely. Bricklix offers modular features, flexible workflow builders, UI/UX adjustments, role-based controls, and the option for custom development. If you want full branding control, white-labeling is also available.",
    nextOptions: [
      { id: "faq-6", text: "How does data migration and team training work?" },
      { id: "faq-7", text: "How secure is Bricklix, and how is my data protected?" },
      { id: "faq-4", text: "Can Bricklix integrate with my existing systems?" }
    ]
  },
  {
    id: "faq-6",
    q: "How does data migration and team training work?",
    a: "We assist with importing your existing data into Bricklix and ensure everything is structured correctly. During onboarding, your team gets guided training sessions, tutorials, and ongoing learning resources so they can adopt the platform quickly and confidently.",
    nextOptions: [
      { id: "faq-7", text: "How secure is Bricklix, and how is my data protected?" },
      { id: "faq-9", text: "What kind of support does Bricklix offer?" },
      { id: "faq-3", text: "How do I get started with Bricklix?" }
    ]
  },
  {
    id: "faq-7",
    q: "How secure is Bricklix, and how is my data protected?",
    a: "Bricklix uses industry-grade encryption, secure storage, and continuous monitoring to protect your data. We follow modern compliance standards, offer regular backups, and ensure you always retain full ownership of your information. Your data stays safe, private, and recoverable.",
    nextOptions: [
      { id: "faq-8", text: "What are the pricing options and plans?" },
      { id: "faq-10", text: "How reliable is Bricklix in terms of speed and uptime?" },
      { id: "faq-5", text: "Is Bricklix customizable for my business needs?" }
    ]
  },
  {
    id: "faq-8",
    q: "What are the pricing options and plans?",
    a: "Bricklix offers flexible pricing based on monthly or yearly plans. Options range from starter tiers to advanced and enterprise packages with additional features and support. Upgrading or downgrading is easy, so you can adjust based on your growth.",
    nextOptions: [
      { id: "faq-9", text: "What kind of support does Bricklix offer?" },
      { id: "faq-10", text: "How reliable is Bricklix in terms of speed and uptime?" },
      { id: "faq-3", text: "How do I get started with Bricklix?" }
    ]
  },
  {
    id: "faq-9",
    q: "What kind of support does Bricklix offer?",
    a: "We provide responsive support with clear service hours, fast ticket resolution, platform documentation, and a knowledge base. Higher-tier plans include priority support, dedicated account managers, and hands-on assistance when you need it.",
    nextOptions: [
      { id: "faq-10", text: "How reliable is Bricklix in terms of speed and uptime?" },
      { id: "faq-7", text: "How secure is Bricklix, and how is my data protected?" },
      { id: "faq-8", text: "What are the pricing options and plans?" }
    ]
  },
  {
    id: "faq-10",
    q: "How reliable is Bricklix in terms of speed and uptime?",
    a: "Bricklix is built for high performance, offering fast load times, smooth handling of heavy workloads, and a strong uptime record. Regular updates keep the system optimized, secure, and running at top speed.",
    nextOptions: [
      { id: "faq-1", text: "What is Bricklix, and who is it for?" },
      { id: "faq-7", text: "How secure is Bricklix, and how is my data protected?" },
      { id: "faq-9", text: "What kind of support does Bricklix offer?" }
    ]
  }
];
const STORAGE_KEY = "bricklixbotState";


// --- Core Chatbot Component ---

const BricklixbotApp = () => {
  // Scroller reference to keep the latest message in view
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 8. Smooth Scroll (Implemented here) ---
  const scrollToBottom = () => {
    // Used 'auto' instead of 'smooth' for initial load stability, but 'smooth' for subsequent updates.
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define Contact Steps for the Handoff Flow
  type ContactStep =
    | "main"
    | "collect_name"
    | "collect_email"
    | "collect_phone"
    | "collect_purpose"
    | "lead_sent"
    | "services"
    | "faq_list" // New step for the main FAQ list
    | "faq_detail"
    | "chat_mode";

  // --- 2. Saving the state on which user was (Refined State Management) ---
  // Function to safely initialize state from LocalStorage
  const getInitialState = () => {
    try {
      const storedState = localStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const parsed = JSON.parse(storedState);
        // Only restore messages that were simple strings (ReactNodes cannot be saved easily)
        const restoredMessages: Message[] = parsed.messages
          .map((msg: any) => ({
            ...msg,
            text: typeof msg.text === "string" ? msg.text : null,
          }))
          .filter((msg: Message) => typeof msg.text === "string");

        return {
          isOpen: parsed.isOpen || false, // Restore open state
          messages: restoredMessages,
          currentStep: parsed.currentStep || ("main" as ContactStep),
          detailId: parsed.detailId,
          contactInfo: parsed.contactInfo || {
            name: "",
            email: "",
            phone: "",
            purpose: "",
          },
          isInputLocked: parsed.isInputLocked || false,
          // New state to help with back navigation
          history: parsed.history || ([] as ContactStep[]), 
        };
      }
    } catch (error) {
      console.error("Error loading state from LocalStorage:", error);
    }
    // Default initial state
    return {
      isOpen: false,
      messages: [] as Message[],
      currentStep: "main" as ContactStep,
      detailId: null as string | null,
      contactInfo: {
        name: "Alex",
        email: "alex@email.com",
        phone: "1 (800) 555-0123",
        purpose: "I want to learn more about the services you offer",
      } as ContactInfo,
      isInputLocked: false,
      history: [] as ContactStep[], // Initialize history
    };
  };

  // State Initialization
  const initialState = getInitialState();
  const [isOpen, setIsOpen] = useState<boolean>(initialState.isOpen);
  const [messages, setMessages] = useState<Message[]>(initialState.messages);
  const [currentStep, setCurrentStep] = useState<ContactStep>(
    initialState.currentStep
  );
  const [detailId, setDetailId] = useState<string | null>(
    initialState.detailId
  );
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    initialState.contactInfo
  );
  const [isInputLocked, setIsInputLocked] = useState<boolean>(
    initialState.isInputLocked
  );
  const [inputText, setInputText] = useState("");
  const [hasInitialGreeting, setHasInitialGreeting] = useState(false);
  // --- Back Navigation State ---
  const [history, setHistory] = useState<ContactStep[]>(initialState.history); 

  // History management
  const updateStep = useCallback((newStep: ContactStep, clearHistory = false) => {
      setHistory((prevHistory) => {
        // Only push to history if the step is different from the last one and not a temporary/input step
        const lastStep = prevHistory[prevHistory.length - 1];
        if (newStep !== lastStep && !newStep.startsWith("collect_") && newStep !== "lead_sent") {
          return clearHistory ? [newStep] : [...prevHistory, newStep];
        }
        return prevHistory;
      });
      setCurrentStep(newStep);
  }, []);

  // --- 7. Back Navigation Handler ---
  const handleBack = () => {
    // 1. Pop the current step off the history array
    setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        // Only pop if the current step is the last one in history
        if (newHistory[newHistory.length - 1] === currentStep) {
            newHistory.pop();
        }

        const previousStep = newHistory[newHistory.length - 1] || "main";
        
        // 2. Set the current step to the previous one
        setCurrentStep(previousStep);
        // Reset detailId when moving back from a detail view
        if (previousStep === "services" || previousStep === "faq_list") {
            setDetailId(null);
        }

        // 3. Add a bot message reflecting the return to the main menu
        const backMessage = (
            <div className="text-sm italic text-gray-500">
                You returned to the **{previousStep === "main" ? "Main Menu" : previousStep.replace('_', ' ').toUpperCase()}**.
            </div>
        );
        addBotMessage(backMessage, { step: previousStep });
        
        return newHistory;
    });
  };

  // Helper to add bot messages (Refactored to use updateStep)
  const addBotMessage = useCallback(
    (
      text: React.ReactNode,
      options: { options?: any; step?: ContactStep; isPlaceholder?: boolean } = {}
    ) => {
      const message: Message = {
        id: Date.now(),
        sender: "bot",
        text: text,
        options: options.options,
        step: options.step || "main",
        isPlaceholder: options.isPlaceholder || false,
      };
      setMessages((prev) => [...prev, message]);
      
      // Update the step in state, using the provided step
      if (options.step) {
          updateStep(options.step);
      }

      return message.id;
    },
    [updateStep]
  );

  // --- useEffect 1: Initial Greeting Logic ---
  useEffect(() => {
    // If chat is open and we haven't shown the first greeting yet
    if (isOpen && messages.length === 0 && !hasInitialGreeting) {
      const dynamicGreeting = `Hello! I'm Bricklixbot. Since you are exploring our **${CURRENT_PAGE}**, how can I help guide your next development decision?`;
      // Use updateStep for initial greeting to set the first history item
      updateStep("main", true); // Clear history and start at main
      addBotMessage(dynamicGreeting, { step: "main" });
      setHasInitialGreeting(true);
    }
  }, [isOpen, messages.length, hasInitialGreeting, addBotMessage, updateStep]);

  // --- useEffect 2: Smooth Scroll to bottom whenever messages change ---
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- useEffect 3: Save State on Change ---
  useEffect(() => {
    const stateToSave = {
      isOpen,
      // Filter out ReactNode or complex objects before saving messages
      messages: messages
        .map((msg) => ({
          ...msg,
          text: typeof msg.text === "string" ? msg.text : "", // Only save string part of text
        }))
        .filter((msg) => msg.text.length > 0), // Only save messages that were simple strings
      currentStep,
      detailId,
      contactInfo,
      isInputLocked,
      history, // Save history state
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Error saving state to LocalStorage:", error);
    }
  }, [isOpen, messages, currentStep, detailId, contactInfo, isInputLocked, history]);

  // --- GEMINI/AI HANDLERS (No Change) ---
  const handleIdeaGeneration = async (serviceName: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const systemPrompt = `You are an expert AI development and automation consultant. The user is exploring our "${serviceName}" service. Provide 3 high-impact, specific project ideas for a mid-sized business that leverage this service. Each idea should be a maximum of 2 sentences. Start with a positive, encouraging tone.`;
    const userQuery = `Generate 3 project ideas for the service: ${serviceName}.`;

    // Add a placeholder message for the bot's response
    const placeholderId = addBotMessage(
      <Loader className="w-5 h-5 animate-spin mx-auto" />,
      { isPlaceholder: true, step: currentStep } // Preserve current step
    );

    try {
      const aiResponse = await callGeminiAPI(userQuery, systemPrompt);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, text: aiResponse, isPlaceholder: false }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? {
                ...msg,
                text: "Sorry, I couldn't generate ideas right now. Please try again later.",
                isPlaceholder: false,
              }
            : msg
        )
      );
      console.error("AI Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatQuestion = async (userQuestion: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const systemPrompt = `You are a helpful and knowledgeable chatbot for Bricklix, a company specializing in AI, automation, and software development. Answer the user's question directly and concisely, using a friendly and professional tone. Keep the answer brief (max 3-4 sentences). The company specializes in: ${SERVICES_DATA.map(s => s.name).join(', ')}.`;
    const userQuery = `The user asks: "${userQuestion}"`;

    // Add a placeholder message for the bot's response
    const placeholderId = addBotMessage(
      <Loader className="w-5 h-5 animate-spin mx-auto" />,
      { isPlaceholder: true, step: "chat_mode" }
    );

    try {
      const aiResponse = await callGeminiAPI(userQuery, systemPrompt);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, text: aiResponse, isPlaceholder: false, step: "chat_mode" }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? {
                ...msg,
                text: "Sorry, I had trouble finding an answer. Try rephrasing your question or selecting one of the main options below.",
                isPlaceholder: false,
                step: "chat_mode"
              }
            : msg
        )
      );
      console.error("AI Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // --- LEAD CAPTURE HANDLERS (Slightly Refactored to use updateStep) ---

  const startLeadCapture = () => {
    setIsInputLocked(false);
    setContactInfo({ name: "", email: "", phone: "", purpose: "" });
    updateStep("collect_name"); // Use updateStep
    addBotMessage(
      "To connect you with an expert, I'll need some quick details. What is your **full name**?",
      { step: "collect_name" }
    );
  };
  
  // --- 5. Resend Functionality (Logic Refinement in handleInputSubmit) ---
  // Main input handler for the contact form
  const handleInputSubmit = async () => {
    if (isLoading || !inputText.trim()) return;

    const userResponse = inputText.trim();
    setInputText(""); // Clear input

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: userResponse },
    ]);
    
    // Check if we are in the lead capture flow
    if (currentStep.startsWith("collect_")) {
        setIsLoading(true);

        setTimeout(async () => {
          let nextStep: ContactStep = currentStep;
          let botMessage: string | React.ReactNode = "";
          let validationError = "";
          let updateInfo: Partial<ContactInfo> = {};

          switch (currentStep) {
            case "collect_name":
              if (userResponse.length < 2) {
                validationError = "Please enter a valid name.";
              } else {
                updateInfo = { name: userResponse };
                botMessage =
                  "Thank you, **" +
                  userResponse +
                  "**. What is your **email address**?";
                nextStep = "collect_email";
              }
              break;
            case "collect_email":
              // Simple email validation regex
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(userResponse)) {
                validationError =
                  "Please enter a valid email address (e.g., user@domain.com).";
              } else {
                updateInfo = { email: userResponse };
                botMessage =
                  "Got it. What is the best **phone number** to reach you at?";
                nextStep = "collect_phone";
              }
              break;
            case "collect_phone":
              // Simple phone number check (at least 7 digits)
              const digitsOnly = userResponse.replace(/\D/g, '');
              if (digitsOnly.length < 7) {
                validationError =
                  "Please enter a valid phone number (at least 7 digits).";
              } else {
                updateInfo = { phone: userResponse };
                botMessage =
                  "Finally, in one sentence, what is the **purpose** of your inquiry? (e.g., 'I need a custom ERP system.')";
                nextStep = "collect_purpose";
              }
              break;
            case "collect_purpose":
              if (userResponse.length < 5) {
                validationError =
                  "Please describe your purpose in a little more detail.";
              } else {
                updateInfo = { purpose: userResponse };
                nextStep = "lead_sent"; // Final step before submitting
              }
              break;
            default:
              validationError = "Invalid state. Please try again or refresh.";
              nextStep = "main";
              break;
          }

          if (validationError) {
            addBotMessage(validationError, { step: currentStep });
            setIsLoading(false);
          } else {
            // Update temporary state for the next message/step
            const finalContactInfo = { ...contactInfo, ...updateInfo };
            setContactInfo(finalContactInfo);
            updateStep(nextStep);

            if (nextStep === "lead_sent") {
              // Lock input and show final message
              setIsInputLocked(true);

              addBotMessage(
                <div className="text-left">
                  <h3 className="font-bold text-red-600">
                    ✅ Information Complete!
                  </h3>
                  <p>Sending your details now. We'll be in touch shortly.</p>
                  <ul className="mt-2 text-xs p-0 list-none">
                    <li className="flex items-center">
                      <User2 className="w-3 h-3 mr-1" />
                      Name: **{finalContactInfo.name}**
                    </li>
                    <li className="flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      Email: **{finalContactInfo.email}**
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      Phone: **{finalContactInfo.phone}**
                    </li>
                    <li className="mt-1">Purpose: *{finalContactInfo.purpose}*</li>
                  </ul>
                </div>,
                { step: "lead_sent" }
              );

              // --- 5. Send to Resend API ---
              const success = await sendLeadEmail(finalContactInfo);
              setIsLoading(false); // Done with all async work

              if (success) {
                addBotMessage(
                  <>
                    Success! Your request has been forwarded to our sales team. An expert will contact you within one business hour.
                    <div className="mt-2">
                        <a 
                            href={`https://wa.me/12248445596?text=Hello%2C%20I%20just%20submitted%20a%20inquiry%20via%20your%20chatbot.%20My%20name%20is%20${encodeURIComponent(finalContactInfo.name)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat with us on WhatsApp
                        </a>
                    </div>
                  </>,
                  { step: "main" }
                );
              } else {
                addBotMessage(
                  "I encountered an error sending the email. Please try again or navigate to our **Contact Page**.",
                  { step: "main" }
                );
              }

              // After successful submission/error, return to main flow
              setCurrentStep("main");
              setIsInputLocked(false);
            } else {
              addBotMessage(botMessage, { step: nextStep });
              setIsLoading(false);
            }
          }
        }, 500);
    } else {
      // --- GEMINI Q&A MODE ---
      // If not in a menu or lead capture, use the input as a question for Gemini
      updateStep("chat_mode");
      handleChatQuestion(userResponse);
    }
  };

  // --- 3. Reply to FAQs & 4. Reply to Services (Via handleAction) ---
  const handleAction = (action: Action) => {
    // Prevent interaction while loading
    if (isLoading) return;
    
    // Add user message for the selected option
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: action.text },
    ]);

    switch (action.action) {
      case "start_lead_capture":
        startLeadCapture();
        break;

      case "back_to_main":
        // This is handled by a separate function to manage history correctly
        handleBack();
        break;
        
      case "back_to_services_list":
        updateStep("services");
        setDetailId(null);
        addBotMessage("Here is the full list of our services again:", { step: "services" });
        break;
        
      case "back_to_faq_list":
        updateStep("faq_list");
        setDetailId(null);
        addBotMessage("What FAQ topic would you like to explore next?", { step: "faq_list" });
        break;

      // --- Services Logic ---
      case "services":
        updateStep("services");
        addBotMessage(
          "Great! What category of development or solution are you interested in? Select an option below or ask me a question about them.",
          { step: "services" }
        );
        break;

      case "service_detail":
        const service = SERVICES_DATA.find((s) => s.id === action.detailId);
        if (service) {
          setDetailId(service.id);
          updateStep("services"); // Stay in 'services' mode but set detailId
          addBotMessage(
            <div className="text-left">
              <h3 className="font-bold text-lg text-red-600 flex items-center mb-1">
                {service.icon} {service.name}
              </h3>
              <p className="font-semibold mt-2">Overview:</p>
              <p className="text-sm italic">{service.overview}</p>
              <p className="font-semibold mt-2">Our Process:</p>
              <p className="text-sm italic">{service.process}</p>
              <p className="mt-3 font-semibold text-gray-700">Ready to explore project ideas or contact sales?</p>
            </div>,
            { step: "services" }
          );
        }
        break;
        
      case "generate_ideas":
        if (action.serviceName) {
          handleIdeaGeneration(action.serviceName);
        }
        break;
        
      // --- FAQ Logic ---
      case "faq":
        updateStep("faq_list");
        setDetailId(null);
        addBotMessage(
          "Here are our most frequently asked questions. Select a topic to learn more:",
          { step: "faq_list" }
        );
        break;

      case "faq_detail":
        const faq = FAQ_DATA.find((f) => f.id === action.detailId);
        if (faq) {
          setDetailId(faq.id);
          updateStep("faq_detail");
          addBotMessage(
            <div className="text-left">
              <h3 className="font-bold text-red-600 mb-1">Q: {faq.q}</h3>
              <p className="text-sm">{faq.a}</p>
              <p className="mt-3 font-semibold text-gray-700">What next?</p>
            </div>,
            { options: faq.nextOptions.map(opt => ({ ...opt, action: "faq_detail" })), step: "faq_detail" }
          );
        }
        break;

      default:
        addBotMessage("I'm not sure how to handle that action. Please choose from the options below or ask a question.", { step: "main" });
        break;
    }
  };


  // Available Actions based on current step
  const getAvailableActions = (): Action[] => {
    // If in the contact form flow, do not show any buttons
    if (currentStep.startsWith("collect_") || currentStep === "lead_sent" || isLoading) {
      return [];
    }
    
    // Back to main button logic
    const showBackToMain = currentStep !== "main" && currentStep !== "chat_mode";
    
    // Helper action for back navigation
    const backAction: Action[] = showBackToMain
        ? [{
            id: "back_action",
            text: (<><ChevronLeft className="w-4 h-4 mr-1 inline" /> Back</>),
            action: "back_to_main", // Custom action handler for history
          }]
        : [];


    // Case: Main Menu or Chat Mode
    if (currentStep === "main" || currentStep === "chat_mode") {
      return [
        {
          id: "view_services",
          text: (
            <>
              <Briefcase className="w-4 h-4 mr-2 inline" />
              Our Services
            </>
          ),
          action: "services",
        },
        {
          id: "view_faq",
          text: (
            <>
              <HelpCircle className="w-4 h-4 mr-2 inline" />
              Knowledge Base (FAQ)
            </>
          ),
          action: "faq",
        },
        // This button starts the lead capture flow
        {
          id: "human_handoff",
          text: (
            <>
              <Phone className="w-4 h-4 mr-2 inline" />
              Contact Sales
            </>
          ),
          action: "start_lead_capture",
        },
      ];
    }

    // Case: Showing a list of all services
    if (currentStep === "services" && !detailId) {
      const serviceActions: Action[] = SERVICES_DATA.map((s) => ({
        id: `service_detail_${s.id}`,
        text: (
          <>
            {s.icon} {s.name}
          </>
        ),
        action: "service_detail",
        detailId: s.id,
      }));
      return [...backAction, ...serviceActions];
    }

    // Case: Showing detail for a specific service
    if (currentStep === "services" && detailId) {
      const service = SERVICES_DATA.find((s) => s.id === detailId);
      if (service) {
        return [
          {
            id: "generate_ideas",
            text: (
              <>
                <Zap className="w-4 h-4 mr-2 inline" />✨ Get Project Ideas
              </>
            ),
            action: "generate_ideas",
            serviceName: service.name,
          },
          {
            id: "back_to_services_list",
            text: (
                <>
                    <ChevronLeft className="w-4 h-4 mr-1 inline" /> Back to Services List
                </>
            ),
            action: "back_to_services_list",
          },
          // Add Contact Sales option here too
          {
            id: "human_handoff_detail",
            text: (
              <>
                <Phone className="w-4 h-4 mr-2 inline" />
                Contact Sales
              </>
            ),
            action: "start_lead_capture",
          },
        ];
      }
    }
    
    // Case: Showing a list of FAQs
    if (currentStep === "faq_list" && !detailId) {
        const faqActions: Action[] = FAQ_DATA.map((f) => ({
            id: `faq_detail_${f.id}`,
            text: f.q,
            action: "faq_detail",
            detailId: f.id,
        }));
        return [...backAction, ...faqActions];
    }
    
    // Case: Showing detail for a specific FAQ
    if (currentStep === "faq_detail" && detailId) {
        const faq = FAQ_DATA.find((f) => f.id === detailId);
        if (faq && faq.nextOptions) {
            const nextFaqActions: Action[] = faq.nextOptions.map((opt) => ({
                id: opt.id,
                text: opt.text,
                action: "faq_detail",
                detailId: opt.id,
            }));
            
            return [
                ...nextFaqActions,
                {
                    id: "back_to_faq_list",
                    text: (
                        <>
                            <ChevronLeft className="w-4 h-4 mr-1 inline" /> Back to All FAQs
                        </>
                    ),
                    action: "back_to_faq_list",
                },
                {
                    id: "back_to_main_from_faq",
                    text: (
                        <>
                            <ArrowLeft className="w-4 h-4 mr-1 inline" /> Main Menu
                        </>
                    ),
                    action: "back_to_main",
                },
            ];
        }
    }

    // Default: Back to main menu
    return showBackToMain ? backAction : [];
  };

  const actions = getAvailableActions();
  
  // --- Component Rendering ---
  return (
    <>
      {/* 1. Chatbot Icon Breathing Style Injection */}
      <style>{breathingAnimation}</style>
      
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 breathe"
            aria-label="Open Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        )}

        {isOpen && (
          <div className="w-80 h-[500px] flex flex-col bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header with Back Navigation */}
            <div className="flex items-center justify-between p-4 bg-red-600 text-white shadow-md">
              <div className="flex items-center">
                {/* 6. Back Navigation in Main Heading */}
                {history.length > 1 && (
                    <button 
                        onClick={handleBack} 
                        className="mr-2 p-1 rounded-full hover:bg-red-700 transition-colors"
                        aria-label="Back"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}
                <MessageSquareText className="w-6 h-6 mr-2" />
                <h3 className="font-bold text-lg">Bricklixbot</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-red-700 transition-colors"
                aria-label="Close Chatbot"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-red-100 text-gray-800 rounded-br-none"
                        : "bg-gray-100 text-gray-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions/Options Area */}
            <div className="p-4 border-t border-gray-200">
              {/* Conditional Actions (Buttons) */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    disabled={isLoading}
                    className={`flex items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors ${
                      isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-red-500 hover:text-white text-gray-800"
                    }`}
                  >
                    {action.text}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              {(!isInputLocked || currentStep.startsWith("collect_")) && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleInputSubmit();
                  }}
                  className="flex"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isLoading
                        ? "Waiting for response..."
                        : currentStep.startsWith("collect_")
                        ? "Type your answer here..."
                        : "Ask a quick question or select an option"
                    }
                    disabled={isLoading || isInputLocked}
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || isInputLocked || !inputText.trim()}
                    className={`p-2 rounded-r-lg text-white transition-colors ${
                      isLoading || isInputLocked || !inputText.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    aria-label="Send Message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      
    </>
  );
};

export default BricklixbotApp;