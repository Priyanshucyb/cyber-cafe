import { business } from "../config/business";
import { httpsUrl } from "../lib/business";
import { Icon } from "./Icon";
import { ContactAction } from "./ContactAction";
export function Footer() {
  return (
    <>
      <footer className="footer">
        <a className="brand" href="#top">
          <Icon name="screen" />
          <span>
            {business.name}
            <small>Cyber cafe / {business.locality}</small>
          </span>
        </a>
        <a className="text-link" href="#top">
          Back to top ↑
        </a>
        {business.socialLinks.length > 0 && (
          <nav aria-label="Social links">
            {business.socialLinks.map(
              (s) =>
                httpsUrl(s.url) && (
                  <a
                    key={s.label}
                    href={httpsUrl(s.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                ),
            )}
          </nav>
        )}
        <p className="footer-note">
          Services. Questions. Directions.
          <br />
          Everything you need for your next visit.
        </p>
      </footer>
      <nav className="mobile-contact" aria-label="Quick contact">
        <ContactAction kind="call" primary compact />
        <ContactAction kind="whatsapp" compact />
        <ContactAction kind="directions" compact />
      </nav>
    </>
  );
}
