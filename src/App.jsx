import React, { useState } from "react";

const pozePrincipale = [
  "/poza1.jpg",
  "/poza2.jpg",
  "/poza3.jpg",
  "/poza4.jpg",
];

const pozeComplete = [
  "/poza1.jpg",
  "/poza2.jpg",
  "/poza3.jpg",
  "/poza4.jpg",
  "/poza5.jpg",
  "/poza6.jpg",
];

export default function App() {
  const [pagina, setPagina] = useState("home"); // home | galerie | programare
  const [modalImg, setModalImg] = useState(null);

  const openModal = (src) => setModalImg(src);
  const closeModal = () => setModalImg(null);
  const goTo = (page) => {
    setPagina(page);
    closeModal();
    window.scrollTo(0, 0);
  };

  const wrapperStyle = {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #8B0000, #2F4F4F)",
    color: "#F5F5F5",
    fontFamily:
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const Header = () => (
    <header
      style={{
        width: "100%",
        padding: "40px 0 20px",
        textAlign: "center",
        borderBottom: "3px solid #A52A2A",
        backgroundColor: "rgba(47, 79, 79, 0.85)",
        boxSizing: "border-box",
      }}
    >
      <img
        src="/logo.png"
        alt="MXFSeven Logo"
        style={{
          height: 200,
          marginBottom: 20,
          objectFit: "contain",
          userSelect: "none",
        }}
        draggable={false}
      />
      <h1
        style={{
          margin: 0,
          fontWeight: "900",
          fontSize: "3rem",
          color: "#FFC0CB",
          userSelect: "none",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        MXF SEVEN - Detailing Interior
      </h1>
    </header>
  );

  const Button = ({ onClick, children, ariaLabel }) => (
    <button
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
        transition: "background-color 0.25s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#A52A2A")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B0000")}
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
          Galerie Mașini Detailing
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 24,
            cursor: "pointer",
          }}
        >
          {pozePrincipale.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Mașina ${i + 1}`}
              style={{
                width: "100%",
                borderRadius: 18,
                boxShadow: "0 6px 18px rgba(139, 0, 0, 0.7)",
                objectFit: "cover",
                aspectRatio: "4 / 3",
                transition: "transform 0.3s",
                userSelect: "none",
              }}
              onClick={() => openModal(src)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              draggable={false}
            />
          ))}
        </div>

        <Button onClick={() => goTo("galerie")} ariaLabel="Vezi toate pozele">
          Vezi toate pozele
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
          Servicii Detailing Interior
        </h2>
        <ul style={{ marginTop: 20, paddingLeft: 25 }}>
          <li>Curățare tapițerie și covorașe</li>
          <li>Curățare și hidratare bord și plastic</li>
          <li>Curățare piele și protecție cu produse specializate</li>
          <li>Curățare geamuri și oglinzi</li>
          <li>Dezodorizare și eliminare mirosuri neplăcute</li>
        </ul>
        <p
          style={{
            marginTop: 30,
            fontWeight: "700",
            fontSize: "1.3rem",
            color: "#FF7F7F",
          }}
        >
          Prețurile variază în funcție de gradul de murdărie și complexitatea
          serviciilor solicitate.
        </p>
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
          Contact & Programare
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

        <Button onClick={() => goTo("programare")} ariaLabel="Buton programare">
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
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
        Galerie completă MXFSEVEN
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
        {pozeComplete.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Mașina ${i + 1}`}
            style={{
              width: "100%",
              borderRadius: 18,
              boxShadow: "0 6px 18px rgba(139, 0, 0, 0.7)",
              objectFit: "cover",
              aspectRatio: "4 / 3",
              cursor: "pointer",
              transition: "transform 0.3s",
              userSelect: "none",
            }}
            onClick={() => openModal(src)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            draggable={false}
          />
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
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
        Fă-ți o programare la MXF SEVEN
      </h1>

      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: 700,
          marginBottom: 30,
        }}
      >
        Pentru a-ți face o programare rapidă și comodă, poți alege una dintre
        următoarele metode de contact:
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
          }}
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
          }}
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
          }}
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
    <div style={wrapperStyle}>
      <Header />
      {pagina === "home" && <Home />}
      {pagina === "galerie" && <Galerie />}
      {pagina === "programare" && <Programare />}

      {modalImg && (
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
          <img
            src={modalImg}
            alt="Imagine mărită"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 15,
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      )}

      <footer
        style={{
          width: "100%",
          padding: 25,
          textAlign: "center",
          borderTop: "3px solid #A52A2A",
          backgroundColor: "rgba(47, 79, 79, 0.9)",
          color: "#FFC0CB",
          fontSize: "1rem",
          userSelect: "none",
          marginTop: "auto",
        }}
      >
        <p style={{ margin: 0, paddingBottom: 5 }}>
          © Toate drepturile rezervate MXF SEVEN
        </p>
        <p style={{ margin: 0 }}>
          Telefon:{" "}
          <a href="tel:+40740591626" style={{ color: "#FFC0CB" }}>
            0740 591 626
          </a>
        </p>
      </footer>
    </div>
  );
}
