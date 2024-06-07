import axios from "axios";

export default function Home() {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("/api/upload", {
          body: formData,
        });
        alert("성공");
      } catch (error) {
        console.log(error);
        alert("실패");
      }
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <input type="file" onChange={onChange} />
    </main>
  );
}
