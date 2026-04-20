export default function SuspendedPage() {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1>Website Temporarily Unavailable</h1>
      <p>
        This website has been temporarily suspended due to an unresolved billing issue.
      </p>
      <p>Please contact the site owner for more information.</p>
    </div>
  );
}