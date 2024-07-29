import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./PropertyDetail.css";
import useProperty from "../../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import useAuthCheck from "../../Hook/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../BookingModal/BookingModal";
import UserDetailContext from "../../context/userDetailContext";
import { Button } from "@mantine/core";
import { useMutation } from "react-query";
import { removeBooking } from "../../utils/Api";
import { toast } from "react-toastify";

export const PropertyDetail = () => {
  const { data, isError, isLoading } = useProperty();
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetail,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const property = data.find((p) => p.id === id);
  if (!property) {
    return (
      <div className="container mt-5">
        <h2>property Not Found</h2>
      </div>
    );
  }
  const batches = [];
  const images = property.images || [];

  for (let i = 0; i < images.length; i += 4) {
    batches.push(images.slice(i, i + 4));
  }

  const handleSlideChange = (swiper) => {
    setCurrentBatchIndex(swiper.realIndex % batches.length);
  };

  return (
    <div className="property-detail-page">
      <div className="property-detail-container">
        {/* 第一块，大图片 */}
        <div className="property-main-image">
          <img src={batches[currentBatchIndex]?.[0]} alt="Property" />
        </div>
        {/* 第二块，Swiper */}
        {batches.length > 0 && (
          <div className="property-swiper">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 2000 }}
              onSlideChange={handleSlideChange}
              loop={batches.length > 1}
              modules={[Autoplay]}
            >
              {batches.map((card, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-batch">
                    {card.map((image, idx) => (
                      <img key={idx} src={image} alt="home" />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/*第三块： property介绍 */}
        <div className="property-description">
          <h2>Property Description</h2>
          <p>{property.description}</p>

          {bookings?.map((booking) => booking.id).includes(id) ? (
            <>
              <Button
                variant="outline"
                color="red"
                onClick={() => cancelBooking()}
                disabled={cancelling}
              >
                <span>Cancel Booking</span>
              </Button>
              <span>
                Your visit already booked for date{" "}
                {bookings?.filter((booking) => booking?.id === id)[0].date}
              </span>
            </>
          ) : (
            <button
              className="button"
              onClick={() => {
                validateLogin() && setModalOpened(true);
              }}
            >
              Book Your Visit
            </button>
          )}

          <BookingModal
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId={id}
            email={user?.email}
          />
        </div>
        {/* 第四块： property Overview */}
        <div className="property-overview">
          <h2>Proerty Overview</h2>
          <div className="overvew-items">
            <div className="overview-item">
              <i className="fa fa-bed"></i>
              <span>{property.facilities.bedrooms} Bedrooms</span>
            </div>
            <div className="overview-item">
              <i className="fa fa-bath"></i>
              <span>{property.facilities.bathrooms} bathrooms</span>
            </div>
            <div className="overview-item">
              <i className="fa fa-building"></i>
              <span>{property.facilities.parkings} Parkings</span>
            </div>
            {/* add more as need */}
          </div>
        </div>

        {/* 第五块：Feature & Amenities */}
        <div className="property-amenities">
          <h2>Feature & Amenities</h2>
          <div className="amenities-items">
            {property.amenities &&
              Object.entries(property.amenities).map(([key, value], index) => (
                <div key={index} className="amenities-item">
                  <i className="fa fa-check"></i>
                  <span>
                    {key}:{value}
                  </span>
                </div>
              ))}
          </div>
        </div>
        {/* 第六块：地图 */}
        <div className="property-map">
          <h2>Location</h2>
          <iframe
            src={`https://www.google.ca/maps?q=${property.location}&output=embed`}
            width="100%"
            height="400%"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
