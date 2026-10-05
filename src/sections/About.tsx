import { business } from "../config/business";
export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="section about"
      aria-labelledby="about-title"
    >
      <div className="about-heading reveal">
        <p className="eyebrow">02 / A little closer</p>
        <h2 id="about-title">
          On the web.
          <br />
          <em>
            In the
            <br />
            neighbourhood.
          </em>
        </h2>
        <p className="about-copy">{business.about}</p>
        <div className="place-stamp mono">
          <span aria-hidden="true">↗</span>
          <div>
            Your local cyber cafe
            <br />
            {business.locality}
          </div>
        </div>
      </div>
      <div className="visit-guide">
        <p className="mono guide-label">A little planning. An easier visit.</p>
        <ol>
          {[
            [
              "Check the services",
              "See what is available and read the details before you set out.",
            ],
            [
              "Ask your questions",
              "Confirm the price, availability, and what you need to bring.",
            ],
            [
              "Find your way here",
              "Check the opening hours and get directions from your phone.",
            ],
          ].map(([title, body], i) => (
            <li className="reveal" key={title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a
                  className="text-link"
                  href={["#services", "#contact", "#location"][i]}
                >
                  {["Browse services", "Contact details", "Plan your visit"][i]}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
