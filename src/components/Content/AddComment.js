import React, { useState, useContext, useRef, useEffect } from "react";
import { EMOJISCHAR } from "../../helpers/Emojis";
import FirebaseContext from "./../../context/firebase";
import UserContext from "./../../context/user";
import { BiSmile } from "react-icons/bi";

const AddComment = ({ docId, comments, setComments, commentInputRef }) => {
  const [comment, setCommentLar] = useState("");
  const emojiRefDom = useRef();
  const [emoji, setEmoji] = useState(false);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRefDom.current && !emojiRefDom.current.contains(event.target)) {
        setEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRefDom]);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setCommentLar("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className=" h-12 border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5 relative"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <div
          className="flex items-center ml-3 cursor-pointer"
          onClick={() => setEmoji((prev) => !prev)}
        >
          {emoji && (
            <div
              className="absolute bg-white max-h-sm border rounded -top-44"
              ref={emojiRefDom}
            >
              <div className="grid max-h-40 overflow-auto grid-cols-6 p-3">
                {EMOJISCHAR.map((emoji) => (
                  <div
                    className="hover:bg-gray-300 p-1 cursor-pointer"
                    onClick={() => setCommentLar(`${comment}${emoji}`)}
                  >
                    <span className="text-2xl">{emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <BiSmile className="text-2xl" />
        </div>
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="h-11 outline-none text-sm w-full mr-3 py-5 px-2"
          type="text"
          name="AddComment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setCommentLar(e.target.value)}
          ref={commentInputRef}
        />
        <button
          disabled={comment === ""}
          type="submit"
          className="mt-2 font-semibold w-20 text-sm text-blue-500 disabled:text-[#C9DFFD]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
