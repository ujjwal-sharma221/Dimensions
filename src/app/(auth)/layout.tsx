import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="p-4">
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
