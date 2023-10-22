import React, { useRef} from "react";
import "../../styles/landingPage.css";

//components
import { LandingNavbar } from "../component/landingNavbar";
import { LandingHeader } from "../component/landingHeader";
import { LandingFooter } from "../component/landingFooter";
import { FormReservation } from "../component/formReservation";
import { FormContact } from "../component/formContact";
import { Schedule } from "../component/schedule";

export const LandingPage = () => {
  const inputRef = useRef(null);

  const copyText = () => {
    inputRef.current.select();
    document.execCommand("copy");
  };

  return (
    <>
      <LandingNavbar />
      <div className="container-fluid landing-container text-center mt-5">
        <div className="row">
          <LandingHeader />
          <div className="col-sm-12 col-md-6 parallax-bg">
            <div className="parallax-content"></div>
          </div>
          <div className="col-sm-12 col-md-6 about-us p-5">
            <h1 className="title-section display-4"> ¡Conócenos! </h1>
            <p className="p-3">
              En el corazón de nuestra cocina yace una pasión que se remonta a
              generaciones. Hemos heredado secretos culinarios que transforman
              simples ingredientes en experiencias memorables para el paladar.
            </p>
            <p className="p-3">
              Nuestra historia comenzó en un pequeño pueblo donde la comida no
              era solo una necesidad, sino una celebración diaria. Aquí, entre
              aromas que llenaban el aire y recetas que pasaban de mano en mano,
              nació la inspiración para lo que hoy es nuestro restaurante.
            </p>
            <p className="p-3">
              En nuestro restaurante, no solo buscamos satisfacer el hambre,
              sino también despertar los sentidos y crear momentos de conexión a
              través de la comida. Cada plato que servimos es una expresión de
              nuestro amor por la gastronomía y un tributo a las tradiciones que
              nos han moldeado.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 shop p-5">
            <h1 className="title-section display-4"> Descubre <br/> Nuestra Carta </h1>
            <p className="pb-3">
              Explora nuestro menú y deleita tu paladar con una selección
              exquisita de platos preparados con ingredientes frescos y de la
              más alta calidad.
            </p>
            <h1 className="subtitle pb-3">
              ¡Y además con descuento si es tu primera vez!
            </h1>
            <p className="pb-3">
              Por tu primera compra online puedes usar este cupón de descuento.
            </p>
            <div className="input-group mb-3 px-2 d-flex justify-content-center">
              <input
                ref={inputRef} type="text" name="discount-code" className="custom-input" value="1erComerComida" readOnly />
              <button
                className="btn btn-outline-secondary" type="button" onClick={copyText}> Copiar </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 parallax-bg">
            <div className="parallax-content"></div>
          </div>
          <div className="col-sm-12 col-md-6 parallax-bg">
            <div className="parallax-content"></div>
          </div>
          <div className="col-sm-12 col-md-6 schedule p-5">
            <h1 className="title-section display-4">Nuestro Horario</h1>
            <Schedule/>
            <h1 className="title-section display-4 pt-4 m-0"> Encuentranos en </h1>
            <p className="px-2">Calle Falsa, 123 CP: 00000 Barcelona</p>
            <p className="px-2">Calle Ficticia, 456 CP: 00000 Madrid</p>
          </div>
          <div className="col-sm-12 col-md-6 reserve p-5">
            <FormReservation />
          </div>
          <div className="col-sm-12 col-md-6 parallax-bg">
            <div className="parallax-content"></div>
          </div>
          <div className="col-sm-12 col-md-6 parallax-bg">
            <div className="parallax-content"></div>
          </div>
          <div className="col-sm-12 col-md-6 contact-us p-5">
            <FormContact />
          </div>
          <div className="col-sm-12 parallax-bg align-items-center justify-content-center">
            <div className="parallax-footer p-5">
              <LandingFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
