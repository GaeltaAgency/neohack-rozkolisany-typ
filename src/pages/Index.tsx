import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.location.replace("/neohack.html");
  }, []);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      Načítavam dokument… Ak sa nenačíta automaticky,{" "}
      <a href="/neohack.html">kliknite sem</a>.
    </div>
  );
};

export default Index;
