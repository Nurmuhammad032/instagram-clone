import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
// linear-gradient(95deg, blue, #ba2c95, orange)
const User = ({ username, fullName, avatarSrc }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/${username}`}
      className="grid p-4 grid-cols-4 gap-4 mr-5 mb-6 items-center"
    >
      <div
        className="w-20 h-20 rounded-full p-[3px]"
        style={{
          background: "linear-gradient(95deg, blue, #ba2c95, orange)",
        }}
      >
        <div className="flex items-center bg-white justify-between p-1  rounded-full col-span-1 w-full h-full">
          <img
            className="rounded-full w-full h-full"
            src={avatarSrc}
            alt=""
            onError={(e) => {
              e.target.src = "/images/avatars/default/.jpg";
            }}
          />
        </div>
      </div>

      <div className="p-8 col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);
