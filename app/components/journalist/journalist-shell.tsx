"use client";

export default function JournalistShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  return (
    <div className="min-h-screen">
      {/* Journalist navigation */}
      <main>
        {children}
      </main>
    </div>
  );
}