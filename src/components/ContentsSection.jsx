// ContentsSection.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ContentsSection = ({ contents, setContents, isPrintable }) => {
  const [newContent, setNewContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddContent = () => {
    if (editIndex !== null) {
      // If editing, update the content at the specified index
      const updatedContents = [...contents];
      updatedContents[editIndex] = newContent;
      setContents(updatedContents);
      setEditIndex(null);
    } else {
      // If not editing, add a new content
      setContents([...contents, newContent]);
    }

    setNewContent(""); // Clear the input after adding/editing content
  };

  const handleEditContent = (index) => {
    // Set the editIndex to the clicked content's index and populate the input
    setEditIndex(index);
    setNewContent(contents[index]);
  };

  const handleDeleteContent = (index) => {
    // Delete the content at the specified index
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
  };

  return (
    <div className={`mt-2 ${isPrintable ? "printable-content" : ""}`}>
      <h1 className="text-lg font-bold mt-1">Content</h1>
      {contents.map((content, index) => (
        <div key={index} className="flex items-center justify-between">
          <p className="text-base">{content}</p>
          {!isPrintable && (
            <div className="flex items-center">
              <button
                className="text-blue-500 mr-4"
                onClick={() => handleEditContent(index)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="text-red-500 mr-10"
                onClick={() => handleDeleteContent(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
      ))}
      {!isPrintable && (
        <div className="flex items-center mt-2">
          <input
            type="text"
            className=" p-2 border border-gray-300 mr-2 w-3/4"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            className="bg-green-500 rounded-lg text-white px-2 py-2 ml-7 w-32"
            onClick={handleAddContent}
          >
            {editIndex !== null ? "Update Content" : "Add Content"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentsSection;
