import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing } from "../../services/firebase";
import { updateFollowedUserFollowers } from "../../services/firebase";
import check from "../../assets/followed.json";

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  profileImage,
}) => {
  const [followedUsers, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  };
  console.log(profileImage);
  return (
    <div className="flex flex-row h-[3rem] items-center justify-between">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(95deg, blue, #ba2c95, orange)",
          }}
        >
          <div
            className="bg-white w-8 h-8 rounded-full bg-white p-[1px]"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="rounded-full">
              <img
                className="rounded-full w-full h-full"
                src={profileImage}
                alt="profileImg"
              />
            </div>
          </div>
        </div>
        <Link className="ml-2" to={`/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div className="h-[3rem] flex items-center">
        {!followedUsers ? (
          <button
            className="text-xs font-semibold py-1 px-4 rounded-full bg-blue-600 text-white"
            type="button"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        ) : (
          <Lottie
            play
            loop={false}
            animationData={check}
            style={{ width: "3rem" }}
          />
        )}
      </div>
    </div>
  );
};

export default SuggestedProfile;
