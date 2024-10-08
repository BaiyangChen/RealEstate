import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFranchise from "../Hook/useFranchise";

const Franchise = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { data, isError, isLoading } = useFranchise();

  useEffect(() => {
    document.body.classList.add(
      "inner-pages",
      "hd-white",
      "about",
      "int_white_bg"
    );
    if (window.jQuery && window.jQuery(carouselRef.current).owlCarousel) {
      window.jQuery(carouselRef.current).owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
          0: {
            items: 2,
          },
          400: {
            items: 2,
          },
          500: {
            items: 3,
          },
          768: {
            items: 4,
          },
          992: {
            items: 5,
          },
          1000: {
            items: 6,
          },
        },
      });
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove(
        "inner-pages",
        "hd-white",
        "about",
        "int_white_bg"
      );
    };
  }, []);
  const handleItemClick = (event) => {
    const brand = event.currentTarget.getAttribute("data-brand");
    if (brand && data) {
      const selectFranchise = data.find(
        (franchiseItem) => franchiseItem.title === brand
      );
      if (selectFranchise && !isError && !isLoading) {
        navigate(`/brands/${selectFranchise.id}`);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section
        className="headings"
        style={{
          backgroundImage: 'url("https://i.imgur.com/FoE3O6U.png")',
        }}
      ></section>
      <section className="about-us fh">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 who-1">
              <div>
                <h2 className="text-left mb-4">
                  FRANCHISE <span>OPPOTTUNITIES</span>
                </h2>
              </div>
              <div className="pftext">
                <p>
                  We welcome all like-minded partners to become our franchisees
                  and together we can create a better future.
                </p>
                <p>
                  We provide franchisees with a sustainable franchise model and
                  strong support in areas including operations, systems and
                  marketing.
                </p>
                <p>
                  Becoming a franchisee offers a brand-new start for your
                  business and another milestone in your career development. We
                  are confident that our collaboration will contribute to the
                  brand's sustainable growth and achieve win-win results.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <img alt="image" src="https://i.imgur.com/zXAqUXD.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>HEADQUARTER </span>FUNCTION
            </h2>
          </div>
          <div className="row service-1">
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-13">
                  <img src="https://i.imgur.com/7fOdsUR.png" alt="" />
                  <h3>Brand Incluence</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-14">
                  <img src="https://i.imgur.com/hIB3u9V.png" alt="" />
                  <h3>Training&Marketing Support</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv mb-0 pt"
              data-aos="fade-up"
            >
              <div className="serv-flex arrow">
                <div className="art-1 img-15">
                  <img src="https://i.imgur.com/xBljgZs.png" alt="" />
                  <h3>Supply Chain Capabilities</h3>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="counterup">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr">
                <i className="fa fa-trophy " aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">22</p>
                  <h3>Cooperative Brand</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0">
                <i className="fa fa-shopping-bag" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">100</p>
                  <h3>Franchise Stores</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0 last">
                <i className="fa fa-users" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">11</p>
                  <h3>Proprietaries</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0 last">
                <i className="fa fa-trophy" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">20</p>
                  <h3>Award</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>HEADQUARTER </span>SUPPORT
            </h2>
          </div>
          <img src="https://i.imgur.com/zGYFrnA.png" alt="" />
        </div>
      </section>
      <section className="testimonials home18 bg-white">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>APPLICATION </span>PROCESS
            </h2>
          </div>
          <img
            src="https://i.imgur.com/hnoQ80y.png"
            alt=""
            style={{ width: "80%", height: "auto", marginLeft: "15%" }}
          />
        </div>
      </section>
      <div className="partners bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Our </span>Brands
            </h2>
          </div>
          <div className="owl-carousel style2" ref={carouselRef}>
            <div
              className="owl-item"
              data-brand="yangguofu"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/RWCvEfx.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="chimaek"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/DjmJcWx.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="tori"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/SkCWDc1.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="chickenplus"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/JHRH6W9.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="yifang"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/yAoo45K.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="chungchun"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/gdDNGfQ.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="I AM PHO"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/ofp4dSx.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="cnt"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/VpNCZhk.png" alt="" />
            </div>
            <div className="owl-item" data-brand="k2" onClick={handleItemClick}>
              <img src="https://i.imgur.com/WL3tl7M.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="Clawmee"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/6SUx0Vv.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="lepetitsao"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/STmslCn.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="meetfresh"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/4WuwJRB.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="lanzhou"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/Y1WNzFC.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="le poke station"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/L8YtxUt.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="Clawville"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/dA5l84O.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="deargarden"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/GkSpYj4.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="shuyi"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/XyfZfYy.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="SUSHI SAMA"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/ECA71em.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="heytea"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/nhPzy4o.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="BURGER KING"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/K9ywrfo.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="GANADARA"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/RXI7mOr.png" alt="" />
            </div>
            <div
              className="owl-item"
              data-brand="presotea"
              onClick={handleItemClick}
            >
              <img src="https://i.imgur.com/QdFxqGw.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
