import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.location.replace("/neohack.html");
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>NEOHACK</div>
        <div style={{ fontSize: 18 }}>
          Načítavam Energetický Kompas…
        </div>
        <div style={{ marginTop: 12, fontSize: 14, opacity: 0.7 }}>
          Ak sa nenačíta automaticky,{" "}
          <a href="/neohack.html" style={{ color: "#F59E0B" }}>
            kliknite sem
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Index;
