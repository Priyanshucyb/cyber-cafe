import { business } from "../config/business";
import { isConfigured } from "../lib/business";
import { Icon } from "../components/Icon";
export function Services() {
  return (
    <section
      id="services"
      tabIndex={-1}
      className="section services"
      aria-labelledby="services-title"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">01 / At the cafe</p>
        <div className="heading-split">
          <h2 id="services-title">
            What brings
            <br />
            you <em>in?</em>
          </h2>
          <p>
            Find the service you need.
            <br />
            Open a row for the details.
          </p>
        </div>
      </div>
      <div className="service-directory">
        {business.services.map((service, i) => (
          <details className="service-row reveal" key={service.id}>
            <summary>
              <span className="service-number mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <span className="service-plus">
                <Icon name="plus" />
              </span>
            </summary>
            <div className="service-detail">
              <p className="mono">
                {isConfigured(service.name)
                  ? "Good to know"
                  : "Awaiting confirmed service details"}
              </p>
              <ul>
                {service.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
              {service.price && <p className="price">{service.price}</p>}
              <a className="text-link" href="#contact">
                Ask about this service <span aria-hidden="true">↗</span>
              </a>
            </div>
          </details>
        ))}
      </div>
      <div className="service-note">
        <span className="mono">Before you make the trip</span>
        <p>Check availability, pricing, and anything you need to bring.</p>
        <a className="text-link" href="#contact">
          Contact the cafe ↗
        </a>
      </div>
    </section>
  );
}
