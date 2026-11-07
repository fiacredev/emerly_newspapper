const footerSections = [
  "About",
  "Careers",
  "Contact",
  "Ethics Policy",
  "Help",
  "Privacy",
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-[1160px] px-4 py-8">
        <p className="text-xs text-gray-500">© 2026 The Washington Post. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {footerSections.map((section) => (
            <span key={section} className="text-xs font-medium text-gray-500">
              {section}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
