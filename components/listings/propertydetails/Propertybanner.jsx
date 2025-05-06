import Propertycarousel from './parts/Propertycarousel';

function Propertybanner({ propertyDetails }) {
    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(2) + ' Cr'; // Crores
        } else if (price >= 100000) {
            return (price / 100000).toFixed(2) + ' Lac'; // Lakhs
        } else if (price >= 1000) {
            return (price / 1000).toFixed(2) + ' K'; // Thousands
        }
        return price;
    };
    return (
        <div className="flex flex-col space-y-[12px]">
            <p className="text-[#1d3a76] text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[24px] font-[600] font-sans">
                Property Description
            </p>
            <p className="text-[#6E6E6E] text-[11px] xs:text-[13px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[500] leading-6 font-Montserrat">{propertyDetails?.description}</p>
            <div className='flex flex-row items-start justify-between pt-6'>
                <div className="">
                    <p className="text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[24px] font-[600] text-[#1d3a76] font-sans">{propertyDetails?.property_name?.toUpperCase()}</p>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[600] text-[#1d3a76] pt-2 font-sans">{propertyDetails?.google_address}</p>
                </div>
                <div className="">
                    <p className="text-[16px] xs:text-[18px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] font-semibold text-[#492828] font-sans">
                        {/* ₹ 2 Cr - ₹ 4 Cr - <span className="text-[#000000] font-[400] text-[18px]"> ₹ 10.k/sq.ft</span> */}
                        {propertyDetails?.property_for === "Sell" ? `₹ ${formatPrice(propertyDetails?.property_cost)}` : ` ₹ ${formatPrice(propertyDetails?.monthly_rent)} Rent`}
                    </p>
                    {/* {propertyDetails?.property_for === "Sell" &&
                        <>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-medium text-[#1D3A76] text-end">
                                EMI starts at <span className="text-[#000000]">₹</span> 
                            </p>
                            <p className="text-[#6E6E6E] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[400] text-end">All Inclusive Price</p>
                        </>
                    } */}
                </div>
            </div>
            <div className='space-y-10'>
                <Propertycarousel
                    propertyDetails={propertyDetails}
                />
            </div>
        </div>
    );
}

export default Propertybanner;
