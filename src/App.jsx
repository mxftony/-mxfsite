import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const instagramPostsComplete = [
  "https://www.instagram.com/reel/DLIVmsvtMxr/",
  "https://www.instagram.com/reel/DFNLltsNgt5/",
  "https://www.instagram.com/reel/DMkoQCDsK1J/",
  "https://www.instagram.com/reel/DF3YaKBNacL/",
  "https://www.instagram.com/reel/DFzuzKytlS8/",
  "https://www.instagram.com/reel/DF2T8cgt601/"
];

const postDescriptions = {
  "https://www.instagram.com/reel/DLIVmsvtMxr/": "Detailing auto mobil în Borșa, Maramureș - interior curățat perfect",
  "https://www.instagram.com/reel/DFNLltsNgt5/": "Produse detailing auto disponibile pe MXF Seven",
  "https://www.instagram.com/reel/DMkoQCDsK1J/": "Prezentare MXF Seven - servicii premium de detailing",
  "https://www.instagram.com/reel/DF3YaKBNacL/": "MXF Seven - detailing auto premium",
  "https://www.instagram.com/reel/DFzuzKytlS8/": "Servicii detailing MXF Seven",
  "https://www.instagram.com/reel/DF2T8cgt601/": "Curățare mașini la MXF Seven"
};

