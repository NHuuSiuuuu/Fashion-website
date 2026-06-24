import { Link } from "react-router";

function CategoryList() {
  return (
    <div
      className="absolute z-20 w-[94%] sm:w-[90%] md:w-[84%] lg:w-[75%] p-[15px] bg-white shadow-xl flex flex-row justify-between gap-2 mx-auto -translate-x-1/2 -translate-y-[50%]
      left-1/2 "
    >
      <div className="relative overflow-hidden group">
        <Link to="" className="block">
          <img
            src="https://res.cloudinary.com/dhvyer5es/image/upload/w_400,c_scale,f_auto,q_auto/1__1__8066cdbc087d416f8b4d29b5edf0a40b_vfq2fs.png"
            alt="Top"
            className="object-cover w-full h-auto"
          />

          {/* Khung đục lỗ */}
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </Link>
      </div>

      <div className="relative overflow-hidden group">
        <Link to="" className="block">
          <img
            src="https://res.cloudinary.com/dhvyer5es/image/upload/w_400,c_scale,f_auto,q_auto/v1782202730/sets_xx2udm.png"
            alt="Set"
            className="object-cover w-full h-auto"
          />
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </Link>
      </div>

      <div className="relative overflow-hidden group">
        <Link to="" className="block">
          <img
            src="https://res.cloudinary.com/dhvyer5es/image/upload/w_400,c_scale,f_auto,q_auto/v1782202730/skirts_mis4u1.png"
            alt="Skirts"
            className="object-cover w-full h-auto"
          />
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </Link>
      </div>
    </div>
  );
}

export default CategoryList;
