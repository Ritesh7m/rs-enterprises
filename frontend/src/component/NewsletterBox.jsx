import React from "react";

const NewsletterBox = () => {
    const onSubmitHandler =(event) =>{
        event.preventDefault();
    }
  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 10% off
      </p>
      <p className="text-gray-400 mt-3">
      
"At RS Enterprises, we deliver pure, safe water with exceptional service, ensuring your family’s health and peace of mind, one drop at a time."
      </p>
<form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
    <input className="w-full sm:flex-1 outline-none" type="email"  placeholder="Enter your Eamil" required/>
    <button type='submit' className="bg-[#23066d] text-white text-xs px-10 py-4">
  SUBSCRIBE
</button>

</form>

    </div>
    </div>
  );
};

export default NewsletterBox;
