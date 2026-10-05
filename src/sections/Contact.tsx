import { business } from "../config/business";
import { contactLinks } from "../lib/business";
import { ContactActions } from "../components/ContactAction";
export function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section contact"
      aria-labelledby="contact-title"
    >
      <svg
        className="contact-lines"
        viewBox="0 0 600 420"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 50C170 0 100 270 340 200S460 80 500 240M0 300C100 410 300 310 340 200S490 170 500 240M0 200C230 80 150 390 340 200S440 210 500 240M500 240h80" />
        <rect x="580" y="221" width="38" height="38" />
      </svg>
      <div className="contact-content reveal">
        <p className="eyebrow">04 / Let's connect</p>
        <h2 id="contact-title">
          A question?
          <br />
          <em>Say hello.</em>
        </h2>
        <p className="lead">
          Ask about a service.
          <br />
          Plan your visit.
        </p>
        <ContactActions all />
        <div className="contact-numbers">
          <div>
            <span className="mono">Call</span>
            {contactLinks.call ? (
              <a href={contactLinks.call}>{business.phone}</a>
            ) : (
              <span>{business.phone}</span>
            )}
          </div>
          <div>
            <span className="mono">WhatsApp</span>
            {contactLinks.whatsapp ? (
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {business.whatsapp}
              </a>
            ) : (
              <span>{business.whatsapp || "Not available"}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
