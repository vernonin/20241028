import Link from "next/link";
import Image from "next/image";

const socialList = [
  { label: "tikot", href: "/", iconPaht: "/tikot.svg" },
  { label: "instagram", href: "/", iconPaht: "/instagram.svg" },
  { label: "twitter", href: "/",iconPaht: "/twitter.svg" },
  { label: "youbute", href: "/", iconPaht: "/youbute.svg" },
]

const footerSheet = [
  {
    label: "Products",
    children: [
      { label: "Use cases", href: "/" },
      { label: "Chrome extension", href: "/" },
      { label: "API docs", href: "/" },
      { label: "Pricing", href: "/" },
      { label: "Video tutorials", href: "/" },
      { label: "Resources", href: "/" },
      { label: "Blog", href: "/" },
      { label: "FAQ", href: "/" },
    ]
  },
  {
    label: "We also built",
    children: [
      { label: "Resume AI Scanner", href: "/" },
      { label: "Invoice AI Scanner", href: "/" },
      { label: "AI Quiz Generator", href: "/" },
      { label: "QuickyAI", href: "/" },
      { label: "Docsium", href: "/" },
      { label: "PDF GPTs", href: "/" },
      { label: "PDF AI generator", href: "/" },
      { label: "Other PDF tools", href: "/" },
    ]
  },
  {
    label: "Company",
    children: [
      { label: "PDF.ai vs ChatPDF", href: "/" },
      { label: "PDF.ai vs Acrobat Reader", href: "/" },
      { label: "Legal", href: "/" },
      { label: "Affiliate program 💵", href: "/" },
      { label: "Investor", href: "/" },
    ]
  }
]

function Footer() {
  return (
    <div className="bg-white">
      <div className="lg:mx-8 my-16 px-10 py-14 flex flex-col md:flex-row gap-y-10 md:gap-y-0 border-t border-gray-200 text-gray-600">
        <div className="lg:w-1/3 space-y-6">
          <div className="w-12 rounded-ful">
            <Image src="/logo.png" width={30} height={30} alt="logo" />
          </div>
          <div className="text-sm leading-6">Chat with any PDF: ask questions, get summaries, find information, and more.</div>
          <div className="flex justify-start space-x-4">
            {socialList.map(item => (
              <Link key={item.label} rel="noopener noreferrer" href={item.href} className="flex items-center p-1">
                <Image width={18} height={18} src={item.iconPaht} alt={item.label} />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
          {footerSheet.map(sheet => (
            <div key={sheet.label} className="space-y-4">
              <h3 className="tracking-wide uppercase font-semibold">{sheet.label}</h3>
              <ul className="space-y-4">
                {sheet.children.map(nav => (
                  <li key={nav.label}>
                    <Link rel="noopener noreferrer" href={nav.href}>{nav.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer;
