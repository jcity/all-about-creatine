import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import { footerColumns, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <span className="logo">
                <Icon name="logo" />
              </span>{" "}
              {siteConfig.name}
            </Link>
            <p className="fdesc">{siteConfig.description}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclosure — required in footer (G2) */}
        <div className="disc-foot">
          <strong>Affiliate disclosure:</strong> This site contains affiliate
          links. If you buy through them we may earn a small commission at no
          extra cost to you. Commissions never influence our rankings or
          editorial judgments. Content is educational and not a substitute for
          professional medical advice.
        </div>

        <div className="foot-bottom">
          <span>
            © 2026 {siteConfig.name}. All rights reserved.
          </span>
          {/* Not medical advice (G7) */}
          <span>
            Content is for educational purposes and is not medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
