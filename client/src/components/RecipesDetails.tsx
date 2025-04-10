import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import { FaEdit, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { MdDelete, MdFavorite } from "react-icons/md";
import { IoMdReturnRight } from "react-icons/io";

import useRecipeAPI from "../hooks/useRecipeAPI";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { FullProductType } from "../types";

interface RecipesDetailsProps {
  props: FullProductType;
  isOwner: boolean;
  isUser: boolean;
  isRecommended: boolean;
  addToRecommend: () => Promise<void>;
  removeFromRecommend: () => Promise<void>;
}

const RecipesDetails: React.FC<RecipesDetailsProps> = ({
  props,
  isOwner,
  isUser,
  isRecommended,
  addToRecommend,
  removeFromRecommend,
}) => {
  const { deleteRecipe } = useRecipeAPI();
  const [confirmDel, setConfirmDel] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setConfirmDel(false);
    await deleteRecipe(props._id);
  };

  return (
    <div className="w-[90vw] md:w-[70vw] max-w-[90vw] min-h-[32.5rem] bg-white rounded-md recipyShadow p-5 dark:bg-gray-800 flex flex-col md:flex-row relative gap-4 overflow-hidden">
      <ConfirmDeleteDialog
        isOpen={confirmDel}
        onCancel={() => setConfirmDel(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this recipe?"
      />

      <div className="text-xl font-bold text-white bg-sky-500 py-2 px-4 rounded-md flex flex-row items-center justify-center absolute top-6 left-6 shadow-md border border-white">
        <MdFavorite className="text-2xl text-center" />
        {props.recommendList.length}
      </div>

      {isValidImage ? (
        <img
          className="w-full md:w-[50%] max-h-[500px] object-cover rounded-md mb-4 md:mb-0 dark:bg-gray-700 bg-gray-50"
          src={props.image}
          alt={props.title}
          onError={() => setIsValidImage(false)}
        />
      ) : (
        <div className="w-full md:w-[50%] max-h-[500px] object-cover rounded-md mb-4 md:mb-0 dark:bg-gray-700 bg-gray-50 flex justify-center items-center">
          <span className="text-gray-500 dark:text-gray-400">No Image</span>
        </div>
      )}

      <article className="flex-1 p-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-auto max-h-[500px]">
        <h2 className="bg-sky-900 text-white font-bold text-3xl p-3 rounded-md mb-4 text-center">
          {props.title}
        </h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Description:
          </strong>{" "}
          {props.description}
        </p>
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Instructions:
          </strong>{" "}
          {props.instructions}
        </p>
        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Ingredients:
          </strong>{" "}
          {props.ingredients}
        </p>
      </article>

      <div className="flex flex-wrap md:flex-nowrap gap-5 items-center justify-center md:absolute bottom-8 right-10">
        {isUser && (
          <>
            {isOwner ? (
              <>
                <Link
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-green-600 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                  to={`/recipes/${props._id}/edit`}
                >
                  <FaEdit className="text-1xl group-hover:mb-2" />
                  Edit
                </Link>
                <button
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-red-600 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                  onClick={() => setConfirmDel(true)}
                >
                  <MdDelete className="text-1xl group-hover:mb-2" />
                  Delete
                </button>
              </>
            ) : (
              <button
                className={`text-xl font-bold text-white ${
                  isRecommended
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-sky-500 hover:bg-yellow-500"
                } py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group`}
                onClick={isRecommended ? removeFromRecommend : addToRecommend}
              >
                {isRecommended ? (
                  <FaRegThumbsDown className="text-1xl text-center group-hover:mb-1" />
                ) : (
                  <FaRegThumbsUp className="text-1xl text-center group-hover:mb-1" />
                )}
                {isRecommended ? "Unrecommend" : "Recommend"}
              </button>
            )}
          </>
        )}
        <button
          className="text-xl font-bold text-white bg-violet-500 hover:bg-violet-600 py-2 px-4 rounded-md flex items-center justify-center shadow-md gap-2 group"
          onClick={() => {
            if (window.location.pathname !== "/recipes/create") {
              navigate(-1);
            } else {
              navigate("/recipes");
            }
          }}
        >
          <IoMdReturnRight className="text-2xl text-center group-hover:mb-1" />
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipesDetails;
