import React, { useContext, useEffect, useRef, useState } from "react";
import { getAuth, updatePassword, updateEmail } from "firebase/auth";
import UserContext from "../../context/user";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../lib/firebase";
import { updateAvatarUser } from "../../services/firebase";
import Lottie from "react-lottie-player";
import animate from "../../assets/reactload.json";
import useUser from "../../hooks/useUser";
import { updateUser } from "./../../services/firebase";
import EditModalProfile from "../../components/editProfile/EditModalProfile";

const EditUserPage = () => {
  const [loading, setLoadingcha] = useState(false);
  const [fullname, setFullnamecha] = useState("");
  const [username, setUsernamecha] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { user: currentUser, updateProfile: updateProfileUser } = useUser();
  const imageRef = useRef();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setFullnamecha(currentUser.fullName);
      setUsernamecha(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const openChangeAvatarInput = () => {
    const avatarImageURL = currentUser.avatarSrc;
    if (avatarImageURL === "/images/avatars/default.png") {
      return imageRef.current.click();
    }
    setModalOpen(true);
  };

  const updateProfile = async () => {
    setLoadingcha(true);
    const auth = getAuth();
    await updateEmail(auth.currentUser, email);

    if (password.trim()) {
      await updatePassword(auth.currentUser, password);
    }

    await updateUser(email, username, aboutme, fullname, currentUser.docId);
    setLoadingcha(false);
    console.log("Profile was sucessfully uploaded!");
  };

  const openInput = () => {
    setModalOpen((prev) => !prev);
    imageRef.current.click();
  };

  const uploadImage = async (e) => {
    setLoadingcha(true);
    const avatar = e.target.files[0];
    const avatarId = uuidv4();
    const pathAvatar = `images/avatars/${avatarId}.jpg`;
    if (modalOpen) setModalOpen(false);
    const uploadImage = storage.ref(pathAvatar).put(avatar);

    uploadImage.on(
      "state-changed",
      (snapshot) => {
        // const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      },
      () => {
        console.log("Error");
        setLoadingcha(false);
      },
      async () => {
        const imageUrl = await uploadImage.snapshot.ref
          .getDownloadURL()
          .then(async (url) => {
            const avatar = await updateAvatarUser(url, user.uid);
            updateProfileUser();
            setLoadingcha(false);
            console.log("Succesfully changed avatar!");
          });
      }
    );

    e.target.value = null;
  };

  return (
    <section className="mt-0 flex justify-center">
      <EditModalProfile
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        avatarSrc={currentUser.avatarSrc}
        openInput={openInput}
        userId={user.uid}
      />
      <div className="flex mt-10  flex-col p-4">
        <div className="flex items-center mt-4 mb-4 justify-end">
          <div className="flex-auto flex w-32 cursor-pointer flex justify-end">
            <div className="w-14 h-14 flex mr-2">
              <img
                className="rounded-full border-2 border-green-600 p-0.5 w-full h-full flex"
                src={currentUser.avatarSrc}
                alt={""}
              />
            </div>
          </div>
          <div className="mb-2 flex-auto w-60 ml-4">
            <div>
              <span className="mb-2 text-xl">{user.displayName}</span>
            </div>
            <div
              onClick={openChangeAvatarInput}
              className="mt-4 cursor-pointer"
            >
              <span className="bg-blue-500 py-1 px-4 rounded-sm text-white">
                Upload image
              </span>
              <input
                ref={imageRef}
                onChange={uploadImage}
                type="file"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center my-3 w-full">
          <div className="border-b-[1px] border-black h-0 w-full"></div>
        </div>
        <span>Full Name</span>
        <div className="flex ">
          <div className="fflex-auto flex">
            <label htmlFor="fullname"></label>
          </div>
          <div className="flex-auto w-full">
            <input
              value={fullname}
              onChange={(e) => setFullnamecha(e.target.value)}
              className="h-10 border p-2 rounded w-full "
              type="text"
              id="fullname"
            />
          </div>
        </div>
        <span className="mt-4">User Name</span>
        <div className="flex">
          <div className="flex-auto flex ">
            <label htmlFor="username"></label>
          </div>
          <div className="flex-auto w-full">
            <input
              value={username}
              onChange={(e) => setUsernamecha(e.target.value)}
              className="h-10 border p-2 rounded w-full "
              type="text"
              id="username"
            />
          </div>
        </div>
        <span className="mt-4">Email</span>
        <div className="flex">
          <div className="flex-auto flex ">
            <label htmlFor="email"></label>
          </div>

          <div className=" flex-auto w-full ">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 border p-2 rounded w-full "
              type="text"
              id="email"
            />
          </div>
        </div>
        <span className="mt-4">New Password</span>
        <div className="flex  ">
          <div className="flex-auto flex ">
            <label htmlFor="newpassword"></label>
          </div>
          <div className="flex-auto w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border p-2 rounded w-full"
              autoComplete="off"
              type="password"
              id="newpassword"
            />
          </div>
        </div>
        <div className="flex mt-6">
          <div className="flex-auto w-32 flex justify-end pr-6"></div>
          <div className="flex-auto w-60 ...">
            {!loading ? (
              <button
                className="bg-blue-500 text-sm rounded-sm text-white w-28 h-8"
                onClick={updateProfile}
              >
                Submit
              </button>
            ) : (
              <button className="font-bold text-sm rounded text-white w-30 h-20 opacity-70">
                <div className="flex items-center justify-center">
                  {/* <ReactLoading
                    type="spin"
                    color={"black"}
                    height={"40%"}
                    width={"30%"}
                  /> */}
                  <Lottie animationData={animate} loop play />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUserPage;
