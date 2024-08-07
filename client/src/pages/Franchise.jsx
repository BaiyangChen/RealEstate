import Introduce from "../components/Introduce/Introduce";
import FeaturedListing from "../components/FeaturedListing/FeaturedListing";
import InquiryForm from "../components/InquiryForm/InquiryForm";
import useProperty from '../Hook/useProperty'

const Franchise = () => {
  const { data, isError, isLoading } = useProperty();

  const introduceData = {
    properties: 220,
    areaCoverage: 30,
    brokers: 10,
    yearsInBusiness: 10,
    imageUrl: "wrapper1.webp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  return (
    <div className="page-container">
      <div className="residential-box">
        <h1 className="title">Franchise</h1>
        <Introduce introduceData={introduceData} />
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <FeaturedListing data={data} isError={isError} isLoading={isLoading} />
        </div>
        <InquiryForm />
      </div>
      <div className='break-line' />
    </div >
  );
}

export default Franchise;