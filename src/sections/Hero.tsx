import { business } from "../config/business";
import { ContactActions } from "../components/ContactAction";
import { CafeIllustration } from "../components/CafeIllustration";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="square" />
          Cyber cafe <span className="eyebrow-divider">/</span>{" "}
          {business.locality}
        </p>
        <h1 id="hero-title">
          <span>Your local</span>
          <span>cyber</span>
          <span className="brass">cafe.</span>
        </h1>
        <p className="lead">
          A real place.
          <br />A human connection.
        </p>
        <p className="hero-description">
          Explore our services, ask a question, or find your way here.
        </p>
        <ContactActions />
      </div>
      <CafeIllustration />
      <a className="hero-bottom mono" href="#services">
        <span>Take a look around</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