export default function App() {
  const [pagina, setPagina] = useState("home"); // home | galerie | programare
  const [modalPost, setModalPost] = useState(null);
  const [formData, setFormData] = useState({
    nume: '',
    telefon: '',
    email: '',
    mesaj: ''
  });
  const [instagramPostsPrincipale, setInstagramPostsPrincipale] = useState([]);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    // Select 4 random posts for home page
    const shuffled = [...instagramPostsComplete].sort(() => 0.5 - Math.random());
    setInstagramPostsPrincipale(shuffled.slice(0, 4));

    // Load Instagram embed script if not loaded
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        setEmbedLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setEmbedLoaded(true);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    if (embedLoaded && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [pagina, embedLoaded, modalPost]);

  const getEmbedCode = (url) => `
    <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
  `;

  const openModal = (url) => setModalPost(url);
  const closeModal = () => setModalPost(null);
  const goTo = (page) => {
    setPagina(page);
    closeModal();
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Programare trimisă! Vă vom contacta în cel mai scurt timp.');
    goTo('home');
  };

  const wrapperStyle = {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #8B0000, #2F4F4F)",
    color: "#F5F5F5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    border: '2px solid #A52A2A',
    backgroundColor: 'rgba(255,255,255,0.9)',
    fontSize: '1rem'
  };

  const embedContainerStyle = {
    width: '100%',
    maxWidth: '540px',
    margin: '0 auto',
    overflow: 'hidden',
    position: 'relative',
    paddingBottom: '125%', // Aspect ratio for Instagram posts (roughly 1:1.25 for reels)
  };

  const embedInnerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const Header = () => (
    <header
      style={{
        width: "100%",
        padding: "10px 0 5px",
        textAlign: "center",
        borderBottom: "3px solid #A52A2A",
        backgroundColor: "rgba(47, 79, 79, 0.85)",
        boxSizing: "border-box",
      }}
    >
      <img
        src="/logo.png"
        alt="MXF Seven Logo - Detailing Auto Premium Borșa"
        style={{
          height: 200,
          marginBottom: 10,
          objectFit: "contain",
          userSelect: "none",
          cursor: 'pointer',
        }}
        draggable={false}
        onClick={() => goTo('home')}
      />
      <h1
        style={{
          margin: 0,
          fontWeight: "900",
          fontSize: "2.5rem",
          color: "#FFC0CB",
          userSelect: "none",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        MXF SEVEN - Detailing Auto Mobil Premium Borșa Maramureș
      </h1>
      <nav style={{ marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
        {['home', 'galerie', 'programare'].map(page => (
          <button
            key={page}
            onClick={() => goTo(page)}
            style={{
              padding: '10px 25px',
              background: pagina === page ? '#A52A2A' : 'transparent',
              border: '2px solid #A52A2A',
              borderRadius: 20,
              color: '#FFE4E1',
              cursor: 'pointer',
              fontWeight: pagina === page ? 'bold' : 'normal',
              transition: 'all 0.3s',
              minWidth: 120
            }}
          >
            {page === 'home' && 'Acasă'}
            {page === 'galerie' && 'Galerie'}
            {page === 'programare' && 'Programare'}
          </button>
        ))}
      </nav>
    </header>
  );

  const Button = ({ onClick, children, ariaLabel, type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      style={{
        marginTop: 35,
        backgroundColor: "#8B0000",
        border: "none",
        borderRadius: 15,
        padding: "16px 45px",
        color: "#FFE4E1",
        fontWeight: "bold",
        fontSize: "1.2rem",
        cursor: "pointer",
        boxShadow: "0 0 25px rgba(139, 0, 0, 0.85)",
        transition: "background-color 0.25s ease, transform 0.2s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#A52A2A";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#8B0000";
        e.target.style.transform = "scale(1)";
      }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  const Home = () => (
    <>
      <section
        style={{
          width: "100%",
          padding: "30px 5vw",
          boxSizing: "border-box",
          maxWidth: 1600,
          marginTop: 40,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            borderBottom: "4px solid #A52A2A",
            paddingBottom: 12,
            color: "#FFDAB9",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Galerie Mașini Detailing Auto Borșa
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 24,
          }}
        >
          {instagramPostsPrincipale.map((url, i) => (
            <div
              key={url + i} // Unique key with url to force remount if random changes
              onClick={() => openModal(url)}
              style={{
                cursor: "pointer",
                borderRadius: 18,
                boxShadow: "0 6px 18px rgba(139, 0, 0, 0.7)",
                transition: "transform 0.3s",
                ...embedContainerStyle
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              title={postDescriptions[url]}
              aria-label={`Post Instagram detailing auto ${i + 1}`}
            >
              <div style={embedInnerStyle} dangerouslySetInnerHTML={{ __html: getEmbedCode(url) }} />
            </div>
          ))}
        </div>

        <Button onClick={() => goTo("galerie")} ariaLabel="Vezi toate postările Instagram">
          Vezi toate postările
        </Button>
      </section>

      <section
        style={{
          width: "90vw",
          maxWidth: 1200,
          backgroundColor: "rgba(47, 79, 79, 0.85)",
          borderRadius: 25,
          padding: 35,
          margin: "50px 0",
          boxShadow: "0 0 30px rgba(165, 42, 42, 0.8)",
          color: "#FFE4E1",
          fontSize: "1.2rem",
          lineHeight: 1.8,
          boxSizing: "border-box",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            borderBottom: "4px solid #A52A2A",
            paddingBottom: 14,
            marginTop: 0,
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Servicii Detailing Interior Premium Maramureș
        </h2>
        
        <div style={{ marginTop: 30 }}>
          {[
            {
              titlu: 'Curățare completă interior',
              descriere: 'Curățare profundă a tuturor suprafețelor inclusiv scaune, covorașe, plafonieră și zone greu accesibile',
              durata: '3-5 ore',
              pret: 'de la: sună pentru ofertă'
            },
            {
              titlu: 'Detailing piele',
              descriere: 'Curățare, hidratare și protecție pentru scaune și elemente din piele',
              durata: '2-3 ore',
              pret: 'de la: sună pentru ofertă'
            },
            {
              titlu: 'Pachet premium',
              descriere: 'Toate serviciile + tratament anti-bacterian și parfumare profesională',
              durata: '5-7 ore',
              pret: 'de la: sună pentru ofertă'
            }
          ].map((serviciu, i) => (
            <div key={i} style={{ 
              marginBottom: 25, 
              paddingBottom: 15, 
              borderBottom: '1px dashed #A52A2A' 
            }}>
              <h3 style={{ color: '#FFDAB9', fontSize: '1.5rem' }}>{serviciu.titlu}</h3>
              <p>{serviciu.descriere}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <span>⏱️ {serviciu.durata}</span>
                <span style={{ fontWeight: 'bold' }}>{serviciu.pret}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ 
        width: '90vw', 
        maxWidth: 1200, 
        backgroundColor: 'rgba(47, 79, 79, 0.85)', 
        borderRadius: 25, 
        padding: 35, 
        margin: '50px 0',
        boxShadow: '0 0 30px rgba(165, 42, 42, 0.8)'
      }}>
        <h2 style={{ borderBottom: '4px solid #A52A2A', paddingBottom: 14 }}>
          Ce spun clienții noștri despre serviciile de detailing auto
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 30 }}>
          {[
            { nume: 'Andrei M.', text: 'Cel mai bun detailing interior la care am fost! Mașina arată ca nouă.', rating: 5 },
            { nume: 'Elena D.', text: 'Profesionalism la cel mai înalt nivel. Recomand cu încredere!', rating: 5 },
            { nume: 'Cristian B.', text: 'Am fost impresionat de atenția la detalii. Voi reveni sigur.', rating: 4 }
          ].map((recenzie, i) => (
            <div key={i} style={{ 
              flex: '1 1 300px', 
              backgroundColor: 'rgba(139, 0, 0, 0.3)', 
              padding: 20, 
              borderRadius: 15,
              border: '1px solid #A52A2A'
            }}>
              <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: 10 }}>
                {'★'.repeat(recenzie.rating)}{'☆'.repeat(5-recenzie.rating)}
              </div>
              <p style={{ fontStyle: 'italic' }}>"{recenzie.text}"</p>
              <p style={{ fontWeight: 'bold', marginTop: 10 }}>- {recenzie.nume}</p>
            </div>
          ))}
        </div>
      </section>
      

      <section
        style={{
          width: "90vw",
          maxWidth: 600,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            borderBottom: "4px solid #A52A2A",
            paddingBottom: 12,
            color: "#FFDAB9",
            fontSize: "2rem",
            fontWeight: "700",
            userSelect: "none",
          }}
        >
          Contact & Programare Detailing Auto Borșa
        </h2>
        <p style={{ fontSize: "1.2rem", marginTop: 28 }}>
          Email:{" "}
          <a
            href="mailto:contact@mxfseven.com"
            style={{ color: "#FFB6C1", textDecoration: "none" }}
          >
            contact@mxfseven.com
          </a>
        </p>
        <p style={{ fontSize: "1.2rem" }}>
          Telefon:{" "}
          <a
            href="tel:+40740591626"
            style={{ color: "#FFB6C1", textDecoration: "none" }}
          >
            0740 591 626
          </a>
        </p>

        <Button onClick={() => goTo("programare")} ariaLabel="Buton programare detailing">
          Fă-ți o programare
        </Button>
      </section>
    </>
  );

  const Galerie = () => (
    <section
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: "40px 20px",
        background: "linear-gradient(135deg, #8B0000, #2F4F4F)",
        color: "#F5F5F5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          color: "#FFC0CB",
          userSelect: "none",
          textShadow: "2px 2px 4px #000000",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Galerie completă MXF SEVEN - Detailing Auto
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          width: "90vw",
          maxWidth: 1600,
        }}
      >
        {instagramPostsComplete.map((url, i) => (
          <div
            key={url + i}
            onClick={() => openModal(url)}
            style={{
              cursor: "pointer",
              borderRadius: 18,
              boxShadow: "0 6px 18px rgba(139, 0, 0, 0.7)",
              transition: "transform 0.3s",
              ...embedContainerStyle
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            title={postDescriptions[url]}
            aria-label={`Post Instagram mașină ${i + 1}`}
          >
            <div style={embedInnerStyle} dangerouslySetInnerHTML={{ __html: getEmbedCode(url) }} />
          </div>
        ))}
      </div>

      <Button onClick={() => goTo("home")} ariaLabel="Înapoi la pagina principală">
        Înapoi
      </Button>
    </section>
  );

  const Programare = () => (
    <section
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: "40px 20px",
        background: "linear-gradient(135deg, #8B0000, #2F4F4F)",
        color: "#F5F5F5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          color: "#FFC0CB",
          userSelect: "none",
          textShadow: "2px 2px 4px #000000",
          marginBottom: 40,
        }}
      >
        Fă-ți o programare la MXF SEVEN Detailing Auto
      </h1>

      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: 700,
          marginBottom: 30,
        }}
      >
        Completează formularul de mai jos pentru a rezerva o programare pentru detailing auto:
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600, width: '90%', margin: '30px 0' }}>
        <input
          type="text"
          name="nume"
          placeholder="Nume complet"
          value={formData.nume}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="telefon"
          placeholder="Telefon"
          value={formData.telefon}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="mesaj"
          placeholder="Detalii despre serviciile dorite (ex: detailing interior, curățare piele)"
          value={formData.mesaj}
          onChange={handleChange}
          rows="4"
          style={{ ...inputStyle, minHeight: 120 }}
        />
        <Button type="submit" ariaLabel="Trimite programarea">Trimite programarea</Button>
      </form>

      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: 700,
          margin: "30px 0",
        }}
      >
        Sau contactează-ne direct prin:
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 30,
          maxWidth: 700,
          width: "100%",
        }}
      >
        <a
          href="https://wa.me/40740591626"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: "#25D366",
            color: "white",
            padding: "15px 35px",
            borderRadius: 12,
            fontWeight: "700",
            fontSize: "1.2rem",
            textDecoration: "none",
            boxShadow: "0 0 15px #25D366",
            flex: "1 1 200px",
            userSelect: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Contactează pe WhatsApp"
        >
          WhatsApp
        </a>

        <a
          href="https://facebook.com/mxfseven7"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: "#1877F2",
            color: "white",
            padding: "15px 35px",
            borderRadius: 12,
            fontWeight: "700",
            fontSize: "1.2rem",
            textDecoration: "none",
            boxShadow: "0 0 15px #1877F2",
            flex: "1 1 200px",
            userSelect: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Pagina de Facebook"
        >
          Facebook
        </a>

        <a
          href="https://instagram.com/mxfseven"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: "#E1306C",
            color: "white",
            padding: "15px 35px",
            borderRadius: 12,
            fontWeight: "700",
            fontSize: "1.2rem",
            textDecoration: "none",
            boxShadow: "0 0 15px #E1306C",
            flex: "1 1 200px",
            userSelect: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Pagina de Instagram"
        >
          Instagram
        </a>
      </div>

      <Button onClick={() => goTo("home")} ariaLabel="Înapoi la pagina principală">
        Înapoi
      </Button>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>MXF Seven - Detailing Auto Mobil Premium în Borșa, Maramureș</title>
        <meta name="description" content="Servicii profesionale de detailing auto interior și exterior în Borșa, Maramureș. Curățare profundă, protecție piele, pachete premium. Programează-te acum la 0740 591 626." />
        <meta name="keywords" content="detailing auto Borsa, detailing interior Maramures, curatare masini premium, servicii detailing auto, detailing mobil Borsa, MXF Seven" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.mxfseven.com/" />
      </Helmet>
      <div style={wrapperStyle}>
        <Header />
        {pagina === "home" && <Home />}
        {pagina === "galerie" && <Galerie />}
        {pagina === "programare" && <Programare />}

        {modalPost && (
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "zoom-out",
              zIndex: 9999,
            }}
          >
            <div 
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: 15,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
                overflow: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: getEmbedCode(modalPost) }}
            />
          </div>
        )}

        <a 
          href="https://wa.me/40740591626" 
          target="_blank" 
          rel="noreferrer"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: '#25D366',
            color: 'white',
            width: 60,
            height: 60,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 0 20px rgba(37, 211, 102, 0.7)',
            zIndex: 1000,
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Contactează-ne pe WhatsApp"
        >
          <span style={{ marginTop: 5 }}>💬</span>
        </a>

        <footer
          style={{
            width: "100%",
            padding: "15px 25px",
            textAlign: "center",
            borderTop: "3px solid #A52A2A",
            backgroundColor: "rgba(47, 79, 79, 0.9)",
            color: "#FFC0CB",
            fontSize: "0.9rem",
            userSelect: "none",
            marginTop: "auto",
          }}
        >
          <p style={{ margin: 0 }}>
            © Toate drepturile rezervate MXF SEVEN | 
            Telefon: <a href="tel:+40740591626" style={{ color: "#FFC0CB", textDecoration: 'none' }}>0740 591 626</a>
          </p>
        </footer>
      </div>
    </>
  );
}