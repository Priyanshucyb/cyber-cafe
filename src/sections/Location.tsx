import { business } from "../config/business";
import { addressText, contactLinks } from "../lib/business";
import { ContactAction } from "../components/ContactAction";
import { Icon } from "../components/Icon";
export function Location() {
  return (
    <section
      id="location"
      tabIndex={-1}
      className="section location"
      aria-labelledby="location-title"
    >
      <div className="location-art reveal">
        <div className="location-art-label mono">
          The destination / {business.locality}
        </div>
        <svg viewBox="0 0 500 400" aria-hidden="true">
          <g fill="none" stroke="currentColor">
            <path
              className="street"
              d="M-30 110h145v95h245v230M-30 315h200V65h360M35 0v400M0 365h500M310 0v160h190M430 0v250h90"
            />
            <path className="route" d="M35 365h135V205h140" />
            <circle cx="35" cy="365" r="8" className="route-start" />
            <path
              className="blocks"
              d="M58 20h80v63H58zM201 87h78v91h-78zM58 227h80v65H58zM201 237h132v104H201zM385 274h83v68h-83zM332 23h74v111h-74z"
            />
          </g>
          <g transform="translate(277 115)">
            <path
              className="map-pin"
              d="M33 0C15 0 0 15 0 33c0 25 33 57 33 57s33-32 33-57C66 15 51 0 33 0Z"
            />
            <circle cx="33" cy="32" r="11" className="pin-center" />
          </g>
        </svg>
        <div className="map-sign">
          <Icon name="screen" />
          <span>
            {business.name}
            <small>Cyber cafe</small>
          </span>
          <Icon name="arrow" />
        </div>
        <p className="map-caption mono">
          Illustration only · use directions for the actual location
        </p>
      </div>
      <div className="location-copy reveal">
        <p className="eyebrow">03 / Come by</p>
        <h2 id="location-title">
          Find us
          <br />
          <em>here.</em>
        </h2>
        <dl>
          <div>
            <dt>Address</dt>
            <dd>
              <address>{addressText()}</address>
            </dd>
          </div>
          <div>
            <dt>Opening hours</dt>
            <dd>{business.openingHours}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              {contactLinks.call ? (
                <a href={contactLinks.call}>{business.phone}</a>
              ) : (
                business.phone
              )}
            </dd>
          </div>
        </dl>
        <ContactAction kind="directions" primary />
        <p className="location-hint">Check the hours before you travel.</p>
      </div>
    </section>
  );
}
