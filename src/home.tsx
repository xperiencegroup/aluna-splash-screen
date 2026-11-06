import "./index.css";
import backgroundImage from "./assets/images/home-background.jpg";
import formaImage from "./assets/images/fondo-forma-hero.svg";

// logos
import logo from "./assets/logos/logo-aluna.svg";
import alunaResidencialLogo from "./assets/logos/aluna-residencial.svg";
import senderosLogo from "./assets/logos/senderos-aluna.svg";
import mr2 from "./assets/logos/mr2.svg";

// social icons
import InstagramIcon from "./assets/icons/insta-icon";
import WhatsappIcon from "./assets/icons/whatsapp-icon";
import FacebookIcon from "./assets/icons/facebook-icon";
import { TRACK } from "./analytics/track.constants";
import { track } from "./analytics/track";

// pages
const pages = [
  {
    id: "aluna-residencial",
    bgColor: "bg-encuentro",
    reservado: true,
    logo: alunaResidencialLogo,
    logoAlt: "Logo Aluna Residencial",
    href: "/alunaresidencial/",
    tracking: TRACK.ALUNA_RESIDENCIAL,
  },
  {
    id: "senderos-de-aluna",
    bgColor: "bg-impulso",
    reservado: false,
    logo: senderosLogo,
    logoAlt: "Logo Senderos de Aluna",
    href: "/senderosdealuna/",
    tracking: TRACK.SENDEROS_DE_ALUNA,
  },
];

export const social_links = [
  {
    id: "instagram",
    title: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/viveenaluna/?utm_source=aluna_splash&utm_medium=website&utm_campaign=instagram_link",
    tracking: TRACK.INSTAGRAM,
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    Icon: WhatsappIcon,
    href: "https://wa.me/50230256073?utm_source=aluna_splash&utm_medium=website&utm_campaign=whatsapp_link",
    tracking: TRACK.WHATSAPP,
  },
  {
    id: "facebook",
    title: "Facebook",
    Icon: FacebookIcon,
    href: "https://www.facebook.com/viveenaluna?utm_source=aluna_splash&utm_medium=website&utm_campaign=facebook_link",
    tracking: TRACK.FACEBOOK,
  },
];

export default function Home() {
  return (
    <main className="relative flex items-center h-full min-h-svh bg-proposito overflow-hidden">
      {/* Fondo */}
      <img
        src={backgroundImage}
        alt="Imagen de Aluna"
        className="absolute inset-0 z-0 h-full w-full object-cover scale-105 object-[10%_50%] origin-right"
      />

      {/* Forma (desde md) */}
      <div className="hidden md:block absolute inset-y-0 left-0 top-0 z-0 max-w-full w-[840px] pr-[20px]">
        <img
          src={formaImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-fill"
        />
      </div>

      {/* fondo mobile < 768px */}
      <div className="md:hidden absolute z-0 w-full h-full bg-proposito/50 backdrop-blur-md"></div>

      {/* redes sociales */}
      <div className="absolute z-5 top-[7%] right-[4%] flex flex-col items-end gap-[7px] mobile-short:top-[24px] mobile-short:right-[24px] mobile-short:gap-[5px]">
        <p className="social-handle text-left">
          @<span className="font-bold">vive</span>en
          <span className="font-bold">aluna</span>
        </p>

        <div className="flex gap-[20px] mobile-short:gap-[14px]">
          {social_links.map((link) => {
            const Icon = link.Icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(link.tracking)}
                aria-label={link.title}
                className={`group flex justify-center items-center size-[46px] p-[8px] rounded-full border-[1.5px] border-beige transition-colors ease-in-out hover:bg-beige mobile-short:size-[38px] mobile-short:p-[7px] ${link.id === "whatsapp" ? "bg-proposito hover:border-proposito" : "bg-impulso hover:border-impulso"} overflow-hidden`}
              >
                <div className="relative w-full h-full">
                  <Icon
                    className={`absolute inset-0 w-full h-full object-contain text-beige ${link.id === "whatsapp" ? "group-hover:text-proposito" : "group-hover:text-impulso"}`}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* desarrollado por MR2 */}
      <div className="absolute z-5 bottom-[7%] md:bottom-[12%] right-[4%] w-[100px] h-[50px] mobile-short:w-[80px] mobile-short:h-[40px]">
        <img
          src={mr2}
          alt="Desarrollado por MR2"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* logo, textos y botones */}
      <div className="absolute z-10 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-[76px] max-md:px-[10px] max-md:items-center max-sm:w-full min-sm:left-[5%] mobile-short:gap-[44px]">
        {/* logo y texto */}
        <div className="flex flex-col gap-[36px] mobile-short:gap-[24px]">
          <img
            src={logo}
            alt="Logo de Aluna"
            className="w-full max-w-[363px] mobile-short:max-w-[240px]"
          />

          <p className="hero-title">
            Donde cada espacio <br />
            <span className="font-semibold italic">es una nueva historia</span>
          </p>
        </div>

        {/* botones */}
        <div className="flex flex-col gap-[21px] mobile-short:gap-[14px]">
          <p className="cta-label">Conoce tu próximo hogar:</p>

          <div className="flex flex-col md:flex-row gap-[80px] md:gap-[26.5px] mobile-short:gap-[56px]">
            {pages.map((page) => (
              <a
                key={page.id}
                href={page.href}
                onClick={() => track(page.tracking)}
                className={`relative flex w-full max-w-[330px] md:w-[330px] aspect-[330/111] justify-center items-center rounded-full ${page.bgColor} transition-transform duration-300 hover:-translate-y-1 mobile-short:max-w-[280px]`}
              >
                <div className="relative w-full h-[70%] pointer-events-none">
                  <img
                    src={page.logo}
                    alt={page.logoAlt}
                    className={`absolute inset-0 w-full h-full object-contain ${page.reservado ? "-translate-y-[5%]" : "translate-y-[2.5%]"}`}
                  />
                </div>

                {/* reservar o reservado */}
                <div
                  className={`absolute flex w-fit h-fit py-[7px] px-[12px] justify-center items-center rounded-full mobile-short:py-[5px] mobile-short:px-[10px] ${page.reservado ? "bottom-0 translate-y-[70%] bg-origen" : "top-0 -translate-y-[70%] bg-horizonte"}`}
                >
                  <p
                    className={`badge-label font-bold uppercase ${page.reservado ? "text-beige" : "text-proposito"}`}
                  >
                    {page.reservado ? "100% reservado" : "¡Reserva ahora!"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
