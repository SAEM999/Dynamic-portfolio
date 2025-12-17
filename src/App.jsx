import React, { useState, useEffect, useRef } from 'react';

const AnimatedPortfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Money Manager",
      description: "Full-stack personal finance application tracking income, expenses, and transaction history with real-time analytics.",
      tech: ["React", "Spring Boot", "MySQL", "Vercel"],
      link: "https://money-managerr-woad.vercel.app",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "SD Zone",
      description: "Real-time stock market analytics platform with buy/sell signals. Features a Pine Script algorithm achieving 89% accuracy.",
      tech: ["Node.js", "MySQL", "Razorpay", "Pine Script"],
      link: "https://sdzone.shop",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Personal Portfolio",
      description: "Modern portfolio showcasing projects and skills with dynamic data management and contact form integration.",
      tech: ["React", "Spring Boot", "MySQL", "Vercel"],
      link: "https://github.com/SAEM999",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "Spring Boot", level: 85 },
    { name: "MySQL", level: 82 },
    { name: "Tailwind CSS", level: 90 },
    { name: "HTML/CSS", level: 95 },
    { name: "Git/GitHub", level: 85 },
    { name: "Node.js", level: 80 }
  ];

  const experiences = [
    {
      company: "AppSquadz",
      role: "Front-End Developer Intern",
      period: "2024 – Present",
      location: "Noida, Uttar Pradesh",
      description: "Developed responsive UI components using React and Tailwind CSS. Optimized JavaScript performance and integrated MongoDB."
    },
    {
      company: "VMM Education",
      role: "Front-End Developer Trainee",
      period: "Jun 2021 – Sep 2021",
      location: "Amritsar, Punjab",
      description: "Built responsive web pages using HTML5, CSS3, JavaScript, and jQuery. Collaborated with Git and performed cross-browser testing."
    }
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xnqelabc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      const mailtoLink = `mailto:saemsheikh777@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', message: '' });
      setFormStatus('');
    }
  };

  return (
    <div className="portfolio-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;500;600;700;900&family=Syne:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .portfolio-container {
          font-family: 'Syne', sans-serif;
          color: #e0e0e0;
          background: #000000;
          min-height: 100vh;
          position: relative;
          scroll-behavior: smooth;
        }

        /* Animated Background */
        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 20s infinite ease-in-out;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #f97316, #ea580c);
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #7c3aed, #6d28d9);
          bottom: 20%;
          right: 10%;
          animation-delay: 5s;
        }

        .blob-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #f59e0b, #d97706);
          top: 50%;
          left: 50%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(100px, -100px) scale(1.1);
          }
          66% {
            transform: translate(-100px, 100px) scale(0.9);
          }
        }

        .parallax-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: transform 0.1s ease-out;
          z-index: 1;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        /* Navigation */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideDown 0.8s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f97316, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          color: #e0e0e0;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          position: relative;
          transition: color 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #7c3aed);
          transition: width 0.3s;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* Content Container */
        .content {
          position: relative;
          z-index: 10;
        }

        /* Section Base */
        section {
          min-height: 100vh;
          padding: 6rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-container {
          max-width: 1200px;
          width: 100%;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: 8rem;
        }

        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff, #f97316, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleReveal 1.2s ease-out;
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 400;
          color: #b0b0b0;
          margin-bottom: 3rem;
          animation: subtitleReveal 1.2s ease-out 0.3s both;
        }

        @keyframes subtitleReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: buttonsReveal 1.2s ease-out 0.6s both;
        }

        @keyframes buttonsReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
          font-family: 'Syne', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #000;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          transition: left 0.4s;
          z-index: -1;
        }

        .btn-primary:hover::before {
          left: 0;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.5);
        }

        .btn-secondary {
          background: transparent;
          color: #f97316;
          border: 2px solid #f97316;
        }

        .btn-secondary:hover {
          background: rgba(249, 115, 22, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.2);
        }

        /* About Section */
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-text h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #f97316, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-text p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #b0b0b0;
          margin-bottom: 1.5rem;
        }

        .about-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.4s;
          cursor: pointer;
        }

        .about-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.2);
          border-color: rgba(249, 115, 22, 0.5);
        }

        .about-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #f97316;
        }

        .about-card p {
          color: #b0b0b0;
          line-height: 1.6;
        }

        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .skill-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 2rem;
          transition: all 0.4s;
        }

        .skill-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.3);
          border-color: rgba(124, 58, 237, 0.5);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .skill-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
        }

        .skill-percent {
          font-size: 1rem;
          color: #7c3aed;
          font-weight: 700;
        }

        .skill-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #f97316, #7c3aed);
          border-radius: 10px;
          transition: width 1s ease-out;
          position: relative;
          animation: skillGlow 2s ease-in-out infinite;
        }

        @keyframes skillGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.8);
          }
        }

        /* Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
          margin-top: 3rem;
        }

        .project-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 2.5rem;
          transition: all 0.4s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          z-index: 20;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent, rgba(249, 115, 22, 0.1));
          opacity: 0;
          transition: opacity 0.4s;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 70px rgba(249, 115, 22, 0.3);
          border-color: rgba(249, 115, 22, 0.8);
        }

        .project-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
        }

        .project-description {
          color: #b0b0b0;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .tech-badge {
          padding: 0.5rem 1rem;
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 20px;
          font-size: 0.85rem;
          color: #f97316;
          font-weight: 600;
          transition: all 0.3s;
        }

        .tech-badge:hover {
          background: rgba(249, 115, 22, 0.2);
          transform: scale(1.1);
        }

        .project-link {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: #fff;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s;
          pointer-events: none;
        }

        .project-card:hover .project-link {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5);
        }

        /* Experience Section */
        .timeline {
          position: relative;
          margin-top: 3rem;
          padding-left: 3rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #f97316, #7c3aed);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
          padding-left: 2rem;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -3.5rem;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #7c3aed);
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 30px rgba(124, 58, 237, 0.8);
          }
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s;
        }

        .timeline-content:hover {
          transform: translateX(10px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.2);
          border-color: rgba(249, 115, 22, 0.5);
        }

        .timeline-role {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .timeline-company {
          font-size: 1.2rem;
          color: #f97316;
          margin-bottom: 0.5rem;
        }

        .timeline-period {
          font-size: 0.9rem;
          color: #7c3aed;
          margin-bottom: 1rem;
        }

        .timeline-description {
          color: #b0b0b0;
          line-height: 1.7;
        }

        /* Contact Section */
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #f97316, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-info p {
          font-size: 1.2rem;
          color: #b0b0b0;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .contact-links {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .contact-link {
          width: 50px;
          height: 50px;
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
          font-size: 1.5rem;
          text-decoration: none;
          transition: all 0.3s;
        }

        .contact-link:hover {
          background: rgba(249, 115, 22, 0.2);
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 3rem;
          backdrop-filter: blur(10px);
        }

        .form-group {
          margin-bottom: 2rem;
          position: relative;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          color: #fff;
          font-size: 1rem;
          font-family: 'Syne', sans-serif;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .form-group label {
          position: absolute;
          left: 1.2rem;
          top: 1.2rem;
          color: #b0b0b0;
          font-size: 1rem;
          transition: all 0.3s;
          pointer-events: none;
        }

        .form-group input:focus + label,
        .form-group input:not(:placeholder-shown) + label,
        .form-group textarea:focus + label,
        .form-group textarea:not(:placeholder-shown) + label {
          top: -0.5rem;
          left: 1rem;
          font-size: 0.85rem;
          color: #f97316;
          background: #000;
          padding: 0 0.5rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1.2rem;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border: none;
          border-radius: 15px;
          color: #000;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Syne', sans-serif;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-status {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          font-weight: 600;
        }

        .form-status.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .form-status.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #f97316, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #b0b0b0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .about-content,
          .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-cards {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .timeline {
            padding-left: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
          }
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }

        .scroll-indicator::after {
          content: '↓';
          font-size: 2rem;
          color: #f97316;
        }
      `}</style>

      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div 
          className="parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          <div className="noise-overlay"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="logo">SAEM</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Content */}
      <div className="content">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="hero-section"
          ref={el => sectionsRef.current[0] = el}
        >
          <h1 className="hero-title">SAEM SHEIKH</h1>
          <p className="hero-subtitle">
            Building interactive web experiences with React
          </p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
          <div className="scroll-indicator"></div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          ref={el => sectionsRef.current[1] = el}
        >
          <div className="section-container">
            <div className="about-content">
              <div className="about-text">
                <h2>About Me</h2>
                <p>
                  Front-end developer passionate about creating intuitive and dynamic user experiences. Currently pursuing PG-DAC at C-DAC Noida while working as a developer intern.
                </p>
                <p>
                  I specialize in React, JavaScript, and Spring Boot, building full-stack applications that combine powerful functionality with seamless user interfaces.
                </p>
              </div>
              <div className="about-cards">
                <div className="about-card">
                  <h3>🎓 Education</h3>
                  <p>B.Tech Computer Science from Chandigarh University</p>
                  <p>PG-DAC at C-DAC, Noida</p>
                </div>
                <div className="about-card">
                  <h3>💼 Experience</h3>
                  <p>Front-End Developer Intern at AppSquadz</p>
                  <p>Building responsive UI with React & Tailwind</p>
                </div>
                <div className="about-card">
                  <h3>🚀 Focus</h3>
                  <p>Full-stack development with React, Spring Boot, and MySQL</p>
                </div>
                <div className="about-card">
                  <h3>🎯 Goal</h3>
                  <p>Creating production-ready web applications with exceptional UX</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          ref={el => sectionsRef.current[2] = el}
        >
          <div className="section-container">
            <div className="section-header">
              <h2>Technical Skills</h2>
              <p>Technologies I work with</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={el => sectionsRef.current[3] = el}
        >
          <div className="section-container">
            <div className="section-header">
              <h2>Featured Projects</h2>
              <p>My recent work</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <span className="project-link">
                    View Project →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          ref={el => sectionsRef.current[4] = el}
        >
          <div className="section-container">
            <div className="section-header">
              <h2>Work Experience</h2>
              <p>My professional journey</p>
            </div>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="timeline-role">{exp.role}</h3>
                    <h4 className="timeline-company">{exp.company}</h4>
                    <p className="timeline-period">{exp.period} • {exp.location}</p>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={el => sectionsRef.current[5] = el}
        >
          <div className="section-container">
            <div className="contact-container">
              <div className="contact-info">
                <h2>Let's Connect</h2>
                <p>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <p>
                  <strong>Email:</strong> saemsheikh777@gmail.com<br />
                  <strong>Phone:</strong> +91-7018814419<br />
                  <strong>Location:</strong> Mohali, Punjab
                </p>
                <div className="contact-links">
                  <a href="https://linkedin.com/in/saem" target="_blank" rel="noopener noreferrer" className="contact-link">in</a>
                  <a href="https://github.com/SAEM999" target="_blank" rel="noopener noreferrer" className="contact-link">gh</a>
                  <a href="mailto:saemsheikh777@gmail.com" className="contact-link">@</a>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder=" "
                    required
                  />
                  <label>Your Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder=" "
                    required
                  />
                  <label>Your Email</label>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder=" "
                    required
                  />
                  <label>Your Message</label>
                </div>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <div className="form-status success">
                    ✓ Message sent successfully!
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="form-status error">
                    ✗ Failed to send. Opening email client...
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;