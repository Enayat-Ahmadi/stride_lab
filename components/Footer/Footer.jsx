import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t mt-12 px-6 py-8 text-center">
      <div className="flex justify-center gap-6 mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-600 hover:text-black"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Sneakify. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
